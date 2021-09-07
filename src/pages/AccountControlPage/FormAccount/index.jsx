import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { useStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import PasswordFieldFormik from "../../../components/Inputs/PasswordFieldFormik";
function FormUser() {
  const classes = useStyles();

  const [initValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    profile: "",
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = yup.object({});

  return (
    <div>
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
                name="name"
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
                onChange={props.handleChange}
                xs={12}
                sm={6}
              ></TextFieldFormik>
              <PasswordFieldFormik
                label="Contraseña"
                name="password"
                xs={12}
                sm={6}
                onChange={props.handleChange}
              ></PasswordFieldFormik>
              <SelectFieldFormik
                label="Perfil de usuario"
                name="profile"
                onChange={props.handleChange}
                options={[]}
                xs={12}
                sm={6}
              />
            </Grid>
            <Grid item container justifyContent={"flex-end"} xs={12}>
              <Grid item xs={4}>
                <ButtonFormik xs={4} label="Guardar" type="submit" />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default FormUser;
