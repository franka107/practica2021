import React from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import { useStyles } from "../styles";
import clsx from "clsx";
import { useField } from "formik";

export default function SelectFieldFormik({ xs = 12, options, ...props }) {
  const classes = useStyles();
  const [field, meta, helpers] = useField(props);

  return (
    <Grid item xs={xs} {...props}>
      <FormControl
        variant="filled"
        className={clsx(classes.textField)}
        error={meta.touched && Boolean(meta.error)}
      >
        <InputLabel>{props.label}</InputLabel>
        <MuiSelect {...field} {...props}>
          {Boolean(options) &&
            options.map((item) => {
              const Icon = item.icon;
              return (
                <MenuItem key={item.id} value={item.id}>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    className={classes.textField}
                  >
                    {item.name}
                    {item.icon && (
                      <Icon width={20} height={20} style={{ marginTop: -3 }} />
                    )}
                  </Grid>
                </MenuItem>
              );
            })}
        </MuiSelect>
        {meta.touched && Boolean(meta.error) && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}
