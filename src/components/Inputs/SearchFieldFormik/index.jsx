import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

function SearchFieldFormik({
  xs = 12,
  options,
  defaultValue = null,
  onChange,
  ...props
}) {
  const [field, meta] = useField(props);

  // const filterOptions = createFilterOptions({
  //   matchFrom: "start",
  //   stringify: (option) => option.name,
  // });

  return (
    <Grid item xs={xs} {...props}>
      <Autocomplete
        // onChange={(event, value) => console.log(props)}
        onChange={onChange}
        // {...props}
        defaultValue={defaultValue}
        options={options || []}
        getOptionLabel={(option) => (option ? option.name : "")}
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

SearchFieldFormik.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
};

export default SearchFieldFormik;
