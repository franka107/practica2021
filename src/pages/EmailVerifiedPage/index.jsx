import React from "react";
import { Facebook } from "@material-ui/icons";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import Logo from "../../components/Logo";
import RegisterCard from "../../components/RegisterCard";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../components/Inputs/TextFieldFormik";
import { Link, useHistory, useParams } from "react-router-dom";
import googleBtn from "../../assets/images/google.png";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/actions";
import routesDictionary from "../../routers/routesDict";
import { uiActions } from "../../redux/actions/ui.actions";
import PasswordFieldFormik from "../../components/Inputs/PasswordFieldFormik";
import { useEffect } from "react";
import UserService from "../../services/user.service";

function EmailVerifiedPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    UserService.userUpdate({ _id: params.userId, isVerified: true });
  }, []);

  return (
    <Container>
      <RegisterCard register>
        <Logo customClasses={classes.logo} />
        <Grid item className={classes.titleContainer}>
          <Typography align={"center"} className={classes.title}>
            Cuenta verificada exitosamente
          </Typography>
          <Typography
            variant={"caption"}
            gutterBottom
            align={"center"}
            className={classes.subtitle}
          >
            Ya puedes usar la plataforma de Contigo.
          </Typography>
          <Grid item xs={12}>
            <Button
              className={classes.loginBtn}
              onClick={() => {
                history.push(routesDictionary.setup);
              }}
            >
              Empezar
            </Button>
          </Grid>
        </Grid>
      </RegisterCard>
    </Container>
  );
}

export default EmailVerifiedPage;
