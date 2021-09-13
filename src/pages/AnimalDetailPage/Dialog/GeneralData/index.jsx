import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import MultipleCheckboxFormik from "../../../../components/Inputs/MultipleCheckboxFormik";
import { useDispatch, useSelector } from "react-redux";
import AnimalActions from "../../../../redux/actions/animal.actions";
import ACTION_TYPES from "../../../../redux/types";

import {
  categoryOptions,
  sexOptions,
  stateOptions,
} from "../../../../constants";

function GeneralData({ setOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { current: currentAnimal } = useSelector((state) => state.animal);
  const handleSubmit = (values, actions) => {
    if (values.gender === "MALE") {
      if (values.isReproductive) {
        values.category = "REPRODUCTOR";
      } else {
        values.category = "";
      }
      values.reproductiveStatus = null;
    }

    if (values.gender === "FEMALE") {
      values.isReproductive = null;
      values.category = "";
    }

    if (values.father) {
      values.fatherId = values.father._id;
    }
    if (values.mother) {
      values.motherId = values.mother._id;
    }

    dispatch(AnimalActions.updateElement(values)).then(
      (data) => {
        dispatch({
          type: ACTION_TYPES.ANIMAL.UPDATE_CURRENT,
          payload: values,
        });
        setOpen(false);
      },
      (error) => {}
    );
  };

  const validationSchema = yup.object({
    identifier: yup
      .string("Ingresa la identificacion del animal.")
      .required("Este campo es requerido."),
    name: yup
      .string("Ingresa el nombre del animal.")
      .required("Este campo es requerido."),
    birthDate: yup
      .date("Ingresa una fecha correcta.")
      .max(new Date(), "No puedes poner una fecha futura")
      .required("Este campo es requerido.")
      .nullable(),
    herdDate: yup
      .date("Ingresa una fecha correcta.")
      // .string("Ingresa la fecha de nacimiento del animal.")
      .nullable(),
    gender: yup
      .string("Ingresa el genero del animal")
      .required("Este campo es requerido."),
  });
  return (
    <Grid className={classes.modal}>
      {currentAnimal && (
        <Formik
          initialValues={currentAnimal}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Typography variant={"subtitle1"} gutterBottom>
                Datos generales
              </Typography>
              <Grid container spacing={1}>
                <TextFieldFormik
                  label="Identificación del animal"
                  name="identifier"
                  onChange={props.handleChange}
                />
                <TextFieldFormik
                  label="Nombre"
                  name="name"
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid container spacing={1} xs={12}>
                <Grid item>
                  <Typography
                    style={{ marginTop: "1rem" }}
                    variant={"subtitle1"}
                    gutterBottom
                  >
                    Estado
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <DatePickerFieldFormik
                  label="Fecha de nacimiento"
                  name="birthDate"
                  onChange={props.handleChange}
                  xs={6}
                />
                <DatePickerFieldFormik
                  label="Entrada hato"
                  name="herdDate"
                  onChange={props.handleChange}
                  xs={6}
                />
                <TextFieldFormik
                  label="Número de registro"
                  name="registerNumber"
                  onChange={props.handleChange}
                  xs={12}
                />
              </Grid>

              <Grid container spacing={1}>
                <SelectFieldFormik
                  label="Sexo"
                  name="gender"
                  onChange={props.handleChange}
                  options={sexOptions}
                  xs={6}
                />
                {props.values.gender === "MALE" ? (
                  <Grid
                    lg={6}
                    sm={6}
                    xs={12}
                    container
                    justifyContent="center"
                    alignContent="center"
                    alignItems="center"
                  >
                    <MultipleCheckboxFormik
                      label="Categoria"
                      name="isReproductive"
                      options={categoryOptions}
                      onChange={props.handleChange}
                      checked={props.values.isReproductive}
                    ></MultipleCheckboxFormik>
                  </Grid>
                ) : (
                  <SelectFieldFormik
                    onChange={props.handleChange}
                    options={Object.keys(stateOptions).map((key) => ({
                      _id: key,
                      name: stateOptions[key],
                    }))}
                    label="Estado"
                    name="reproductiveStatus"
                    lg={6}
                    sm={6}
                    xs={12}
                  ></SelectFieldFormik>
                )}
              </Grid>
              <Grid item container justifyContent={"flex-end"} xs={12}>
                <Grid item xs={3} className={classes.paddingButton}>
                  <ButtonFormik xs={3} label="Cancelar" type="cancel" />
                </Grid>
                <Grid item xs={3}>
                  <ButtonFormik xs={3} label="Guardar" type="submit" />
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}
    </Grid>
  );
}

export default GeneralData;
