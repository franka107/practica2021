import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import { ROUTES_DICT } from "../../../routes/routesDict";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import authService from "../../../services/auth.service";
import authActions from "../../../redux/actions/auth.actions";

function UserType({ onClick }) {
  const classes = useStyles();
  const [value, setValue] = useState(userTypes[0]._id);
  const { current: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(authActions.setType({ type: value, ...currentUser }));
    authService.sendVerificationEmail(currentUser, window.location.href);
    onClick();
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

      <Link to={ROUTES_DICT.livestockControl} className={classes.link}>
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
            <Grid key={`radio-btn-${userType._id}`} item md={6} xs={12}>
              <FormControlLabel
                value={userType._id}
                control={<Radio color="primary" />}
                label={
                  <Typography className={classes.label}>
                    {userType.title}
                  </Typography>
                }
                labelPlacement="start"
                className={classes.labelContainer}
                disabled={userType.disabled}
              />
            </Grid>
          ))}
        </RadioGroup>
      </FormControl>

      <Button className={classes.button} onClick={handleSubmit}>
        Registrar
      </Button>
    </Grid>
  );
}

export default UserType;
