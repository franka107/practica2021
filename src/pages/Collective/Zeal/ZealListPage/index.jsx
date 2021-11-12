import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  generatePath,
} from "react-router-dom";
import { Grid } from "@material-ui/core";
import { columns } from "./constants";
import { zealRouteOptions } from "../constants";
import { useStyles } from "../styles";
import TableButtons from "../../../../components/TableButtons";
import { ROUTES_DICT } from "../../../../routes/routesDict";
import CustomMuiTable from "../../../../components/CustomMuiTable";
import { useDispatch, useSelector } from "react-redux";
import ZealActions from "../../../../redux/actions/zeal.actions";
import SearchContainer from "../../../../components/SearchContainer";

/**
 * @component
 * @description Componente, tabla que contiene la lista de asociaciones
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

function ZealListPage({ children, setTitle, setChipList }) {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchText, setSearchText] = useState();

  const listZealControl = useSelector((state) => state.zeal.list);

  useEffect(() => {
    setTitle("Colectiva / Celos");
    setChipList(zealRouteOptions(location));
    if (!listZealControl || listZealControl.length === 0) {
      dispatch(ZealActions.list());
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
                generatePath(ROUTES_DICT.collective.zeal.delete, {
                  ...params,
                  _id: listZealControl[dataIndex]._id,
                })
              );
            }}
            onClickEditButton={() => {
              history.push(
                generatePath(ROUTES_DICT.collective.zeal.update, {
                  ...params,
                  _id: listZealControl[dataIndex]._id,
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
          data={listZealControl}
          columns={[...columns, actionColumn]}
          options={options}
        />
      </Grid>
      {children()}
    </Grid>
  );
}

export default ZealListPage;
