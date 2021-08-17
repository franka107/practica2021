import React from "react";
import { TextField } from "@material-ui/core";
import { useStyles } from "./styles";

export default function DatePickerFieldFormik(props) {
  const classes = useStyles();
  const { name, label, value, error, onChange } = props;

  return (
    <TextField
      id={name}
      name={name}
      label={label}
      variant="filled"
      type="date"
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      InputLabelProps={{
        shrink: true,
        classes: {
          input: classes.dateField,
        },
      }}
      InputProps={{
        disableUnderline: true,
      }}
      className={classes.dateField}
    />
  );
}
