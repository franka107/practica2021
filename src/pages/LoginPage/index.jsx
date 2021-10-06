import React from "react";
import { Facebook } from "@material-ui/icons";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import Logo from "../../components/Logo";
import RegisterCard from "../../components/RegisterCard";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../components/Inputs/TextFieldFormik";
import { Link, useHistory } from "react-router-dom";
import googleBtn from "../../assets/images/google.png";
import { useDispatch } from "react-redux";
import PasswordFieldFormik from "../../components/Inputs/PasswordFieldFormik";
import { ROUTES_DICT } from "../../routes/routesDict";
import AuthActions from "../../redux/actions/auth.actions";
import { useGoogleLogin } from "react-google-login";
import uiActions from "../../redux/actions/ui.actions";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import ReactFacebookLogin from "react-facebook-login";

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

      .required("La contraseña es requerida."),
  });

  const onSuccess = (res) => {
    console.log(res);
    const values = {
      email: res.profileObj.email,
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
    };
    dispatch(AuthActions.loginWithGoogle(values)).then((farm) => {
      if (farm) {
        history.push(ROUTES_DICT.animal.list);
      } else {
        history.push(ROUTES_DICT.setup);
      }
    });
  };

  const onFailure = (res) => {};

  const clientId = process.env.REACT_APP_GOOGLE_ENV;
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    accessType: "offline",
  });

  const onResponseFB = (res) => {
    const values = {
      email: res.email,
      firstName: res.name,
      lastName: "",
    };
    dispatch(AuthActions.loginWithGoogle(values)).then((farm) => {
      if (farm) {
        history.push(ROUTES_DICT.animal.list);
      } else {
        history.push(ROUTES_DICT.setup);
      }
    });
  };

  const onSubmitForm = (values, actions) => {
    dispatch(AuthActions.login(values))
      .then((farm) => {
        if (farm) {
          history.push(ROUTES_DICT.animal.list);
        } else {
          history.push(ROUTES_DICT.setup);
        }
      })
      .catch(() => {
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
              <Link className={classes.link} to={ROUTES_DICT.recoverPassword}>
                ¿Olvidaste tu contraseña?
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.resetPassword}>
            <Typography variant={"caption"} gutterBottom>
              <Link className={classes.link} to={ROUTES_DICT.register}>
                Regístrate
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.googleBtn}
              startIcon={<img src={googleBtn} alt={"Google"} />}
              onClick={() => {
                console.log("prueba login");
                signIn();
              }}
            >
              <Typography align={"center"} className={classes.googleBtnText}>
                Iniciar sesión con Google
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FacebookLogin
              appId="1286554848458675"
              fields="name,email,picture"
              callback={onResponseFB}
              render={(renderProps) => (
                <Button
                  className={classes.googleBtn}
                  startIcon={<Facebook className={classes.fbIcon} />}
                  onClick={renderProps.onClick}
                >
                  <Typography
                    align={"center"}
                    className={classes.googleBtnText}
                  >
                    Iniciar sesión con Facebook
                  </Typography>
                </Button>
              )}
            />
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
