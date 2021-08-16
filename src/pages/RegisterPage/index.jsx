import React from "react";
import { Facebook } from "@material-ui/icons";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";
import Logo from "../../components/Logo";
import RegisterCard from "../../components/RegisterCard";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../components/Inputs/TextFieldFormik";
import { Link, useHistory } from "react-router-dom";
import googleBtn from "../../assets/images/google.png";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/actions";
import routesDictionary from "../../routers/routesDict";
import { uiActions } from "../../redux/actions/ui.actions";
import { useState } from "react";
import PasswordValidation from "../../components/PasswordValidation";
import PasswordFieldFormik from "../../components/Inputs/PasswordFieldFormik";
import UserType from "./UserType";

function RegisterPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [view, setView] = useState("Register");
  const [openTerms, setOpenTerms] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string("Ingresa tu correo eletrónico.")
      .email("Ingrese un correo válido.")
      .required("El correo electrónico es requerido."),
    password: yup
      .string("Ingresa tu contraseña")
      .min(8, "La contraseña debe tener un mínimo de 8 caracteres.")
      .matches(
        /^(?=.*[`~!@#$%^&*()_°¬|+\-=?;:'",.<>{}[\]\\/]).*$/gm,
        "La contraseña debe contener un caracter especial."
      )
      .matches(/.*[A-Z].*/gm, "La contraseña debe contener mayúsculas.")
      .matches(
        /.*[0-9].*/gm,
        "La contraseña debe contener caracteres numéricos."
      )
      .required("La contraseña es requerida."),
    firstName: yup
      .string("Ingresa tu nombre")
      .required("El nombre es requerido"),
    lastName: yup
      .string("Ingresa tu apellido")
      .required("El apellido es requerido"),
  });

  const onSubmitForm = (values, actions) => {
    dispatch(userActions.register(values))
      .then(() => {
        setView("UserType");
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const switchView = (viewName) => {
    switch (viewName) {
      case "Register":
        return (
          <>
            <Grid item className={classes.titleContainer}>
              <Typography align="center" className={classes.title}>
                Regístrate
              </Typography>
              <Typography
                variant={"caption"}
                gutterBottom
                align={"center"}
                className={classes.subtitle}
              >
                Regístrate para acceder al panel de control.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.googleBtn}
                startIcon={<img src={googleBtn} alt={"Google"} />}
              >
                <Typography
                  color={"secondary"}
                  align={"center"}
                  className={classes.googleBtnText}
                >
                  Iniciar sesión con Google
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.googleBtn}
                startIcon={
                  <Facebook color={"secondary"} className={classes.fbIcon} />
                }
              >
                <Typography
                  color={"secondary"}
                  align={"center"}
                  className={classes.googleBtnText}
                >
                  Iniciar sesión con Facebook
                </Typography>
              </Button>
            </Grid>
            <Grid item className={classes.titleContainer}>
              <Typography
                variant={"caption"}
                gutterBottom
                align={"center"}
                className={classes.subtitle}
              >
                O usar correo electrónico o número de teléfono
              </Typography>
            </Grid>

            <Grid item>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  promotions: false,
                  rememberAccount: false,
                  terms: false,
                }}
                onSubmit={onSubmitForm}
                validationSchema={validationSchema}
              >
                {(props) => <RegisterForm {...props} />}
              </Formik>
            </Grid>
          </>
        );
      case "UserType":
        return <UserType />;

      default:
        break;
    }
  };

  const RegisterForm = ({
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
    values,
    errors,
    touched,
  }) => {
    return (
      <form onSubmit={handleSubmit} className={classes.form}>
        <Grid container spacing={1}>
          <TextFieldFormik
            name="firstName"
            type="text"
            label="Nombres"
            onChange={handleChange}
            xs={6}
          ></TextFieldFormik>
          <TextFieldFormik
            name="lastName"
            type="text"
            label="Apellidos"
            onChange={handleChange}
            xs={6}
          ></TextFieldFormik>
          <Grid item className={classes.resetPassword}>
            <Typography variant={"caption"} gutterBottom>
              <Link className={classes.link}>
                Registrarse con número de teléfono
              </Link>
            </Typography>
          </Grid>
          <TextFieldFormik
            name="email"
            type="text"
            label="Correo electrónico"
            onChange={handleChange}
            xs={12}
          ></TextFieldFormik>
          <PasswordFieldFormik
            name="password"
            label="Contraseña"
            onChange={handleChange}
            xs={12}
          ></PasswordFieldFormik>
          <PasswordValidation value={values.password} />
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.promotions}
                  onChange={handleChange}
                  name="promotions"
                  color={"secondary"}
                />
              }
              label={
                <div className={classes.checkBoxLabel}>
                  Me gustaría recibir noticias sobre productos y servicios de
                  conTigo.
                  <Link to={routesDictionary.home} className={classes.link}>
                    ¿Qué significa esto?{" "}
                  </Link>
                </div>
              }
            />
          </Grid>
          <Grid item xs={12} container>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.terms}
                  required
                  onChange={handleChange}
                  name="terms"
                  className={classes.checkBox}
                />
              }
              label={
                <div
                  className={classes.checkBoxLabel}
                  onClick={() => setOpenTerms(true)}
                >
                  He leído y acepto los{" "}
                  <Typography variant={"span"} className={classes.link}>
                    {" "}
                    Términos y condiciones
                  </Typography>{" "}
                  y la{" "}
                  <Typography variant={"span"} className={classes.link}>
                    {" "}
                    Política de Privacidad.
                  </Typography>
                </div>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.registerBtn}
              disabled={isSubmitting}
              type="submit"
            >
              Iniciar Sesión
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.rememberAccount}
                  onChange={handleChange}
                  name="rememberAccount"
                  color={"secondary"}
                />
              }
              label={
                <div className={classes.checkBoxLabel}>Recordar cuenta </div>
              }
            />
          </Grid>
          <Typography gutterBottom className={classes.footer}>
            ¿Ya tienes una cuenta?{" "}
            <Link to={routesDictionary.login} className={classes.link}>
              Iniciar sesión{" "}
            </Link>
          </Typography>
        </Grid>
      </form>
    );
  };

  return (
    <Container>
      <RegisterCard register>
        <Logo customClasses={classes.logo} />
        {switchView(view)}
      </RegisterCard>
    </Container>
  );
}

export default RegisterPage;
