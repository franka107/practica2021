import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import ChipList from "../../components/ChipList";

const MovementPage = (props) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">Movimientos</Typography>
      </Grid>
      <ChipList routes={["asd", "asd", "asd"]}></ChipList>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MovementPage);
