import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import { Grid, Paper } from "@material-ui/core";
import home from "../../assets/images/home.jpg";
import registerImg from "../../assets/images/register.jpg";

const propTypes = {
  children: PropTypes.array.isRequired,
  register: PropTypes.bool,
};

RegisterCard.defaultProps = {
  register: false,
};

function RegisterCard({ children, register }) {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      justifyContent={"center"}
      alignContent={"center"}
      className={classes.root}
    >
      <Grid
        item
        lg={4}
        md={5}
        sm={5}
        container
        direction={"column"}
        justifyContent={"center"}
        alignContent={"center"}
        className={classes.container}
      >
        <Paper elevation={10} className={classes.registerContainer}>
          {children}
        </Paper>
      </Grid>
      <Grid
        item
        lg={4}
        md={5}
        sm={5}
        container
        justifyContent={"center"}
        alignContent={"center"}
        className={classes.container}
      >
        <Paper elevation={10} className={classes.bannerContainer}>
          {!register ? (
            <img src={home} className={classes.img} alt={"banner"} />
          ) : (
            <img src={registerImg} className={classes.img} alt={"register"} />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

RegisterCard.propTypes = propTypes;

export default RegisterCard;
