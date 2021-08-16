import React from "react";
import { Facebook } from "@material-ui/icons";
import {
  Button,
  Container,
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
import PasswordFieldFormik from "../../components/Inputs/PasswordFieldFormik";

function LoginPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

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
  });

  const onSubmitForm = (values, actions) => {
    const { email, password } = values;
    dispatch(userActions.login(email, password))
      .then(() => {
        history.push(routesDictionary.dashboard);
      })
      .catch((error) => {
        //props.snackbarShowMessage("Credenciales inválidas", "error");
        dispatch(uiActions.showSnackbar("Credenciales inválidas", "error"));
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const LoginForm = ({
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
            name="email"
            type="text"
            label="Correo"
            onChange={handleChange}
          ></TextFieldFormik>
          <PasswordFieldFormik
            label="Contraseña"
            name="password"
            onChange={handleChange}
          ></PasswordFieldFormik>
          <Grid item xs={12}>
            <Button
              className={classes.loginBtn}
              disabled={isSubmitting}
              type="submit"
            >
              Iniciar Sesión
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item className={classes.resetPassword}>
            <Typography variant={"caption"} gutterBottom>
              <Link
                className={classes.link}
                to={routesDictionary.recoverPassword}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.resetPassword}>
            <Typography variant={"caption"} gutterBottom>
              <Link className={classes.link} to={routesDictionary.register}>
                Regístrate
              </Link>
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
        </Grid>
      </form>
    );
  };

  return (
    <Container>
      <RegisterCard register>
        <Logo customClasses={classes.logo} />
        <Grid item className={classes.titleContainer}>
          <Typography align={"center"} className={classes.title}>
            Iniciar Sesión
          </Typography>
          <Typography
            variant={"caption"}
            gutterBottom
            align={"center"}
            className={classes.subtitle}
          >
            Gestiona tu finca desde el panel de usuario.
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={onSubmitForm}
            validationSchema={validationSchema}
          >
            {(props) => <LoginForm {...props} />}
          </Formik>
        </Grid>
      </RegisterCard>
    </Container>
  );
}

export default LoginPage;
