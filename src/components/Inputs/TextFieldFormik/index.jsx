import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import { Grid, TextField } from "@material-ui/core";

function TextFieldFormik({
  xs = 12,
  endAdornment,
  style,
  startAdornment = null,
  label = "",
  required = false,
  ...props
}) {
  const [field, meta] = useField(props);

  return (
    <Grid item xs={xs} {...props}>
      <TextField
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        inputProps={{ style: style }}
        InputProps={{
          endAdornment: endAdornment,
          startAdornment: startAdornment ? startAdornment : null,
        }}
        variant="filled"
        label={
          <>
            {label}
            {required && <strong style={{ color: "red" }}> ✱ </strong>}
          </>
        }
        {...field}
        {...props}
      />
    </Grid>
  );
}

TextFieldFormik.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
};

export default TextFieldFormik;
