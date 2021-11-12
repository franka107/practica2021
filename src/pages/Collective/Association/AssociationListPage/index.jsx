import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  generatePath,
} from "react-router-dom";
import { Grid } from "@material-ui/core";
import { columns } from "./constants";
import { associationRouteOptions } from "../constants";
import { useStyles } from "../styles";
import TableButtons from "../../../../components/TableButtons";
import { ROUTES_DICT } from "../../../../routes/routesDict";
import CustomMuiTable from "../../../../components/CustomMuiTable";
import { useDispatch, useSelector } from "react-redux";
import AssociationActions from "../../../../redux/actions/association.actions";
import SearchContainer from "../../../../components/SearchContainer";

/**
 * @component
 * @description Componente, tabla que contiene la lista de asociaciones
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

function AssociationListPage({ children, setTitle, setChipList }) {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchText, setSearchText] = useState();

  const listAssociationControl = useSelector((state) => state.association.list);

  useEffect(() => {
    setTitle("Colectiva / Asociación");
    setChipList(associationRouteOptions(location));
    if (!listAssociationControl || listAssociationControl.length === 0) {
      dispatch(AssociationActions.list());
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
                generatePath(ROUTES_DICT.collective.association.delete, {
                  ...params,
                  _id: listAssociationControl[dataIndex]._id,
                })
              );
            }}
            onClickEditButton={() => {
              history.push(
                generatePath(ROUTES_DICT.collective.association.update, {
                  ...params,
                  _id: listAssociationControl[dataIndex]._id,
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
          data={listAssociationControl}
          columns={[...columns, actionColumn]}
          options={options}
        />
      </Grid>
      {children()}
    </Grid>
  );
}

export default AssociationListPage;
