import React from "react";
import { useStyles } from "./styles";
import { Button, Grid, Link, Typography } from "@material-ui/core";
// import { menu } from "./constants";
import {
  Call,
  Check,
  Facebook,
  // Instagram,
  // Twitter,
  LinkedIn,
} from "@material-ui/icons";
import Logo from "../Logo";
import { useHistory } from "react-router";
import { ROUTES_DICT } from "../../routes/routesDict";

const propTypes = {};

function Footer() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Grid
      container
      item
      alignContent={"center"}
      justifyContent={"space-between"}
    >
      <Grid item md={2} xs={12} className={classes.logoContainer}>
        <Logo footer />
      </Grid>
      <Grid
        container
        item
        md={6}
        sm={12}
        alignContent={"center"}
        justifyContent={"space-around"}
      >
        <Grid
          item
          md={3}
          sm={3}
          xs={11}
          container
          alignContent="flex-start"
          className={classes.footerItem}
        >
          <Typography gutterBottom className={classes.footerText}>
            Contáctanos
          </Typography>
          <Typography color={"primary"} className={classes.description}>
            <Check /> Av El Son 849, Miraflores
          </Typography>
          <Typography color={"primary"} className={classes.description}>
            <Call /> 954678123
          </Typography>
        </Grid>
        <Grid
          item
          md={3}
          sm={3}
          xs={11}
          container
          alignContent="flex-start"
          className={classes.footerItem}
        >
          <Typography gutterBottom className={classes.footerText}>
            Información Corporativa
          </Typography>

          <Typography color={"primary"} className={classes.description}>
            <Link href="https://contigopecuario.com/" target="_blank">
              Nuestro propósito
            </Link>
          </Typography>
          <Typography color={"primary"} className={classes.description}>
            <Link href="https://contigopecuario.com/" target="_blank">
              Reportes y análisis
            </Link>
          </Typography>
          <Typography color={"primary"} className={classes.description}>
            <Link href="https://contigopecuario.com/" target="_blank">
              Tutoriales
            </Link>
          </Typography>
          <Typography color={"primary"} className={classes.description}>
            <Link href="https://contigopecuario.com/" target="_blank">
              Contáctanos
            </Link>
          </Typography>
        </Grid>
        <Grid
          item
          md={3}
          sm={3}
          xs={11}
          container
          alignContent="flex-start"
          className={classes.footerItem}
        >
          <Typography gutterBottom className={classes.footerText}>
            Asistencia
          </Typography>

          <Typography color={"primary"} className={classes.description}>
            <Button
              color="primary"
              onClick={() => history.push(ROUTES_DICT.register)}
              variant="contained"
              style={{
                borderRadius: 25,
                padding: "auto 1rem",
                color: "#fff",
                backgroundColor: "#00A796",
              }}
            >
              {" "}
              Regístrate
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        lg={4}
        md={4}
        sm={12}
        alignContent={"flex-start"}
        justifyContent={"center"}
        className={classes.rightContainer}
      >
        <Grid
          container
          item
          lg={6}
          md={12}
          sm={12}
          alignContent={"flex-start"}
          justifyContent={"center"}
        >
          <div className={classes.iconContainer}>
            <Facebook
              color={"primary"}
              className={classes.icon}
              onClick={() => {
                window.location.href =
                  "https://www.facebook.com/ContigoPecuario/";
              }}
            />
            <LinkedIn
              color={"primary"}
              className={classes.icon}
              onClick={() => {
                window.location.href =
                  "https://www.linkedin.com/company/contigo-pecuario/";
              }}
            />
          </div>
        </Grid>
        <Grid
          container
          item
          lg={6}
          md={12}
          sm={12}
          justifyContent={"flex-end"}
          className={classes.copyright}
        >
          <Typography variant={"caption"} color={"primary"}>
            conTigoⒸ {new Date().getFullYear()} All right reserved.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

Footer.propTypes = propTypes;

export default Footer;
