import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
// import { useStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import PasswordFieldFormik from "../../../components/Inputs/PasswordFieldFormik";
import { useHistory } from "react-router-dom";
import { ROUTES_DICT } from "../../../routes/routesDict";
function FormUser() {
  // const classes = useStyles();
  const history = useHistory();

  const [initValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    plan: "",
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
                label="Plan"
                name="plan"
                onChange={props.handleChange}
                options={[]}
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
    </div>
  );
}

export default FormUser;
