import React from "react";
import { useStyles } from "./styles";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { Grid, Paper, Typography } from "@material-ui/core";
import clsx from "clsx";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

function Impression() {
  const classes = useStyles();

  return (
    <Grid container xs={12}>
      <Grid item xs={12}>
        <Paper elevation={1} className={classes.userItemContainer}>
          <Typography
            variant={"body2"}
            align={"center"}
            className={classes.userItemText}
          >
            Impressions
          </Typography>
          <Typography
            color={"primary"}
            align={"center"}
            className={classes.userItemNumber}
          >
            87k
          </Typography>
          {/* <Typography
              variant={'body2'}
              align={'center'}
              className={classes.userItemText}
            >
              {chart.text}
            </Typography> */}
          <div className={classes.percentage}>
            <TrendingUpIcon className={clsx(classes.icon, classes.iconAsc)} />
            {/* <TrendingUpIcon
                className={clsx(classes.icon, classes.iconDesc)}
              /> */}
            <Typography
              variant={"body2"}
              align={"center"}
              className={clsx(
                classes.percentageText,
                classes.ascText
                // chart.percentage < 0 ? classes.descTex : classes.ascText
              )}
            >
              {/* {`${chart.percentage}%`} */}
              12% &nbsp;
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={clsx(classes.percentageText)}
            >
              of target
            </Typography>
          </div>
        </Paper>
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

            series: [
              {
                type: "area",
                colorByPoint: true,
                data: [29.9, 71.5, 30.4, 59.9, 11.5, 60.4, 49.9, 81.5, 70.4],
                showInLegend: false,
              },
            ],
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Impression;
