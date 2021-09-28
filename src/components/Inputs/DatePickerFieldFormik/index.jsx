import React from "react";
import { Grid } from "@material-ui/core";
import { useField } from "formik";
import { DatePicker } from "@material-ui/pickers";

export default function DatePickerFieldFormik({ xs = 12, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  //const url = await IdeasCloudApi.fetch()
  //fetch('url', 'PUT')
  return (
    <Grid item xs={xs} {...props}>
      <DatePicker
        inputVariant="filled"
        clearLabel="Limpiar"
        cancelLabel="Cancelar"
        okLabel="Ok"
        format="yyyy-MM-dd"
        clearable
        {...field}
        {...props}
        onChange={(date) => setValue(date)}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
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
