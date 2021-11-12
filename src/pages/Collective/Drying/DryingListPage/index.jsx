import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  generatePath,
} from "react-router-dom";
import { Grid } from "@material-ui/core";
import { columns } from "./constants";
import { dryingRouteOptions } from "../constants";
import { useStyles } from "../styles";
import CustomMuiTable from "../../../../components/CustomMuiTable";
import TableButtons from "../../../../components/TableButtons";
import { ROUTES_DICT } from "../../../../routes/routesDict";
import { useDispatch, useSelector } from "react-redux";
import DryingActions from "../../../../redux/actions/drying.actions";
import SearchContainer from "../../../../components/SearchContainer";

/**
 * @component
 * @description Componente, tabla que contiene la lista de secados de vacas
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

function DryingListPage({ children, setTitle, setChipList }) {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchText, setSearchText] = useState();

  const listDryingControl = useSelector((state) => state.drying.list);

  useEffect(() => {
    setTitle("Colectiva / Secado");
    setChipList(dryingRouteOptions(location));
    if (!listDryingControl || listDryingControl.length === 0) {
      dispatch(DryingActions.list());
    }
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
              history.push(
                generatePath(ROUTES_DICT.collective.drying.delete, {
                  ...params,
                  _id: listDryingControl[dataIndex]._id,
                })
              );
            }}
            onClickEditButton={() => {
              history.push(
                generatePath(ROUTES_DICT.collective.drying.update, {
                  ...params,
                  _id: listDryingControl[dataIndex]._id,
                })
              );
            }}
          />
        );
      },
    },
  };

  return (
    <Grid container xs={12}>
      <SearchContainer searchText={searchText} setSearchText={setSearchText} />

      <Grid item xs={12} className={classes.registerContainer}>
        <CustomMuiTable
          data={listDryingControl}
          columns={[...columns, actionColumn]}
          options={options}
        />
      </Grid>
      {children()}
    </Grid>
  );
}

export default DryingListPage;
