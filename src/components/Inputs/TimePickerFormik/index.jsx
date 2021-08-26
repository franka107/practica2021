import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useStyles } from "../styles";

export default function TimerPicker({ xs = 12, ...props }) {
  const classes = useStyles();
  const { error } = props;

  return (
    <Grid item xs={xs} {...props}>
      <TextField
        variant="filled"
        type="time"
        {...(error && { error: true, helperText: error })}
        InputLabelProps={{
          shrink: true,
          classes: {
            input: classes.dateField,
          },
        }}
        InputProps={{
          disableUnderline: true,
          step: 300,
        }}
        className={classes.dateField}
      />
    </Grid>
  );
}
