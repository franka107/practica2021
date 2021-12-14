import React from "react";
import clsx from "clsx";
import { useStyles } from "./styles";
import PropTypes from "prop-types";
import logo from "../../assets/images/logo bicolor.png";
import logoFooter from "../../assets/images/logo verde.png";
import { ROUTES_DICT } from "../../routes/routesDict";
import { useHistory } from "react-router";

const propTypes = {
  footer: PropTypes.bool.isRequired,
  customClasses: PropTypes.object,
};

function Logo({ footer, customClasses, onClick = () => {} }) {
  const classes = useStyles();
  const history = useHistory();
  const redirect = () => {
    if (!footer) {
      history.push(ROUTES_DICT.login);
    } else {
      history.push(ROUTES_DICT.animal.list);
    }
  };
  return (
    <div
      onClick={redirect}
      className={clsx(classes.header, footer && classes.footer, customClasses)}
    >
      {!footer ? (
        <img src={logo} alt={"Logo"} className={classes.logo} />
      ) : (
        <img
          src={logoFooter}
          alt={"Logo"}
          className={`star-burst ${classes.logo}`}
        />
      )}
    </div>
  );
}

Logo.propTypes = propTypes;

export default Logo;
