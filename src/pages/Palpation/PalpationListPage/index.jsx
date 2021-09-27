import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  generatePath,
} from "react-router-dom";
import { Grid } from "@material-ui/core";
import { columns } from "./constants";
import { palpationRouteOptions } from "../constants";
import { useStyles } from "../styles";
import CustomMuiTable from "../../../components/CustomMuiTable";
import { ROUTES_DICT } from "../../../routes/routesDict";
import TableButtons from "../../../components/TableButtons";
import { useDispatch, useSelector } from "react-redux";
import PalpationActions from "../../../redux/actions/palpation.actions";
import SearchContainer from "../../../components/SearchContainer";

const PalpationListPage = ({ children, setTitle, setChipList }) => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState();

  const listPalpationControl = useSelector((state) => state.palpation.list);

  useEffect(() => {
    setTitle("Palpaciones");
    setChipList(palpationRouteOptions(location));
    if (!listPalpationControl || listPalpationControl.length === 0) {
      dispatch(PalpationActions.list());
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
                generatePath(ROUTES_DICT.palpation.delete, {
                  ...params,
                  _id: listPalpationControl[dataIndex]._id,
                })
              );
            }}
            onClickEditButton={() => {
              history.push(
                generatePath(ROUTES_DICT.palpation.update, {
                  ...params,
                  _id: listPalpationControl[dataIndex]._id,
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
          data={listPalpationControl}
          columns={[...columns, actionColumn]}
          options={options}
        />
      </Grid>
      {children()}
    </Grid>
  );
};

export default PalpationListPage;
