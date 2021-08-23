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
import { useStyles } from "./styles";

export default function RadioGroupFormik(props) {
  const classes = useStyles();
  const { name, label, value, onChange, items, error = null } = props;

  return (
    <FormControl error={Boolean(error)}>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={
              <Typography className={classes.label}>{item.title}</Typography>
            }
            className={classes.labelContainer}
          />
        ))}
      </MuiRadioGroup>
      {Boolean(error) && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
