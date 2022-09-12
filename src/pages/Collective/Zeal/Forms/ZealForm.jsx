import React, { useEffect } from "react";
import { Grid, InputAdornment, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import AutocompleteFieldFormik from "../../../../components/Inputs/AutocompleteFieldFormik";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ZealActions from "../../../../redux/actions/zeal.actions";
import AnimalActions from "../../../../redux/actions/animal.actions";
import CustomInfoIcon from "../../../../components/CustomInfoIcon";
import { format } from "date-fns";

const defaultInitValues = {
  animalId: "",
  name: "",
  controlDate: new Date(),
  iecDate: "",
  observation: "",
};

const validationSchema = (animalL) =>
  yup.lazy((values) =>
    yup.object({
      animalId: yup
        .string()
        .typeError("Este campo es requerido.")
        .required("Este campo es requerido."),
      controlDate: yup
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
              "La fecha de control debe ser mayor a la fecha de entrada de hato."
            ),
        }),
    })
  );

/**
 * @component
 * @description Componente, formulario para crear o editar los datos de celos de una vaca
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const ZealForm = ({
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
        (e) => e.gender === "FEMALE"
        // e.ageInMonths > currentAgribusiness?.isBreeding
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
        await dispatch(ZealActions.create(values, animal));
      }
      if (type === "update") {
        await dispatch(ZealActions.update(values));
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
              {type === "create" ? "Agregar Celo" : "Editar Celo"}
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
              name="controlDate"
              onChange={props.handleChange}
              xs={12}
            />
            {/* <Grid item container xs={12}>
              <TextFieldFormik
                required
                label="I.E.C"
                name="iecDate"
                onChange={props.handleChange}
                xs={11}
              />
              <CustomInfoIcon title={"Falta información"} />
            </Grid> */}

            <TextFieldFormik
              label="Obervaciones"
              name="observation"
              onChange={props.handleChange}
              multiline
              rows={4}
              xs={12}
            ></TextFieldFormik>
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

export default ZealForm;
