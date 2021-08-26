import React from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import Logo from "../../components/Logo";
import RegisterCard from "../../components/RegisterCard";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import UserService from "../../services/user.service";
import { ROUTES_DICT } from "../../routes/routesDict";

function EmailVerifiedPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    UserService.userUpdate({ _id: params.userId, isVerified: true });
  }, [params]);

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
                history.push(ROUTES_DICT.login);
              }}
            >
              Iniciar sesión
            </Button>
          </Grid>
        </Grid>
      </RegisterCard>
    </Container>
  );
}

export default EmailVerifiedPage;
