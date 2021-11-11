import React, { useEffect, useState } from "react";
import { Grid, Switch } from "@material-ui/core";
import { columns } from "./constants";
import CustomMuiTable from "../../../components/CustomMuiTable";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import GeneticStockActions from "../../../redux/actions/geneticStock.actions";
import { embryoRouteOptions, semenRouteOptions } from "../constants";
import {
  useLocation,
  useHistory,
  useParams,
  generatePath,
} from "react-router-dom";
import { ROUTES_DICT, ROUTES_SLUGS } from "../../../routes/routesDict";
import TableButtons from "../../../components/TableButtons";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import DataContainer from "../../../components/DataContainer";
import SearchContainer from "../../../components/SearchContainer";

/**
 * @component
 * @description Componente, tabla que contiene la lista de stock genetico
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

function GeneticStockList({ children, setTitle, setChipList }) {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const [searchText, setSearchText] = useState();
  const geneticStockList = useSelector(
    (state) =>
      state.geneticStock.list.filter(
        (e) => e.geneticType === params.geneticType.toUpperCase()
      ),
    shallowEqual
  );
  const location = useLocation();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.geneticType]);

  const parseNumber = (n) => (isNaN(n) ? 0 : n);

  const getTotalValue = (list, property = "") =>
    list.reduce(
      (accumulated, current) => accumulated + parseNumber(current[property]),
      0
    );

  const options = {
    selectableRows: "none",
    searchText,
    search: false,
  };

  const activeColumn = {
    label: "Activo",
    name: "active",
    options: {
      searchable: false,
      filter: false,
      customBodyRenderLite: (dataIndex, rowIndex) => (
        <Switch
          checked={geneticStockList[dataIndex].active}
          onChange={(e) => {
            dispatch(
              geneticStockActions.updateGeneticStock({
                ...geneticStockList[dataIndex],
                active: e.target.checked,
              })
            );
          }}
        />
      ),
    },
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
            {
              ...{
                /* 
            onClickDeleteButton={() => {
              history.push(
                generatePath(ROUTES_DICT.geneticStock.geneticType.delete, {
                  ...params,
                  _id: geneticStockList[dataIndex]._id,
                })
              );
            }}

            */
              }
            }
            onClickEditButton={() => {
              history.push(
                generatePath(ROUTES_DICT.geneticStock.geneticType.update, {
                  ...params,
                  _id: geneticStockList[dataIndex]._id,
                })
              );
            }}
            onClickStarButton={() => {
              dispatch(
                geneticStockActions.updateGeneticStock({
                  ...geneticStockList[dataIndex],
                  isFeatured: !Boolean(geneticStockList[dataIndex].isFeatured),
                })
              );
            }}
            starButtonFeatured={geneticStockList[dataIndex].isFeatured}
          />
        );
      },
    },
  };

  return (
    <Grid container spacing={2} xs={12}>
      <SearchContainer searchText={searchText} setSearchText={setSearchText} />
      <Grid item xs={12}>
        <CustomMuiTable
          data={geneticStockList}
          columns={[...columns, actionColumn, activeColumn]}
          options={options}
        />
      </Grid>
      <DataContainer
        md={6}
        number={getTotalValue(geneticStockList, "stock")}
        title={"Existencias"}
      />
      <DataContainer
        md={6}
        number={getTotalValue(geneticStockList, "totalValue").toFixed(2)}
        title={"Valor total"}
      />
      {children()}
    </Grid>
  );
}

export default GeneticStockList;
