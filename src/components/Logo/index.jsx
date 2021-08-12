import React from "react";
import clsx from "clsx";
import { useStyles } from "./styles";
import PropTypes from "prop-types";
import logo from "../../assets/images/logo bicolor.png";
import logoFooter from "../../assets/images/logo verde.png";

const propTypes = {
  footer: PropTypes.bool.isRequired,
  customClasses: PropTypes.object,
};

function Logo({ footer, customClasses }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.header, footer && classes.footer, customClasses)}
    >
      {!footer ? (
        <img src={logo} alt={"Logo"} className={classes.logo} />
      ) : (
        <img src={logoFooter} alt={"Logo"} className={classes.logo} />
      )}
    </div>
  );
}

Logo.propTypes = propTypes;

export default Logo;
