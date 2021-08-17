import React from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import { useStyles } from "./styles";
import clsx from "clsx";

export default function SelectFieldFormik(props) {
  const classes = useStyles();
  const {
    name,
    label,
    defaultValue,
    error = null,
    onChange,
    options,
    customClasses,
    icon,
  } = props;

  return (
    <FormControl
      variant="filled"
      {...(error && { error: true })}
      className={clsx(classes.textField, customClasses)}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        defaultValue={defaultValue}
        value={defaultValue}
        onChange={onChange}
        disableUnderline
      >
        {Boolean(options) &&
          options.map((item) => {
            const Icon = item.icon;
            return (
              <MenuItem key={item.id} value={item.id}>
                <Grid
                  container
                  justify={"space-between"}
                  className={classes.textField}
                >
                  {!icon && item.name}
                  {item.icon && (
                    <Icon width={20} height={20} style={{ marginTop: -3 }} />
                  )}
                </Grid>
              </MenuItem>
            );
          })}
      </MuiSelect>
      {Boolean(error) && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
