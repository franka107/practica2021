import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  FilledInput,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useStyles } from "../styles";

function PasswordFieldFormik({ xs = 12, ...props }) {
  const [field, meta, helpers] = useField(props);
  const [showPassword, handleShowPassword] = useState(false);
  const classes = useStyles();

  return (
    <Grid item xs={xs} {...props}>
      <FormControl
        className={classes.margin}
        variant="filled"
        error={meta.touched && Boolean(meta.error)}
      >
        <InputLabel htmlFor="outlined-adornment-password">
          {props.label}
        </InputLabel>
        <FilledInput
          type={showPassword ? "text" : "password"}
          {...field}
          {...props}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          disableUnderline
        />
        {meta.touched && Boolean(meta.error) && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}

PasswordFieldFormik.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
};

export default PasswordFieldFormik;
