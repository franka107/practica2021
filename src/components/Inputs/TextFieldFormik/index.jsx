import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import { Grid, TextField } from "@material-ui/core";

function TextFieldFormik(props) {
  const [field, meta, helpers] = useField(props);

  return (
    <Grid item xs={12}>
      <TextField
        error={meta.touched && Boolean(meta.error)}
        variant="filled"
        helperText={meta.touched && meta.error}
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
