import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../styles";
import { useField } from "formik";

export default function RadioGroupFormik({ xs = 12, options, ...props }) {
  const classes = useStyles();
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  return (
    <FormControl error={meta.touched && Boolean(meta.error)}>
      <FormLabel>{props.label}</FormLabel>
      <MuiRadioGroup
        row
        {...field}
        {...props}
        onChange={(event) => setValue(event.currentTarget.value)}
      >
        {Boolean(options) &&
          options.map((option, index) => (
            <FormControlLabel
              key={option.index}
              value={option._id}
              control={<Radio />}
              label={
                <Typography className={classes.label}>{option.name}</Typography>
              }
              className={classes.labelContainer}
            />
          ))}
      </MuiRadioGroup>
      {meta.touched && Boolean(meta.error) && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
}
