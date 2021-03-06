// emport React from "react";
import { Facebook } from "@material-ui/icons";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
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
import { useState } from "react";
import PasswordValidation from "../../components/PasswordValidation";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import PasswordFieldFormik from "../../components/Inputs/PasswordFieldFormik";
import UserType from "./UserType";
import { ROUTES_DICT } from "../../routes/routesDict";
import AuthActions from "../../redux/actions/auth.actions";
import TermsAndConditions from "./TermsAndConditions";
import authService from "../../services/auth.service";
import { useSelector } from "react-redux";
import uiActions from "../../redux/actions/ui.actions";
import { useGoogleLogin } from "react-google-login";

function RegisterPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [view, setView] = useState("Register");
  // eslint-disable-next-line no-unused-vars
  const [openTerms, setOpenTerms] = useState(false);
  const initValues = {
    firstName: "",
    lastName: "",
    emailRegister: "",
    passwordRegister: "",
    sendInformation: false,
    termsAndConditions: false,
  };

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
  const clientId = process.env.REACT_APP_GOOGLE_ENV;

  const onFailure = (res) => {};

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    accessType: "offline",
  });
  const validationSchema = yup.object({
    emailRegister: yup
      .string("Ingresa tu correo eletr??nico.")
      .email("Ingrese un correo v??lido.")
      .required("El correo electr??nico es requerido."),
    passwordRegister: yup
      .string("Ingresa tu contrase??a")
      .min(8, "La contrase??a debe tener un m??nimo de 8 caracteres.")
      .matches(
        /^(?=.*[`~!@#$%^&*()_????|+\-=?;:'",.<>{}[\]\\/]).*$/gm,
        "La contrase??a debe contener un caracter especial."
      )
      .matches(/.*[A-Z].*/gm, "La contrase??a debe contener may??sculas.")
      .matches(
        /.*[0-9].*/gm,
        "La contrase??a debe contener caracteres num??ricos."
      )
      .required("La contrase??a es requerida."),
    firstName: yup
      .string("Ingresa tu nombre")
      .required("El nombre es requerido"),
    lastName: yup
      .string("Ingresa tu apellido")
      .required("El apellido es requerido"),
    sendInformation: yup.boolean("Evalua el envio de noticias y productos"),
    termsAndConditions: yup
      .boolean("Evalua los terminos y condiciones")
      .required("Este campo es obligatorio"),
  });
  const history = useHistory();

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

  const currentUser = useSelector((state) => state.auth.current);

  const onSubmitForm = (values, actions) => {
    dispatch(
      AuthActions.register({
        ...values,
        email: values.emailRegister,
        password: values.passwordRegister,

        termsAndConditionsAcceptedOn: new Date(),
        sendInformationAcceptedOn: new Date(),
      })
    )
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
                Reg??strate
              </Typography>
              <Typography
                variant={"caption"}
                gutterBottom
                align={"center"}
                className={classes.subtitle}
              >
                Reg??strate para acceder al panel de control.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.googleBtn}
                onClick={() => {
                  signIn();
                }}
                startIcon={<img src={googleBtn} alt={"Google"} />}
              >
                <Typography align={"center"} className={classes.googleBtnText}>
                  Iniciar sesi??n con Google
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
                  >
                    <Typography
                      align={"center"}
                      className={classes.googleBtnText}
                    >
                      Iniciar sesi??n con Facebook
                    </Typography>
                  </Button>
                )}
              />
            </Grid>
            <Grid item className={classes.titleContainer}>
              <Typography
                variant={"caption"}
                gutterBottom
                align={"center"}
                className={classes.subtitle}
              >
                O usar correo electr??nico {/* o n??mero de tel??fono */}
              </Typography>
            </Grid>

            <Grid item>
              <Formik
                initialValues={initValues}
                onSubmit={onSubmitForm}
                validationSchema={validationSchema}
              >
                {(props) => <RegisterForm {...props} />}
              </Formik>
            </Grid>
          </>
        );
      case "UserType":
        return (
          <UserType
            onClick={() => {
              setView("UserVerification");
            }}
          />
        );
      case "UserVerification":
        return (
          <>
            <Grid item className={classes.titleContainer}>
              <Typography align="center" className={classes.title}>
                Verificaci??n de correo
              </Typography>
              <Typography
                variant={"caption"}
                gutterBottom
                align={"center"}
                className={classes.subtitle}
              >
                Por favor verifica tu correo electr??nico para continuar.
              </Typography>
              <Grid item xs={12}>
                <Button
                  className={classes.registerBtn}
                  type="submit"
                  onClick={() => {
                    authService.sendVerificationEmail(
                      currentUser,
                      window.location.href
                    );
                    dispatch(
                      uiActions.showSnackbar(
                        "Se envi?? el correo nuevamente, revisa tu buz??n de entrada"
                      )
                    );
                  }}
                >
                  Reenviar correo de verificaci??n
                </Button>
              </Grid>
            </Grid>
          </>
        );

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
          {/* 
          <Grid item className={classes.resetPassword}>
            <Typography variant={"caption"} gutterBottom>
              <Link className={classes.link}>
                Registrarse con n??mero de tel??fono
              </Link>
            </Typography>
          </Grid>
          */}
          <TextFieldFormik
            name="emailRegister"
            type="text"
            label="Correo electr??nico"
            onChange={handleChange}
            xs={12}
          ></TextFieldFormik>
          <PasswordFieldFormik
            name="passwordRegister"
            label="Contrase??a"
            onChange={handleChange}
            xs={12}
          ></PasswordFieldFormik>
          <PasswordValidation value={values.passwordRegister} />
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.sendInformation}
                  onChange={handleChange}
                  name="sendInformation"
                  color={"secondary"}
                />
              }
              label={
                <div className={classes.checkBoxLabel}>
                  Me gustar??a recibir noticias sobre productos y servicios de
                  conTigo.
                  <Link to={ROUTES_DICT.home} className={classes.link}>
                    ??Qu?? significa esto?{" "}
                  </Link>
                </div>
              }
            />
          </Grid>
          <Grid item xs={12} container>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.termsAndConditions}
                  required
                  onChange={handleChange}
                  name="termsAndConditions"
                  className={classes.checkBox}
                />
              }
              label={
                <div
                  className={classes.checkBoxLabel}
                  onClick={() => setOpenTerms(true)}
                >
                  He le??do y acepto los{" "}
                  <Typography variant={"span"} className={classes.link}>
                    {" "}
                    T??rminos y condiciones
                  </Typography>{" "}
                  y la{" "}
                  <Typography variant={"span"} className={classes.link}>
                    {" "}
                    Pol??tica de Privacidad.
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
              Registrarse
            </Button>
          </Grid>
          {/*

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
          */}
          <Typography gutterBottom className={classes.footer}>
            ??Ya tienes una cuenta?{" "}
            <Link to={ROUTES_DICT.login} className={classes.link}>
              Iniciar sesi??n{" "}
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
      <TermsAndConditions setOpen={setOpenTerms} open={openTerms} />
    </Container>
  );
}

export default RegisterPage;
