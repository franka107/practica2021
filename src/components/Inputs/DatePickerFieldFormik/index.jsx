import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useStyles } from "../styles";
import { useField } from "formik";
import { DatePicker } from "@material-ui/pickers";
import clsx from "clsx";

export default function DatePickerFieldFormik({ xs = 12, ...props }) {
  const classes = useStyles();
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <Grid item xs={xs} {...props}>
      <DatePicker
        inputVariant="filled"
        clearLabel="Limpiar"
        cancelLabel="Cancelar"
        okLabel="Ok"
        error={meta.touched && Boolean(meta.error)}
        format="yyyy-MM-dd"
        clearable
        {...field}
        {...props}
        onChange={(date) => setValue(date)}
      />
      {/*

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
      */}
    </Grid>
  );
}
