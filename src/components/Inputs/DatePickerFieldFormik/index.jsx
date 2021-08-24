import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useStyles } from "../styles";
import { useField } from "formik";

export default function DatePickerFieldFormik({ xs = 12, ...props }) {
  const classes = useStyles();
  const [field, meta, helpers] = useField(props);

  return (
    <Grid item xs={xs} {...props}>
      <TextField
        variant="filled"
        type="date"
        InputLabelProps={{
          shrink: true,
          // classes: {
          //   input: classes.dateField,
          // },
        }}
        InputProps={{
          disableUnderline: true,
        }}
        className={classes.dateField}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        {...field}
        {...props}
      />
    </Grid>
  );
}
