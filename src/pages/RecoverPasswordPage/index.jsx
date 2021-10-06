import React from "react";
import { Facebook } from "@material-ui/icons";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { useStyles } from "../LoginPage/styles";
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
import IdeasCloudApi from "../../helpers/ideascloudApi";

function RecoverPasswordPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const validationSchema = yup.object({
    email: yup
      .string("Ingresa tu correo eletrónico.")
      .email("Ingrese un correo válido.")
      .required("El correo electrónico es requerido."),
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

  const onSubmitForm = async (values, actions) => {
    //dispatch(AuthActions.login(values))
    //  .then((farm) => {
    //    if (farm) {
    //      history.push(ROUTES_DICT.animal.list);
    //    } else {
    //      history.push(ROUTES_DICT.setup);
    //    }
    //  })
    //  .catch(() => {
    //    actions.setSubmitting(false);
    //  });
    await IdeasCloudApi.fetch(
      "userRecoverPassword",
      values,
      dispatch,
      "Se reestableció su contraseña, por favor revise su correo electrónico"
    );
    actions.setSubmitting(false);
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
          <Grid item xs={12}>
            <Button
              className={classes.loginBtn}
              disabled={isSubmitting}
              type="submit"
            >
              Recuperar contraseña
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
            initialValues={{ email: "" }}
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

export default RecoverPasswordPage;
