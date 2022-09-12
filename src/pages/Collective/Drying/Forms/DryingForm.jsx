import React, { useEffect } from "react";
import { Grid, InputAdornment, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import AutocompleteFieldFormik from "../../../../components/Inputs/AutocompleteFieldFormik";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AnimalActions from "../../../../redux/actions/animal.actions";
import DryingActions from "../../../../redux/actions/drying.actions";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import { reasonOptions } from "../../../../constants";
import CustomInfoIcon from "../../../../components/CustomInfoIcon";
import { format } from "date-fns";

const defaultInitValues = {
  animalId: "",
  date: new Date(),
  reason: "",
  observation: "",
};

const validationSchema = (animalL) =>
  yup.lazy((values) =>
    yup.object({
      animalId: yup
        .string()
        .typeError("Este campo es requerido")
        .required("Este campo es requerido."),
      reason: yup
        .string()
        .typeError("Este campo es requerido")
        .required("Este campo es requerido."),
      date: yup
        .date()
        .typeError("Este campo es requerido")
        .max(new Date(), "No puedes ingresar una fecha futura")
        .when("animalId", {
          is: (value) => animalL.some((e) => e._id === value),
          then: (rule) =>
            rule.min(
              format(
                new Date(
                  animalL.find((e) => e._id === values.animalId).herdDate
                ),
                "yyyy-MM-dd"
              ),
              "La fecha del secado debe ser mayor a la fecha de entrada de hato."
            ),
        }),
    })
  );

/**
 * @component
 * @description Componente, formulario para crear o editar registros de secado de vacas
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const DryingForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );
  const femaleAnimals = useSelector(
    (state) =>
      state.animal.list.filter(
        (e) =>
          e.gender === "FEMALE" &&
          // e.ageInMonths > currentAgribusiness?.isBreeding &&
          (e.isDried === false || e.isDried === null)
      ),
    shallowEqual
  );

  useEffect(() => {
    if (!femaleAnimals || femaleAnimals.length === 0) {
      dispatch(AnimalActions.list());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        const animal = femaleAnimals.find((e) => e._id === values.animalId);
        await dispatch(DryingActions.create(values, animal));
      }
      if (type === "update") {
        await dispatch(DryingActions.update(values));
      }

      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema(femaleAnimals)}
      enableReinitialize
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={1}>
            <Typography variant={"subtitle1"} gutterBottom>
              {type === "create"
                ? "Agregar secado/destete"
                : "Editar secado/destete"}
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            <AutocompleteFieldFormik
              startAdornment={
                <InputAdornment position="start" style={{ margin: 0 }}>
                  <CustomInfoIcon
                    title={
                      <>
                        Genero = Hembra <br />
                        Secada = No <br />
                        Meses de edad {">"} {currentAgribusiness?.isBreeding}
                      </>
                    }
                    placement="bottom"
                  />
                </InputAdornment>
              }
              required
              options={femaleAnimals}
              name="animalId"
              label="Identificacíon del animal"
              onChange={props.handleChange}
              defaultValue={type === "create" ? null : props.values.animal}
              xs={12}
            />
            <TextFieldFormik
              label="Nombre"
              name="name"
              disabled
              onChange={props.handleChange}
              xs={12}
              value={
                props.values.animalId
                  ? femaleAnimals.find((e) => e._id === props.values.animalId)
                      ?.name
                  : ""
              }
            />
            <DatePickerFieldFormik
              required
              label="Fecha"
              name="date"
              onChange={props.handleChange}
              xs={12}
            />
            <SelectFieldFormik
              required
              label="Razón"
              name="reason"
              options={Object.keys(reasonOptions).map((key) => ({
                _id: key,
                name: reasonOptions[key],
              }))}
              onChange={props.handleChange}
              xs={12}
            />
            <TextFieldFormik
              label="Observaciones"
              name="observation"
              onChange={props.handleChange}
              xs={12}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item container xs={12} justifyContent="space-between">
            <Grid item xs={5}>
              <ButtonFormik
                xs={12}
                label="Cancelar"
                type="cancel"
                onClick={onClickCancelButton}
              />
            </Grid>
            <Grid item xs={5}>
              <ButtonFormik xs={12} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default DryingForm;
