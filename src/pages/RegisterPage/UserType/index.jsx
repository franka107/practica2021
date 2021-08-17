import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { userTypes } from "./constants";
import { Link, useHistory } from "react-router-dom";
import { useStyles } from "./styles";
import routesDictionary from "../../../routers/routesDict";

const propTypes = {
  setLoginState: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

function UserType({ onClick, setLoginState, hasFarm, hasAgribusiness }) {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(userTypes[0].key);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  //const handleRegister = () => {
  //  history.push(routesDictionary.registerModal, {
  //    hasFarm: false,
  //    hasAgribusiness: false,
  //  });
  //};

  return (
    <Grid item className={classes.container}>
      <Typography align={"center"} className={classes.title}>
        Elija el tipo de usuario
      </Typography>
      <Typography gutterBottom className={classes.subtitle}>
        Tipo de usuario
      </Typography>
      <Typography gutterBottom className={classes.description}>
        Cada tipo de usuario tiene acceso a diferentes vistas.
      </Typography>
      {userTypes.map((userType) => (
        <div key={userType.key} className={classes.userTypeContainer}>
          <Typography
            variant={"caption"}
            gutterBottom
            align={"center"}
            className={classes.userTitle}
          >
            {`${userType.title}: `}
          </Typography>
          <Typography
            variant={"caption"}
            gutterBottom
            align={"center"}
            className={classes.description}
          >
            {userType.description}
          </Typography>
        </div>
      ))}

      <Link to={routesDictionary.livestockControl} className={classes.link}>
        <Typography variant={"caption"} gutterBottom>
          Más información aquí
        </Typography>
      </Link>

      <FormControl component="fieldset" className={classes.itemContainer}>
        <RadioGroup
          row
          aria-label="userTypes"
          name="userTypes"
          defaultValue="top"
          value={value}
          onChange={handleChange}
        >
          {userTypes.map((userType) => (
            <Grid key={`radio-btn-${userType.id}`} item md={6} xs={12}>
              <FormControlLabel
                value={userType.key}
                control={<Radio />}
                label={
                  <Typography className={classes.label}>
                    {userType.title}
                  </Typography>
                }
                labelPlacement="start"
                className={classes.labelContainer}
              />
            </Grid>
          ))}
        </RadioGroup>
      </FormControl>

      <Button className={classes.button} onClick={onClick}>
        Registrar
      </Button>
    </Grid>
  );
}

UserType.propTypes = propTypes;

export default UserType;
