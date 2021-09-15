import React from "react";
import { Grid, Typography, Paper, Divider } from "@material-ui/core";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "../../../styles";
import CustomMuiTable from "../../../components/CustomMuiTable";

function BirthListPage({ children }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CustomMuiTable />
      </Grid>
      <Grid item xs={12} className={classes.charts}>
        <Paper className={classes.paper}>
          <Typography variant={"subtitle1"}>Gráfica 3</Typography>
          <Divider className={classes.divider} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Partos</TableCell>
                      <TableCell align="right">Machos</TableCell>
                      <TableCell align="right">Hembras</TableCell>
                      <TableCell align="right">Abortos</TableCell>
                      <TableCell align="right">Promedio IEP</TableCell>
                      <TableCell align="right">
                        Promedio 1er Parto (Meses)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right">999,999</TableCell>
                      <TableCell align="right">999,999</TableCell>
                      <TableCell align="right">999,999</TableCell>
                      <TableCell align="right">999,999</TableCell>
                      <TableCell align="right">999,999</TableCell>
                      <TableCell align="right">999,999</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant={"subtitle1"}>Fecha</Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant={"body2"}>De</Typography>
                  <Typography variant={"body1"}>1/1/2021</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant={"body2"}>Hasta</Typography>
                  <Typography variant={"body1"}>1/1/2021</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container>
            <Grid item xs={12} sm={7}>
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    type: "bar",
                    margin: [50, 50, 120, 80],
                  },
                  title: {
                    text: "Mes Actual",
                  },

                  xAxis: {
                    categories: ["Abortos", "Hembas", "Machos"],
                  },
                  series: [
                    {
                      type: "bar",
                      colorByPoint: true,
                      data: [29.9, 71.5, 106.4],
                      showInLegend: false,
                    },
                  ],
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: "pie",
                    margin: [50, 50, 120, 80],
                  },
                  title: {
                    text: "Crecimiento",
                  },
                  accessibility: {
                    point: {
                      valueSuffix: "%",
                    },
                  },
                  plotOptions: {
                    pie: {
                      allowPointSelect: true,
                      cursor: "pointer",
                      dataLabels: {
                        enabled: false,
                      },
                      showInLegend: false,
                    },
                  },
                  xAxis: {
                    categories: ["Abortos", "Hembas", "Machos"],
                  },
                  tooltip: {
                    pointFormat:
                      "{series.name}: <b>{point.percentage:.1f}%</b>",
                  },
                  series: [
                    {
                      name: "Brands",
                      colorByPoint: true,
                      data: [
                        {
                          name: "Chrome",
                          y: 97,
                          sliced: true,
                          selected: true,
                        },
                        {
                          name: "Internet Explorer",
                          y: 3,
                        },
                      ],
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            style={{ padding: "2rem 0" }}
            spacing={3}
            justify={"center"}
          >
            <Grid item xs={12} sm={3}>
              {/* <Controls.Select
                  name={"conditon"}
                  label={"Eje X"}
                  options={[
                    { id: 1, name: "test1" },
                    { id: 2, name: "test2" },
                  ]}
                  defaultValue={2}
                  type={"select"}
                /> */}
            </Grid>
            <Grid item xs={12} sm={3}>
              {/* <Controls.Select
                  name={"conditon"}
                  label={"Eje Y"}
                  defaultValue={1}
                  options={[
                    { id: 1, name: "test1" },
                    { id: 2, name: "test2" },
                  ]}
                  type={"select"}
                /> */}
            </Grid>
          </Grid>
          <Grid item>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: "area",
                  margin: [20, 50, 60, 80],
                },
                title: {
                  text: "",
                },
                xAxis: {
                  categories: [
                    "1Jun",
                    "1Jul",
                    "1Agos",
                    "1Set",
                    "1Oct",
                    "1Nov",
                    "1Dic",
                    "1Ene",
                    "1Feb",
                    "1Mar",
                    "1Abr",
                  ],
                },
                series: [
                  {
                    type: "area",
                    colorByPoint: true,
                    data: [
                      29.9, 71.5, 30.4, 59.9, 11.5, 60.4, 49.9, 81.5, 70.4,
                      70.4, 70.4,
                    ],
                    showInLegend: false,
                  },
                ],
              }}
            />
          </Grid>
        </Paper>
      </Grid>
      {children()}
    </Grid>
  );
}

export default BirthListPage;
