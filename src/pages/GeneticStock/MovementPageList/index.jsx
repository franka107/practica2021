import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector, shallowEqual } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import ChipList from "../../../components/ChipList";
import CustomMuiTable from "../../../components/CustomMuiTable";
import SearchContainer from "../../../components/SearchContainer";
import MovementActions from "../../../redux/actions/movement.actions";
import { ROUTES_SLUGS } from "../../../routes/routesDict";
import { embryoRouteOptions, semenRouteOptions } from "../constants";
import { columns } from "./constants";

const MovementPageList = ({ children, setTitle, setChipList }) => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const [searchText, setSearchText] = useState();
  const movementList = useSelector(
    (state) =>
      state.movement.list?.filter(
        (e) => e.geneticStock?.geneticType === params.geneticType.toUpperCase()
      ),
    shallowEqual
  );
  const dispatch = useDispatch();
  const options = {
    selectableRows: "none",
    search: false,
    searchText,
  };

  const { current: currentAgribusiness } = useSelector(
    (state) => state.agribusiness
  );
  useEffect(() => {
    setTitle("Movimientos");

    if (params.geneticType === ROUTES_SLUGS.semen) {
      setChipList(semenRouteOptions(location));
    } else if (params.geneticType === ROUTES_SLUGS.embryo) {
      setChipList(embryoRouteOptions(location));
    }

    if (!movementList || movementList.length === 0) {
      dispatch(MovementActions.list());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, params.geneticType, currentAgribusiness]);

  return (
    <Grid container spacing={2}>
      <SearchContainer searchText={searchText} setSearchText={setSearchText} />
      <Grid item xs={12}>
        <CustomMuiTable
          data={movementList}
          columns={columns(location, history, params.geneticType, movementList)}
          options={options}
        />
      </Grid>
      {children()}
    </Grid>
  );
};

export default MovementPageList;
