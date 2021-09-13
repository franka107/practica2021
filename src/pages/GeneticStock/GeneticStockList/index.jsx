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

function GeneticStockList({ children, setTitle, setChipList }) {
  const dispatch = useDispatch();
  const params = useParams();
  const geneticStockList = useSelector(
    (state) =>
      state.geneticStock.list.filter((e) => e.geneticType === "EMBRYO"),
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
    //if (!races || races.length === 0) {
    //  dispatch(RaceActions.listRace());
    //}
    //if (!animalList) {
    //  dispatch(animalActions.listAll(currentAgribusiness?._id));
    //}
    //(!geneticStockList || geneticStockList.length === 0) &&
    //  dispatch(
    //    GeneticStockActions.listGeneticStockByAgribusiness({
    //      geneticType: "EMBRYO",
    //    })
    //  );
    //// eslint-disable-next-line react-hooks/exhaustive-deps
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
          <>
            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="edit"
              onClick={() => {
                history.push({
                  pathname: ROUTES_DICT.embryoUpdate.replace(
                    ":_id",
                    geneticStockList[dataIndex]._id
                  ),
                  background: location,
                });
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="delete"
              onClick={() => {
                //setOpen(true);
              }}
            >
              <Delete fontSize="small" />
            </IconButton>

            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="delete"
              onClick={() => {
                // data.outstanding = !data.outstanding;
                // setAnimalsList(data);
                dispatch(
                  geneticStockActions.updateGeneticStock({
                    ...geneticStockList[dataIndex],
                    isFeatured: !Boolean(
                      geneticStockList[dataIndex].isFeatured
                    ),
                  })
                ).then((data) => {
                  dispatch({
                    type: ACTION_TYPES.GENETICSTOCK.UPDATE_CURRENT,
                    payload: null,
                  });
                  dispatch(
                    geneticStockActions.listGeneticStockByAgribusiness({
                      geneticType: "EMBRYO",
                    })
                  );
                });
              }}
            >
              {Boolean(geneticStockList[dataIndex].isFeatured) === true && (
                <Star fontSize="small" />
              )}

              {Boolean(geneticStockList[dataIndex].isFeatured) === false && (
                <StarBorder fontSize="small" />
              )}
            </IconButton>
          </>
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
