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
  showName = "identifier",
  label = "",
  startAdornment = null,
  required = false,
  ...props
}) {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  // const filterOptions = createFilterOptions({
  //   matchFrom: "start",
  //   stringify: (option) => option.name,
  // });

  return (
    <Grid item xs={xs} {...props}>
      <Autocomplete
        onChange={(e, value) => {
          setValue(value && value._id);
        }}
        disabled={disabled}
        defaultValue={defaultValue}
        options={options || []}
        getOptionLabel={(option) =>
          option
            ? displayName
              ? option.identifier + (option?.name ? `- ${option?.name}` : "")
              : option[showName]
            : ""
        }
        {...props}
        getOptionSelected={(option, value) => option._id === value._id}
        // filterOptions={filterOptions}
        renderInput={(params) => (
          <div>
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: startAdornment || null,
              }}
              label={
                <>
                  {label}
                  {required && <strong style={{ color: "red" }}> ✱ </strong>}
                </>
              }
              variant="filled"
              error={meta.touched && Boolean(meta.error)}
              helperText={meta.touched && meta.error}
              fullWidth
            />
          </div>
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
