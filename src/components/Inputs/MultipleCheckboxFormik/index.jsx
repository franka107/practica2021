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

export default function MultipleCheckboxFormik({ xs = 12, options, ...props }) {
  const [field, meta] = useField(props);
  const classes = useStyles();

  return (
    <FormControl
      required
      error={meta.touched && Boolean(meta.error)}
      component="fieldset"
      className={clsx(classes.checkBoxFormControl)}
    >
      {props.label && (
        <FormLabel className={classes.checkBoxLabelForm}>
          {props.label}
        </FormLabel>
      )}
      <FormGroup className={classes.formControlContainer}>
        {Boolean(options) &&
          options.map((option) => (
            <FormControlLabel
              key={`checkbox-${option._id}`}
              control={
                <MuiCheckbox error color="secondary" {...field} {...props} />
              }
              label={<div className={classes.checkBoxLabel}>{option.name}</div>}
            />
          ))}
      </FormGroup>
      {meta.touched && Boolean(meta.error) && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
}
