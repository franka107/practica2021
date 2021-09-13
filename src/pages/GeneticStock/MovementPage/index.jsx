import { Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import ChipList from "../../../components/ChipList";
import CustomMuiTable from "../../../components/CustomMuiTable";
import MovementActions from "../../../redux/actions/movement.actions";
import { ROUTES_SLUGS } from "../../../routes/routesDict";
import { embryoRouteOptions, semenRouteOptions } from "../constants";
import { columns } from "./constants";

const MovementPage = (props) => {
  const location = useLocation();
  const params = useParams();
  const history = useHistory();
  const movementList = useSelector((state) => state.movement.list);
  const dispatch = useDispatch();
  const options = {
    selectableRows: "none",
    search: false,
  };

  useEffect(() => {
    if (!movementList || movementList.length === 0) {
      params.geneticType === ROUTES_SLUGS.embryo &&
        dispatch(MovementActions.list("EMBRYO"));
      params.geneticType === ROUTES_SLUGS.semen &&
        dispatch(MovementActions.list("SEMEN"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, params]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">Movimientos</Typography>
      </Grid>
      {params.geneticType === ROUTES_SLUGS.embryo && (
        <ChipList routes={embryoRouteOptions(location)}></ChipList>
      )}
      {params.geneticType === ROUTES_SLUGS.semen && (
        <ChipList routes={semenRouteOptions(location)}></ChipList>
      )}
      {props.children}
      <Grid item xs={12}>
        <CustomMuiTable
          data={movementList}
          columns={columns(location, history, params.geneticType, movementList)}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

export default MovementPage;
