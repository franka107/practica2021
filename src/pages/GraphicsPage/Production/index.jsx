import { Grid, Paper, Typography } from "@material-ui/core";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { sum } from "lodash";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useStyles } from "../styles";

const Production = ({ children }) => {
  const classes = useStyles();
  const milkControlCharts = useSelector((state) => state.milkGraphic.current);
  // const data = useSelector((state) => state.graphic.current);

  const animalList = useSelector((state) => state.animal.list);
  // const listAnimalDeads = useSelector((state) => state.animal.listDeads);

  // const isInProductionCount = data.isInProductionCount.count || 0;
  // const isDriedCount = data.isDriedCount.count || 0;

  const byProdution = animalList.filter(
    (e) => !e.isDried && e.birthsLength !== 0
  ).length;

  const byDried = animalList.filter((e) => e.isDried).length;

  const listWeightControl = useSelector(
    (state) => state.weight.list,
    shallowEqual
  );

  const gainWeigth = () => {
    const arrayD = [];
    listWeightControl.reduce(
      function (acumulador, siguienteValor) {
        const ant = acumulador.weight ? acumulador.weight : 0;
        const dsp = siguienteValor.weight ? siguienteValor.weight : 0;
        arrayD.push(dsp - ant);

        return {
          weight: dsp,
        };
      },
      { weight: 0 }
    );
    console.log(arrayD);

    return sum(arrayD).toFixed(1);
  };

  const averageWeigth = () => {
    const data = listWeightControl.reduce(
      function (acumulador, siguienteValor) {
        const ant = acumulador.weight ? acumulador.weight : 0;
        const dsp = siguienteValor.weight ? siguienteValor.weight : 0;
        return {
          weight: ant + dsp,
        };
      },
      { weight: 0 }
    );
    return (data.weight / listWeightControl.length).toFixed(1);
  };

  const totalWeigth = () => {
    const data = listWeightControl.reduce((weight, animal) => {
      const { animalId } = animal;
      weight[animalId] = weight[animalId] ?? [];
      weight[animalId].push(animal);
      return weight;
    }, {});

    return Object.keys(data).length;
  };

  const totalWeigthMale = () => {
    const data = listWeightControl
      .filter((e) => e.animal.gender === "MALE")
      .reduce((weight, animal) => {
        const { animalId } = animal;
        weight[animalId] = weight[animalId] ?? [];
        weight[animalId].push(animal);
        return weight;
      }, {});
    return Object.keys(data).length;
  };

  const byRace = () => {
    const rsl = milkControlCharts.byRaces.map((e) =>
      e.montlyBucket.sort((a, b) => {
        if (a.x > b.x) {
          return 1;
        }
        if (a.x < b.x) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })
    );
    return rsl;
  };

  const firstSampleAvg =
    milkControlCharts?.averages?.firstSampleAvgRounded || 0;
  const secondSampleAvg =
    milkControlCharts?.averages?.secondSampleAvgRounded || 0;

  const totalAvg = milkControlCharts?.averages?.totalAvgRounded || 0;

  const totalMilk = milkControlCharts?.averages?.totalMilk || 0;

  const byRacesx = () => {
    const r = byRace();
    let rsl = [];
    r.map((e) => {
      e.map((r) => {
        if (!rsl.includes(r.x)) {
          return rsl.push(r.x);
        }
        return false;
      });
      return false;
    });
    return rsl.sort();
  };

  const byRacesy = () => {
    const r = byRace();
    let rsl = [];
    r.map((e, i) => {
      const v = [];
      byRacesx().map((x) => {
        return v.push(0);
      });
      e.map((r) => {
        byRacesx().map((x, index) => {
          if (r.x === x) {
            return (v[index] = r.y);
          }
          return false;
        });
        return null;
      });

      return rsl.push({
        name:
          milkControlCharts.byRaces[i]._id &&
          milkControlCharts.byRaces[i]._id.name
            ? milkControlCharts.byRaces[i]._id.name
            : "Desconocida",
        data: v,
      });
    });
    return rsl;
  };

  const ProductionForRace = {
    noData: {},
    chart: {
      type: "spline",
    },
    title: {
      text: "",
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      // labelFormatter: function () {
      //   return this.point.name;
      // },
    },
    xAxis: {
      categories: byRacesx(),
    },
    yAxis: {
      title: {
        text: "Acumulado",
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: "#666666",
          lineWidth: 1,
        },
      },
    },
    series: byRacesy(),
    credits: {
      enabled: false,
    },
  };

  return (
    <>
      <Typography
        color={"primary"}
        align={"center"}
        className={classes.titleGraphics}
        // style={{ fontSize: 30, color: "black", paddingBottom: 20 }}
      >
        Conteo de Animales
      </Typography>
      <Grid item container xs={12} justifyContent="space-around">
        <Grid item md={4} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Producción
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {byProdution}
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Vacas
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={4} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Secas
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {byDried}
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Vacas
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Grid
        item
        lg={12}
        sm={12}
        xs={12}
        justifyContent={"center"}
        className={classes.highchartContainer}
      >
        <Paper className={classes.highchart} style={{ paddingTop: 10 }}>
          <Typography
            color={"primary"}
            align={"center"}
            className={classes.titleGraphics2}
            gutterBottom
            // style={{ fontSize: 30, color: "black", paddingBottom: 20 }}
          >
            #Leche Acumulado 12 Meses
          </Typography>
          {children}
          <HighchartsReact
            // noData="No data to display"
            highcharts={Highcharts}
            options={ProductionForRace}
          />
        </Paper>
      </Grid>
      <br />
      <br />
      <Typography
        color={"primary"}
        align={"center"}
        className={classes.titleGraphics}
        // style={{ fontSize: 30, color: "black", paddingBottom: 20 }}
      >
        Producción
      </Typography>
      <Grid item container xs={12} justifyContent="space-around">
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Total Producción
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {totalMilk}
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Litros
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Prom. x Producción
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {totalAvg} L.
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Leche
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Prom. Mañana
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {firstSampleAvg} L.
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Leche
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Prom. Tarde
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {secondSampleAvg} L.
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Leche
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <br />
      <Typography
        color={"primary"}
        align={"center"}
        className={classes.titleGraphics}
        // style={{ fontSize: 30, color: "black", paddingBottom: 20 }}
      >
        Pesos
      </Typography>
      <Grid item container xs={12} justifyContent="space-around">
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Animales Pesados
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {totalWeigth()}
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Animales
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Machos Pesados
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {totalWeigthMale()}
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Pesados
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Peso Prom.
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {averageWeigth()}
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Kilos
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Ganancia
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {gainWeigth()}
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Kg/Día
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Production;
