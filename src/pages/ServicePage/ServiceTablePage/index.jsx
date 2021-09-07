import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import ChipList from "../../../components/ChipList";
import CustomMuiTable from "../../../components/CustomMuiTable";
import { serviceRouteOptions, columnsToMuiTable } from "../constants";
const ServicePage = (props) => {
  const location = useLocation();
  const options = {
    selectableRows: "none",
    search: false,
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">Servicios</Typography>
      </Grid>
      <ChipList routes={serviceRouteOptions(location)}></ChipList>
      {props.children}
      <Grid item xs={12}>
        <CustomMuiTable columns={columnsToMuiTable} options={options} />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ServicePage);
