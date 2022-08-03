import React from "react";
import { Grid } from "@material-ui/core";
import { useField } from "formik";
import { DatePicker } from "@material-ui/pickers";

export default function DatePickerFieldFormik({
  xs = 12,
  label = "",
  required = false,
  validate = true,
  ...props
}) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  //const url = await IdeasCloudApi.fetch()
  //fetch('url', 'PUT')
  return (
    <Grid item xs={xs} {...props}>
      <DatePicker
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
        format="yyyy-MM-dd"
        clearable
        {...field}
        {...props}
        onChange={(date) => setValue(date)}
        error={validate && meta.touched && Boolean(meta.error)}
        helperText={
          validate && meta.touched && meta.error && meta.touched && meta.error
        }
      />
    </Grid>
  );
}
