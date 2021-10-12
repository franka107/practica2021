import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import { useDispatch } from "react-redux";
import AnimalActions from "../../../redux/actions/animal.actions";
import {
  categoryOptions,
  sexDictionary,
  sexOptions,
  stateOptions,
} from "../../../constants";
import CheckboxFormik from "../../../components/Inputs/CheckboxFormik";

/**
 * @component
 * @description Componente, formulario de los datos generales del animal
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const GeneralForm = ({
  initValues,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      if (values.gender === "MALE") {
        if (values.isReproductive) {
          values.category = "REPRODUCTOR";
        } else {
          values.category = null;
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
      await dispatch(AnimalActions.update(values));
      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
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
      .max(new Date(), "No puedes poner una fecha futura")
      // .string("Ingresa la fecha de nacimiento del animal.")
      .nullable(),
    gender: yup
      .string("Ingresa el genero del animal")
      .required("Este campo es requerido."),
  });
  return (
    <Formik
      initialValues={initValues}
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
              // options={sexDictionary}
              options={Object.keys(sexDictionary)
                .filter((key) => key === "MALE" || key === "FEMALE")
                .map((key) => ({
                  _id: key,
                  name: sexDictionary[key],
                }))}
              xs={12}
              sm={6}
            />
            {props.values.gender === "MALE" && (
              <Grid
                lg={6}
                sm={6}
                xs={12}
                container
                justifyContent="center"
                alignContent="center"
                alignItems="center"
              >
                <CheckboxFormik
                  label="Reproductor"
                  name="isReproductive"
                  options={categoryOptions}
                  onChange={props.handleChange}
                  checked={props.values.isReproductive}
                ></CheckboxFormik>
              </Grid>
            )}
            {props.values.gender === "FEMALE" && (
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
          <Grid item container justifyContent="space-between" xs={12}>
            <Grid item xs={5}>
              <ButtonFormik
                xs={3}
                label="Cancelar"
                type="cancel"
                onClick={onClickCancelButton}
              />
            </Grid>
            <Grid item xs={5}>
              <ButtonFormik xs={3} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default GeneralForm;
