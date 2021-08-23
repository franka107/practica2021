import React from "react";
import MuiPhoneNumber from "material-ui-phone-number";

import { useStyles } from "../styles";
import { FormControl, FormHelperText } from "@material-ui/core";
import { useField } from "formik";
import { Grid } from "@material-ui/core";

export default function PhoneNumberFieldFormik({ xs = 12, ...props }) {
  const classes = useStyles();
  const [field, meta, helpers] = useField(props);

  //const handleOnChange = (value) => {
  //  if (value !== "+") {
  //    onChange(null, name, value);
  //  } else {
  //    onChange(null, name, "");
  //  }
  //};

  return (
    <Grid item xs={xs} {...props}>
      <FormControl
        className={classes.margin}
        error={meta.touched && Boolean(meta.error)}
      >
        <MuiPhoneNumber
          onlyCountries={["us", "pe", "cl", "ar", "co", "br"]}
          regions={[
            "north-america",
            "south-america",
            "central-america",
            "carribean",
            "european-union",
            "middle-east",
          ]}
          defaultCountry={"pe"}
          disableAreaCodes
          autoFormat={false}
          {...field}
          {...props}
          inputClass={classes.phoneInputDefault}
          InputProps={{
            className: classes.phoneInputDefaultText,
          }}
        />
        {meta.touched && Boolean(meta.error) && (
          <FormHelperText className={classes.errorPhone}>
            {meta.error}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}
