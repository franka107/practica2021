import { Popover } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import { useTheme, Paper } from "@material-ui/core";
// eslint-disable-next-line no-unused-vars
import MaterialTable, { MaterialTableProps } from "@material-table/core";
import React, { useEffect } from "react";
import { useState } from "react";
import FilterOption from "./FilterOption";
import { useStyles } from "./styles";

/**
 * @param {MaterialTableProps} props
 * @param {Array} props.filters
 */
function CustomMaterialTable({ setData, ...props }) {
  const [filters, setFilters] = useState(props.filters || []);
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {}, []);

  return (
    <>
      {filters.length !== 0 && (
        <Grid item xs={12} className={classes.registerContainer}>
          <Paper className={classes.paperContainer}>
            {filters.map(({ field, type, title }, index) => (
              <FilterOption
                key={index}
                field={field}
                type={type}
                title={title}
              />
            ))}
          </Paper>
        </Grid>
      )}
      <Grid item xs={12} className={classes.registerContainer}>
        <MaterialTable
          options={{
            search: false,
            toolbar: false,
            showTitle: false,
            headerStyle: {
              color: theme.palette.secondary.main,
              backgroundColor: "#fafafa",
              position: "sticky",
              top: 0,
            },
            filtering: false,
          }}
          localization={{
            body: {
              emptyDataSourceMessage:
                "No ha añadido ningun animal a su establo",
            },
          }}
          {...props}
        />
      </Grid>
    </>
  );
}

export default CustomMaterialTable;
