import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { columns } from "./constants";
import { dryingRouteOptions } from "../constants";
import { useStyles } from "../styles";
import CustomMuiTable from "../../../../components/CustomMuiTable";
import TableButtons from "../../../../components/TableButtons";
import { ROUTES_DICT } from "../../../../routes/routesDict";

function DryingListPage({ children, setTitle, setChipList }) {
  const history = useHistory();
  const location = useLocation();
  const [searchText] = useState();
  const classes = useStyles();

  useEffect(() => {
    setTitle("Colectiva / Secado");
    setChipList(dryingRouteOptions(location));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = {
    selectableRows: "none",
    searchText,
    search: false,
  };
  const actionColumn = {
    label: "Acciones",
    name: "actions",
    options: {
      searchable: false,
      filter: false,
      sort: false,
      customBodyRenderLite: (dataIndex, rowIndex) => {
        return (
          <TableButtons
            onClickDeleteButton={() => {
              history.push(ROUTES_DICT.collective.drying.delete);
            }}
            onClickEditButton={() => {
              history.push(ROUTES_DICT.collective.drying.update);
            }}
          />
        );
      },
    },
  };

  return (
    <Grid container xs={12}>
      <Grid item xs={12} className={classes.registerContainer}>
        <CustomMuiTable
          data={[{ _id: "hola" }]}
          columns={[...columns, actionColumn]}
          options={options}
        />
      </Grid>
      {children()}
    </Grid>
  );
}

export default DryingListPage;
