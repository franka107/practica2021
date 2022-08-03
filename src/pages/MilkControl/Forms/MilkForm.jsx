import React, { useEffect } from "react";
import { Grid, InputAdornment, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import AutocompleteFieldFormik from "../../../components/Inputs/AutocompleteFieldFormik";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AnimalActions from "../../../redux/actions/animal.actions";
import MilkActions from "../../../redux/actions/milkControl.actions";
import { useParams } from "react-router";
import BirthActions from "../../../redux/actions/birth.actions";
import { format } from "date-fns";
import CustomInfoIcon from "../../../components/CustomInfoIcon";

const defaultInitValues = {
  animalId: "",
  name: "",
  controlDate: new Date(),
  firstSample: null,
  secondSample: null,
  thirdSample: null,
  observation: "",
};

const validationSchema = (femaleAnimals) =>
  yup.lazy((values) =>
    yup.object({
      animalId: yup.string().required("Este campo es requerido."),
      controlDate: yup
        .date()
        .max(new Date(), "No puedes ingresar una fecha futura")
        .when("animalId", {
          is: (value) => femaleAnimals.some((e) => e._id === value),
          then: (rule) =>
            rule.min(
              format(
                new Date(
                  femaleAnimals.find((e) => e._id === values.animalId).herdDate
                ),
                "yyyy-MM-dd"
              ),
              "La fecha del control lechero debe ser mayor a la fecha de entrada de hato."
            ),
        }),
      firstSample: yup
        .number()
        .typeError("Este campo es requerido.")
        .min(1, "Ingrese un valor mayor a 1")
        .required("Este campo es requerido."),
      secondSample: yup
        .number()
        .typeError("Este campo es requerido.")
        .min(1, "Ingrese un valor mayor a 1")
        .required("Este campo es requerido."),
    })
  );

const MilkForm = ({
  initValues = defaultInitValues,
  type = "create",
  hideAnimal = false,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const births = useSelector((state) => state.birth.list);
  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );
  const femaleAnimals = useSelector(
    (state) =>
      state.animal.list.filter(
        (e) =>
          e.gender === "FEMALE" &&
          e.birthsLength > 0 &&
          e.isDried === false &&
          e.ageInMonths > currentAgribusiness?.isHeifer
      ),
    shallowEqual
  );

  useEffect(() => {
    if (!femaleAnimals || femaleAnimals.length === 0) {
      dispatch(AnimalActions.list());
    }
    if (!births || births.length === 0) {
      dispatch(BirthActions.list());
    }
    if (hideAnimal) {
      initValues.animalId = params._id;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        const animal = femaleAnimals.find((e) => e._id === values.animalId);
        await dispatch(
          MilkActions.create(
            {
              ...values,
              thirdSample: values.thirdSample ? values.thirdSample : 0,
            },
            animal
          )
        );
      }
      if (type === "update") {
        await dispatch(MilkActions.update(values));
      }
      if (hideAnimal) {
        await dispatch(AnimalActions.get({ _id: params._id }));
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
                ? "Agregar registro de ordeño"
                : "Editar registro de ordeño"}
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            {!hideAnimal && (
              <>
                <AutocompleteFieldFormik
                  startAdornment={
                    <InputAdornment position="start" style={{ margin: 0 }}>
                      <CustomInfoIcon
                        title={
                          <>
                            Genero = Hembra <br />
                            Secada = No <br />
                            Nacimientos {">"} 0 <br />
                            Meses de edad {">"} {currentAgribusiness?.isHeifer}
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
                      ? femaleAnimals.find(
                          (e) => e._id === props.values.animalId
                        )?.name
                      : ""
                  }
                />
              </>
            )}
            <DatePickerFieldFormik
              required
              label="Fecha"
              name="controlDate"
              onChange={props.handleChange}
              xs={12}
            />
            <TextFieldFormik
              required
              label="Muestra A.M"
              name="firstSample"
              placeholder="0"
              onChange={props.handleChange}
              endAdornment={
                <InputAdornment position="start">
                  {currentAgribusiness &&
                  currentAgribusiness.milkUnit === "LITERS"
                    ? "L."
                    : "Kg."}
                </InputAdornment>
              }
              type="number"
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              required
              label="Muestra P.M"
              name="secondSample"
              placeholder="0"
              onChange={props.handleChange}
              endAdornment={
                <InputAdornment position="start">
                  {currentAgribusiness &&
                  currentAgribusiness.milkUnit === "LITERS"
                    ? "L."
                    : "Kg."}
                </InputAdornment>
              }
              type="number"
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              label="3ra Muestra"
              name="thirdSample"
              type="number"
              placeholder="0"
              onChange={props.handleChange}
              endAdornment={
                <InputAdornment position="start">
                  {currentAgribusiness &&
                  currentAgribusiness.milkUnit === "LITERS"
                    ? "L."
                    : "Kg."}
                </InputAdornment>
              }
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              label="Observaciones"
              name="observation"
              multiline
              rows={3}
              onChange={props.handleChange}
              xs={12}
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

export default MilkForm;
