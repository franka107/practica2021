import React, { useState } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import PasswordFieldFormik from "../../../components/Inputs/PasswordFieldFormik";
import { planOptions } from "../../../constants";
import UserActions from "../../../redux/actions/user.actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { ROUTES_DICT } from "../../../routes/routesDict";
import ACTION_TYPES from "../../../redux/types";

/**
 * @component
 * @description Componente, formulario de para poder actualizar los datos de la cuenta
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const defaultInitValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  profile: "BASIC",
};

const AccountForm = ({ initValues = defaultInitValues }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = async (values, actions) => {
    try {
      dispatch(UserActions.update(values));
      dispatch({ type: ACTION_TYPES.AUTH.UPDATE, payload: values });
      const oldUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({ ...oldUser, ...values }));
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
            <TextFieldFormik
              label="Nombre"
              name="firstName"
              type="text"
              onChange={props.handleChange}
              xs={12}
              sm={6}
            ></TextFieldFormik>
            <TextFieldFormik
              label="Apellido"
              name="lastName"
              type="text"
              onChange={props.handleChange}
              xs={12}
              sm={6}
            ></TextFieldFormik>
            <TextFieldFormik
              label="Correo Electrónico"
              name="email"
              type="text"
              autocomplete="off"
              onChange={props.handleChange}
              disabled
              xs={12}
              sm={6}
            ></TextFieldFormik>
            <PasswordFieldFormik
              label="Contraseña"
              name="password"
              autocomplete="off"
              xs={12}
              disabled
              sm={6}
              onChange={props.handleChange}
            ></PasswordFieldFormik>
            <SelectFieldFormik
              label="Plan"
              name="profile"
              onChange={props.handleChange}
              disabled
              options={Object.keys(planOptions).map((key) => ({
                _id: key,
                name: planOptions[key],
              }))}
              xs={12}
              sm={6}
            />
            <Grid
              container
              sm={6}
              xs={12}
              alignItems={"center"}
              alignContent={"center"}
            >
              <Button
                onClick={() => {
                  history.push(ROUTES_DICT.plan);
                }}
              >
                Cambiar Plan
              </Button>
            </Grid>
          </Grid>
          <Grid item container justifyContent={"flex-end"} xs={12}>
            <Grid item xs={4}>
              <ButtonFormik xs={4} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AccountForm;
