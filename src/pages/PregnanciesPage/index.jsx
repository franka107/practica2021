// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { Grid, Typography, Paper } from "@material-ui/core";
import { useStyles } from "./styles";
import Impression from "./Impression";
import Visit from "./Visit";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function PregnanciesPage() {
  // const history = useHistory();
  // const { state = {} } = history.location;
  const classes = useStyles();

  return (
    <Grid container xs={12}>
      <Typography variant={"h6"}>Preñeces</Typography>
      <Grid container spacing={3}>
        <Grid item xs={9} className={classes.charts}>
          <Paper className={classes.paper}>
            <Typography variant={"h6"}>Porcentaje preñez</Typography>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Clasificacion</TableCell>
                    <TableCell align="right">Total Hembras</TableCell>
                    <TableCell align="right">Total Preñadas</TableCell>
                    <TableCell align="right">Total Vacias</TableCell>
                    <TableCell align="right">% Preñez</TableCell>
                    <TableCell align="right">100 días gestación</TableCell>
                    <TableCell align="right">100-200 días gestación</TableCell>
                    <TableCell align="right">200 días gestación</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      asd
                    </TableCell>
                    <TableCell align="right">asd</TableCell>
                    <TableCell align="right">asd</TableCell>
                    <TableCell align="right">asd</TableCell>
                    <TableCell align="right">asd</TableCell>
                    <TableCell align="right">asd</TableCell>
                    <TableCell align="right">asd</TableCell>
                    <TableCell align="right">asd</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: "column",
                  margin: [100, 50, 60, 80],
                },
                title: {
                  text: "",
                },

                series: [
                  {
                    type: "column",
                    colorByPoint: true,
                    data: [
                      29.9, 51.5, 80.4, 79.9, 71.5, 50.4, 42.9, 21.5, 36.4,
                      12.9, 89.5, 66.4, 22.9, 77.5, 86.4, 86.9, 12.5, 34.4,
                    ],
                    showInLegend: false,
                  },
                ],
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Grid item className={classes.charts}>
            <Impression />
          </Grid>
          <Grid item className={classes.charts}>
            <Visit />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PregnanciesPage;
