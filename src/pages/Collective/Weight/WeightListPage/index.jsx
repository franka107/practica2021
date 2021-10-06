import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  generatePath,
} from "react-router-dom";
import { Grid } from "@material-ui/core";
import { columns } from "./constants";
import { weightRouteOptions } from "../constants";
import { useStyles } from "../styles";
import CustomMuiTable from "../../../../components/CustomMuiTable";
import TableButtons from "../../../../components/TableButtons";
import { ROUTES_DICT } from "../../../../routes/routesDict";
import WeightActions from "../../../../redux/actions/weight.actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SearchContainer from "../../../../components/SearchContainer";

function WeightListPage({ children, setTitle, setChipList }) {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchText, setSearchText] = useState();

  const listWeightControl = useSelector(
    (state) =>
      state.weight.list.filter((e) =>
        params._id ? e.animalId === params._id : e.animalId
      ),
    shallowEqual
  );

  useEffect(() => {
    // setTitle("Colectiva / Peso");
    // setChipList(weightRouteOptions(location));
    if (!listWeightControl || listWeightControl.length === 0) {
      dispatch(WeightActions.list());
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
                generatePath(ROUTES_DICT.collective.weight.delete, {
                  ...params,
                  _id: listWeightControl[dataIndex]._id,
                })
              );
            }}
            onClickEditButton={() => {
              history.push(
                generatePath(ROUTES_DICT.collective.weight.update, {
                  ...params,
                  _id: listWeightControl[dataIndex]._id,
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
          data={listWeightControl}
          columns={[...columns, actionColumn]}
          options={options}
        />
      </Grid>
      {children()}
    </Grid>
  );
}

export default WeightListPage;
