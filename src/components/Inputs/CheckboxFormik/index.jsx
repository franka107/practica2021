import React from "react";
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  Grid,
} from "@material-ui/core";
import { useStyles } from "../styles";
import { useField } from "formik";

export default function CheckboxFormik({ xs = 12, ...props }) {
  const [field, meta] = useField(props);
  const classes = useStyles();

  return (
    <Grid item xs={xs} {...props}>
      <FormControlLabel
        control={<MuiCheckbox error color="secondary" {...field} {...props} />}
        label={<div className={classes.checkBoxLabel}>{props.label}</div>}
        checked={Boolean(meta.value)}
      />
    </Grid>
  );
}
