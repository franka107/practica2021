import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useStyles } from "../styles";

export default function DatePickerFieldFormik({ xs = 12, ...props }) {
  const classes = useStyles();
  const { name, label, value, error, onChange } = props;

  return (
    <Grid item xs={xs} {...props}>
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
    </Grid>
  );
}
