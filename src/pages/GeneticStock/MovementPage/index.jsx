import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import ChipList from "../../../components/ChipList";
import { ROUTES_SLUGS } from "../../../routes/routesDict";
import { embryoRouteOptions, semenRouteOptions } from "../constants";

const MovementPage = (props) => {
  const location = useLocation();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">Movimientos</Typography>
      </Grid>
      {location.pathname.includes(ROUTES_SLUGS.embryo) && (
        <ChipList routes={embryoRouteOptions}></ChipList>
      )}
      {location.pathname.includes(ROUTES_SLUGS.semen) && (
        <ChipList routes={semenRouteOptions}></ChipList>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MovementPage);
