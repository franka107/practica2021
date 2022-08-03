import React from "react";
import { Grid } from "@material-ui/core";
import { useField } from "formik";
import { TimePicker } from "@material-ui/pickers";

export default function DatePickerFieldFormik({
  xs = 12,
  label = "",
  required = false,
  ...props
}) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <Grid item xs={xs} {...props}>
      <TimePicker
        label={
          <>
            {label}
            {required && <strong style={{ color: "red" }}> ✱ </strong>}
          </>
        }
        inputVariant="filled"
        clearLabel="Limpiar"
        cancelLabel="Cancelar"
        okLabel="Ok"
        clearable
        {...field}
        {...props}
        onChange={(hour) => setValue(hour)}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
    </Grid>
  );
}
