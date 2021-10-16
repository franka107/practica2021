import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

function AutocompleteFieldFormik({
  xs = 12,
  options,
  defaultValue = null,
  onChange,
  disabled = false,
  displayName = true,
  ...props
}) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  // const filterOptions = createFilterOptions({
  //   matchFrom: "start",
  //   stringify: (option) => option.name,
  // });

  return (
    <Grid item xs={xs} {...props}>
      <Autocomplete
        // onChange={(event, value) => console.log(props)}
        onChange={(e, value) => setValue(value && value._id)}
        // {...props}
        disabled={disabled}
        defaultValue={defaultValue}
        options={options || []}
        getOptionLabel={(option) =>
          option
            ? displayName
              ? option.identifier + "-" + option?.name
              : option.identifier
            : ""
        }
        getOptionSelected={(option, value) => option._id === value._id}
        // filterOptions={filterOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            {...field}
            {...props}
            variant="filled"
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
          />
        )}
      />
    </Grid>
  );
}

AutocompleteFieldFormik.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
};

export default AutocompleteFieldFormik;
