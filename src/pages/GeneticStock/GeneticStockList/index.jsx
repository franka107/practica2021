import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { columns } from "./constants";
import CustomMuiTable from "../../../components/CustomMuiTable";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import GeneticStockActions from "../../../redux/actions/geneticStock.actions";
import { embryoRouteOptions, semenRouteOptions } from "../constants";
import { useLocation, useHistory, useParams } from "react-router-dom";
import { ROUTES_SLUGS } from "../../../routes/routesDict";
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
