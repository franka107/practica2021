import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import PasswordFieldFormik from "../../../components/Inputs/PasswordFieldFormik";
import { planOptions } from "../../../constants";
import UserActions from "../../../redux/actions/user.actions";
import { useDispatch } from "react-redux";
const defaultInitValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  profile: "BASIC",
};
const UserForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      console.log(values);
      if (type === "create") {
        dispatch(UserActions.create({ ...values, verified: true }));
      }
      if (type === "update") {
        dispatch(UserActions.update(values));
      }
      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
  };

  const validationSchema = yup.object({});

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={1}>
            <Typography variant={"subtitle1"} gutterBottom>
              {type === "create" ? "Agregar nuevo usuario" : "Editar usuario"}
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            <TextFieldFormik
              label="Nombres"
              name="firstName"
              type="text"
              onChange={props.handleChange}
              xs={12}
            ></TextFieldFormik>
            <TextFieldFormik
              label="Apellidos"
              name="lastName"
              type="text"
              onChange={props.handleChange}
              xs={12}
            ></TextFieldFormik>
            <TextFieldFormik
              label="Correo Electrónico"
              name="email"
              type="text"
              onChange={props.handleChange}
              xs={12}
            ></TextFieldFormik>
            {type === "create" && (
              <PasswordFieldFormik
                label="Contraseña"
                name="password"
                onChange={props.handleChange}
              ></PasswordFieldFormik>
            )}
            <SelectFieldFormik
              label="Perfil de usuario"
              name="profile"
              onChange={props.handleChange}
              options={Object.keys(planOptions).map((key) => ({
                _id: key,
                name: planOptions[key],
              }))}
              xs={12}
              disabled
            />
          </Grid>
          <Grid item container justifyContent="space-between" xs={12}>
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

export default UserForm;
