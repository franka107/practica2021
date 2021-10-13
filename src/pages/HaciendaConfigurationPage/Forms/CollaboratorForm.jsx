import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import { positionOptions } from "../../../constants";
import { useDispatch } from "react-redux";
import CollaboratorActions from "../../../redux/actions/collaborator.actions";

const defaultInitValues = {
  name: "",
  lastName: "",
  position: "",
  dateAdmission: new Date(),
};

const CollaboratorForms = ({
  type = "create",
  initValues = defaultInitValues,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      console.log(values);
      if (type === "create") {
        await dispatch(CollaboratorActions.create(values));
      }
      if (type === "update") {
        await dispatch(CollaboratorActions.update(values));
      }
      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
  };

  const validationSchema = yup.object({
    name: yup
      .string("Ingresa el nombre del colaborador")
      .required("Este campo es requerido."),
    lastName: yup
      .string("Ingresa los apellidos del colaborador")
      .required("Este campo es requerido."),
    dateAdmission: yup
      .date("Ingresa una fecha correcta.")
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
            Colaboradores
          </Typography>
          <Grid container spacing={1}>
            <TextFieldFormik
              label="Nombres"
              name="name"
              type="text"
              onChange={props.handleChange}
              xs={12}
              sm={6}
            ></TextFieldFormik>
            <TextFieldFormik
              label="Apellidos"
              name="lastName"
              type="text"
              onChange={props.handleChange}
              xs={12}
              sm={6}
            ></TextFieldFormik>
            <SelectFieldFormik
              label="Cargo"
              name="position"
              onChange={props.handleChange}
              options={Object.keys(positionOptions).map((key) => ({
                _id: key,
                name: positionOptions[key],
              }))}
              xs={6}
            />
            <DatePickerFieldFormik
              label="Fecha de ingreso"
              name="dateAdmission"
              onChange={props.handleChange}
              xs={6}
            />
          </Grid>
          <Grid
            item
            container
            justifyContent={"flex-end"}
            style={{ gap: "0.5rem" }}
            xs={12}
          >
            <Grid item xs={3}>
              <ButtonFormik
                xs={3}
                label="Cancelar"
                type="cancel"
                onClick={onClickCancelButton}
              />
            </Grid>
            <Grid item xs={3}>
              <ButtonFormik xs={3} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CollaboratorForms;
