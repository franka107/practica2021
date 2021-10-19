import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { Dialog, Grid, Paper, Typography } from "@material-ui/core";
import clsx from "clsx";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { chartData, renderChartDetailOptions, chartOptions } from "./constants";
import { useSelector } from "react-redux";
import IdeasCloudApi from "../../../helpers/ideascloudApi";

function AnimalCharts() {
  const classes = useStyles();
  const [openDetail, setOpenDetail] = useState(false);
  const animalList = useSelector((state) => state.animal.list);
  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );
  const [chartsInfo, setChartsInfo] = useState({});
  const [chartsInfoBirths, setChartsInfoBirths] = useState({});

  useEffect(() => {
    IdeasCloudApi.fetch("animalGetCharts", {
      agribusinessId: currentAgribusiness._id,
    }).then((response) => {
      setChartsInfo(response);
      IdeasCloudApi.fetch("birthGetCharts", {
        agribusinessId: currentAgribusiness._id,
      }).then((response) => {
        setChartsInfoBirths(response);
      });
    });
  }, [animalList]);

  const chartRealOptions = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
      },
    },
    title: {
      text: "GRÁFICO DE DENSIDAD: ",
    },
    subtitle: {
      text: "CRÍAS MACHOS, CRÍAS HEMBRAS Y ABORTOS  - AÑO 2021",
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45,
      },
    },
    series: [
      {
        name: "Delivered amount",
        data: [
          ["Crías Hembras", chartsInfo.femaleBreedings?.total || 0],
          ["Crías Machos", chartsInfo.maleBreedings?.total || 0],
          ["Abortos", chartsInfoBirths.aborts?.total || 0],
        ],
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <Grid container xs={12} className={classes.container}>
      <Grid item container lg={7} xs={12}>
        <Grid
          item
          container
          xs={12}
          spacing={2}
          justifyContent={"center"}
          className={classes.cardContainer}
        >
          <Grid item md={4} xs={12}>
            <Paper
              elevation={1}
              className={classes.userItemContainer}
              onClick={() => setOpenDetail(true)}
            >
              <Typography
                color={"primary"}
                align={"center"}
                className={classes.userItemNumber}
              >
                {chartsInfo.animals?.total || 0}
              </Typography>
              <Typography
                variant={"body2"}
                align={"center"}
                className={classes.userItemText}
              >
                Nro. de animales
              </Typography>
              <div className={classes.percentage}>
                {chartsInfo.animals?.percentage > 0 ? (
                  <TrendingUpIcon
                    className={clsx(classes.icon, classes.iconAsc)}
                  />
                ) : (
                  <TrendingUpIcon
                    className={clsx(classes.icon, classes.iconDesc)}
                  />
                )}
                <Typography
                  variant={"body2"}
                  align={"center"}
                  className={clsx(
                    classes.percentageText,
                    chartsInfo.animals?.percentage < 0
                      ? classes.descTex
                      : classes.ascText
                  )}
                >
                  {`${chartsInfo.animals?.percentage || 0}%`}
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper
              elevation={1}
              className={classes.userItemContainer}
              onClick={() => setOpenDetail(true)}
            >
              <Typography
                color={"primary"}
                align={"center"}
                className={classes.userItemNumber}
              >
                {chartsInfo.animalsInProduction?.total || 0}
              </Typography>
              <Typography
                variant={"body2"}
                align={"center"}
                className={classes.userItemText}
              >
                Vacas de producción
              </Typography>
              <div className={classes.percentage}>
                {chartsInfo.animalsInProduction?.percentage > 0 ? (
                  <TrendingUpIcon
                    className={clsx(classes.icon, classes.iconAsc)}
                  />
                ) : (
                  <TrendingUpIcon
                    className={clsx(classes.icon, classes.iconDesc)}
                  />
                )}
                <Typography
                  variant={"body2"}
                  align={"center"}
                  className={clsx(
                    classes.percentageText,
                    chartsInfo.animalsInProduction?.percentage < 0
                      ? classes.descTex
                      : classes.ascText
                  )}
                >
                  {`${chartsInfo.animalsInProduction?.percentage || 0}%`}
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper
              elevation={1}
              className={classes.userItemContainer}
              onClick={() => setOpenDetail(true)}
            >
              <Typography
                color={"primary"}
                align={"center"}
                className={classes.userItemNumber}
              >
                {chartsInfo.bellyHeifers?.total || 0}
              </Typography>
              <Typography
                variant={"body2"}
                align={"center"}
                className={classes.userItemText}
              >
                Novillas de vientre
              </Typography>
              <div className={classes.percentage}>
                {chartsInfo.bellyHeifers?.percentage > 0 ? (
                  <TrendingUpIcon
                    className={clsx(classes.icon, classes.iconAsc)}
                  />
                ) : (
                  <TrendingUpIcon
                    className={clsx(classes.icon, classes.iconDesc)}
                  />
                )}
                <Typography
                  variant={"body2"}
                  align={"center"}
                  className={clsx(
                    classes.percentageText,
                    chartsInfo.bellyHeifers?.percentage < 0
                      ? classes.descTex
                      : classes.ascText
                  )}
                >
                  {`${chartsInfo.bellyHeifers?.percentage || 0}%`}
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper
              elevation={1}
              className={classes.userItemContainer}
              onClick={() => setOpenDetail(true)}
            >
              <Typography
                color={"primary"}
                align={"center"}
                className={classes.userItemNumber}
              >
                {chartsInfo.animalsAboutToGiveBirth?.total || 0}
              </Typography>
              <Typography
                variant={"body2"}
                align={"center"}
                className={classes.userItemText}
              >
                Partos programados
              </Typography>
              <div className={classes.percentage}>
                {chartsInfo.animalsAboutToGiveBirth?.percentage > 0 ? (
                  <TrendingUpIcon
                    className={clsx(classes.icon, classes.iconAsc)}
                  />
                ) : (
                  <TrendingUpIcon
                    className={clsx(classes.icon, classes.iconDesc)}
                  />
                )}
                <Typography
                  variant={"body2"}
                  align={"center"}
                  className={clsx(
                    classes.percentageText,
                    chartsInfo.animalsAboutToGiveBirth?.percentage < 0
                      ? classes.descTex
                      : classes.ascText
                  )}
                >
                  {`${chartsInfo.animalsAboutToGiveBirth?.percentage || 0}%`}
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper
              elevation={1}
              className={classes.userItemContainer}
              onClick={() => setOpenDetail(true)}
            >
              <Typography
                color={"primary"}
                align={"center"}
                className={classes.userItemNumber}
              >
                {chartsInfo.driedAnimals?.total || 0}
              </Typography>
              <Typography
                variant={"body2"}
                align={"center"}
                className={classes.userItemText}
              >
                Vacas secas
              </Typography>
              <div className={classes.percentage}>
                {chartsInfo.driedAnimals?.percentage > 0 ? (
                  <TrendingUpIcon
                    className={clsx(classes.icon, classes.iconAsc)}
                  />
                ) : (
                  <TrendingUpIcon
                    className={clsx(classes.icon, classes.iconDesc)}
                  />
                )}
                <Typography
                  variant={"body2"}
                  align={"center"}
                  className={clsx(
                    classes.percentageText,
                    chartsInfo.driedAnimals?.percentage < 0
                      ? classes.descTex
                      : classes.ascText
                  )}
                >
                  {`${chartsInfo.driedAnimals?.percentage || 0}%`}
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item md={4} xs={12}>
            <Paper
              elevation={1}
              className={classes.userItemContainer}
              onClick={() => setOpenDetail(true)}
            >
              <Typography
                color={"primary"}
                align={"center"}
                className={classes.userItemNumber}
              >
                {chartsInfo.heifersAboutToGiveBirth?.total || 0}
              </Typography>
              <Typography
                variant={"body2"}
                align={"center"}
                className={classes.userItemText}
              >
                Novillas próximas al parto
              </Typography>
              <div className={classes.percentage}>
                {chartsInfo.heifersAboutToGiveBirth?.percentage > 0 ? (
                  <TrendingUpIcon
                    className={clsx(classes.icon, classes.iconAsc)}
                  />
                ) : (
                  <TrendingUpIcon
                    className={clsx(classes.icon, classes.iconDesc)}
                  />
                )}
                <Typography
                  variant={"body2"}
                  align={"center"}
                  className={clsx(
                    classes.percentageText,
                    chartsInfo.heifersAboutToGiveBirth?.percentage < 0
                      ? classes.descTex
                      : classes.ascText
                  )}
                >
                  {`${chartsInfo.heifersAboutToGiveBirth?.percentage || 0}%`}
                </Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        lg={5}
        xs={12}
        justifyContent={"center"}
        className={classes.highchartContainer}
      >
        <Paper className={classes.highchart}>
          <HighchartsReact highcharts={Highcharts} options={chartRealOptions} />
        </Paper>
      </Grid>
      <Dialog
        open={openDetail}
        fullWidth
        onClose={() => setOpenDetail(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={renderChartDetailOptions(animalList)}
        />
      </Dialog>
    </Grid>
  );
}

export default AnimalCharts;
