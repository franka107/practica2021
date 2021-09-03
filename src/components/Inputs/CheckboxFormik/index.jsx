import React from "react";
import {
  Checkbox as MuiCheckbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
import { useStyles } from "../styles";
import clsx from "clsx";
import { useField } from "formik";

export default function CheckboxFormik({ xs = 12, ...props }) {
  const [field, meta] = useField(props);
  const classes = useStyles();

  return (
    <FormControlLabel
      control={<MuiCheckbox error color="secondary" {...field} {...props} />}
      label={<div className={classes.checkBoxLabel}>{props.label}</div>}
      checked={Boolean(meta.value)}
    />
  );
}
