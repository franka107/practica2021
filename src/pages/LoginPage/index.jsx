import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import Logo from "../../components/Logo";
import RegisterCard from "../../components/RegisterCard";
import * as yup from "yup";
import { useFormik } from "formik";

function LoginPage() {
  const classes = useStyles();

  const validationSchema = yup.object({});

  const formik = useFormik({
    validationSchema,
  });

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
          <form onSubmit={formik.handleSubmit}></form>
        </Grid>
      </RegisterCard>
    </Container>
  );
}

export default LoginPage;
