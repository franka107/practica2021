import React from "react";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import { Grid } from "@material-ui/core";
import { Formik } from "formik";
import RegisterFarmForm from "../Forms/RegisterFarmForm";

const propTypes = {
  footer: PropTypes.bool,
};

function ConfigureFarm() {
  const classes = useStyles();

  return (
    <div className={classes.modal}>
      <RegisterFarmForm />
    </div>
  );
}

ConfigureFarm.propTypes = propTypes;

export default ConfigureFarm;
