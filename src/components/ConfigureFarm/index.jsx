import React from "react";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { useStyles } from "./styles";

const propTypes = {
  footer: PropTypes.bool,
};

function ConfigureFarm({ children, sections, handleNext, errors }) {
  const classes = useStyles();

  return (
    <div className={classes.modal}>
      <Typography variant={"subtitle1"} gutterBottom>
        Configure su hacienda
      </Typography>
      {/* 
      <CustomForm
        sections={sections}
        setFormSubmit={(value) => handleNext(value)}
        errorSubmit={errors}
      >
        {children}
      </CustomForm>
*/}
    </div>
  );
}

ConfigureFarm.propTypes = propTypes;

export default ConfigureFarm;
