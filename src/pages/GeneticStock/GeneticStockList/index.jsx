import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Dialog,
  IconButton,
  Button,
} from "@material-ui/core";
import { Delete, Edit, Close, Star, StarBorder } from "@material-ui/icons";
import { columns, columns2 } from "./constants";
import { useStyles } from "./styles";
// import clsx from "clsx";
import FormEmbryo from "./Forms/FormEmbryo";
import FormMove from "./Forms/FormMove";
import CustomMuiTable from "../../../components/CustomMuiTable";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import GeneticStockActions from "../../../redux/actions/geneticStock.actions";
import ACTION_TYPES from "../../../redux/types";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import RaceActions from "../../../redux/actions/race.actions";
import ChipList from "../../../components/ChipList";
import { embryoRouteOptions, semenRouteOptions } from "../constants";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { ROUTES_DICT, ROUTES_SLUGS } from "../../../routes/routesDict";
import animalActions from "../../../redux/actions/animal.actions";
import TableButtons from "../../../components/TableButtons";

function GeneticStockList({ children, setTitle, setChipList }) {
  const dispatch = useDispatch();
  const params = useParams();
  const geneticStockList = useSelector(
    (state) =>
      state.geneticStock.list.filter(
        (e) => e.geneticType === params.geneticType.toUpperCase()
      ),
    shallowEqual
  );
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (params.geneticType === ROUTES_SLUGS.semen) {
      setTitle("Control de semen");
      setChipList(semenRouteOptions(location));
    } else if (params.geneticType === ROUTES_SLUGS.embryo) {
      setTitle("Control de embriones");
      setChipList(embryoRouteOptions(location));
    }
    if (!geneticStockList || geneticStockList.length === 0) {
      dispatch(GeneticStockActions.listGeneticStockByAgribusiness());
    }
  }, [params.geneticType]);

  const options = {
    selectableRows: "none",
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
            onClickDeleteButton={() => {}}
            onClickEditButton={() => {}}
            onClickStarButton={() => {}}
            starButtonFeatured={true}
          />
        );
      },
    },
  };

  return (
    <Grid container xs={12}>
      <Grid item xs={12}>
        <CustomMuiTable
          data={geneticStockList}
          columns={[...columns, actionColumn]}
          options={options}
        />
      </Grid>
      {children()}
    </Grid>
  );
}

export default GeneticStockList;
