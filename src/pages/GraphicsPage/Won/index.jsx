import { Grid, Paper, Typography } from "@material-ui/core";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React from "react";
import { useSelector } from "react-redux";
import { sexDictionary, statusOptions } from "../../../constants";
import { useStyles } from "../styles";

const Won = () => {
  const classes = useStyles();
  const data = useSelector((state) => state.graphic.current);

  const dataByGender = () => {
    let rsl = [];
    data.byGender.map((e) => rsl.push([sexDictionary[e._id] + "s", e.count]));
    return rsl;
  };

  const dataByPregnantStatus = () => {
    let rsl = [];

    data.byPregnantStatus.map((e) =>
      rsl.push([e._id ? "Preñada" : "Vacia", e.count])
    );
    return rsl;
  };
  // console.log(dataByPregnantStatus());

  const dataByStatus = () => {
    let rsl = [];

    data.byStatus.map((e) => rsl.push([statusOptions[e._id], e.count]));

    return rsl;
  };

  const dataByBirthsInterval = () => {
    let rsl = [];

    data.byBirthsInterval.map((e) =>
      rsl.push({
        name:
          typeof e._id === "number"
            ? String(e._id) + "-" + (e._id + 30)
            : "+240",
        y: e.count,
      })
    );
    return rsl;
  };

  const WonforGender = {
    chart: {
      type: "pie",
      // options3d: {
      //   enabled: true,
      //   alpha: 45,
      // },
    },
    title: {
      text: "#Por Sexo",
    },
    plotOptions: {
      pie: {
        innerSize: 150,
        depth: 45,
      },
    },
    series: [
      {
        name: "Delivered amount",
        data: dataByGender(),
        dataLabels: {
          formatter: function () {
            return this.point.name + " : " + this.y;
          },
        },
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
            plotOptions: {
              pie: {
                innerSize: 100,
                depth: 45,
              },
              series: {
                borderWidth: 0,
                dataLabels: {
                  color: "#ffffff",
                  distance: -50,
                },
              },
            },
          },
        },
      ],
    },
    credits: {
      enabled: false,
    },
  };
  const WonforPregnat = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
      },
    },
    title: {
      text: "#Por Preñez",
    },
    plotOptions: {
      pie: {
        innerSize: 150,
        depth: 45,
      },
    },
    series: [
      {
        name: "Delivered amount",
        data: dataByPregnantStatus(),
        dataLabels: {
          formatter: function () {
            return this.point.name + " : " + this.y;
          },
        },
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
            plotOptions: {
              pie: {
                innerSize: 100,
                depth: 45,
              },
              series: {
                borderWidth: 0,
                dataLabels: {
                  color: "#ffffff",
                  distance: -50,
                },
              },
            },
          },
        },
      ],
    },
    credits: {
      enabled: false,
    },
  };
  const WonforStatus = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
      },
    },
    title: {
      text: "#Por Estado",
    },
    plotOptions: {
      pie: {
        innerSize: 150,
        depth: 45,
      },
    },
    series: [
      {
        name: "Delivered amount",
        data: dataByStatus(),
        dataLabels: {
          formatter: function () {
            return this.point.name + " : " + this.y;
          },
        },
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
            plotOptions: {
              pie: {
                innerSize: 100,
                depth: 45,
              },
              series: {
                borderWidth: 0,
                dataLabels: {
                  color: "#ffffff",
                  distance: -50,
                },
              },
            },
          },
        },
      ],
    },
    credits: {
      enabled: false,
    },
  };
  const WonforUpcomingBirths = {
    chart: {
      type: "column",
    },
    title: {
      align: "center",
      text: "Próximos Nacimientos",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Cantidad de nacimientos",
      },
    },
    legend: {
      enabled: false,
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y}",
        },
      },
    },

    lang: {
      noData: "Nichts zu anzeigen",
    },
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "#303030",
      },
    },

    tooltip: {
      headerFormat:
        '<span style="font-size:11px">{series.name}</span>: <b>{point.y}</b><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span><br/>',
    },

    series: [
      {
        name: "Nacimientos",
        colorByPoint: true,
        data: dataByBirthsInterval(),
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
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
        Cantidad de Animales
      </Typography>
      <Grid item xs={12}>
        <Grid container item xs={12}>
          <Grid
            item
            container
            md={6}
            sm={12}
            xs={12}
            justifyContent={"center"}
            className={classes.highchartContainer}
          >
            <Paper className={classes.highchart}>
              <HighchartsReact highcharts={Highcharts} options={WonforGender} />
            </Paper>
          </Grid>
          <br />
          <Grid
            item
            container
            md={6}
            sm={12}
            xs={12}
            justifyContent={"center"}
            className={classes.highchartContainer}
          >
            <Paper className={classes.highchart}>
              <HighchartsReact
                highcharts={Highcharts}
                options={WonforPregnat}
              />
            </Paper>
          </Grid>
        </Grid>
        <br />
        <Grid
          item
          container
          sm={12}
          xs={12}
          justifyContent={"center"}
          className={classes.highchartContainer}
        >
          <Paper className={classes.highchart}>
            <HighchartsReact highcharts={Highcharts} options={WonforStatus} />
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Grid
        item
        container
        xs={12}
        justifyContent={"center"}
        className={classes.highchartContainer}
      >
        <Paper className={classes.highchart} style={{ paddingRight: "2%" }}>
          <HighchartsReact
            highcharts={Highcharts}
            options={WonforUpcomingBirths}
          />
        </Paper>
      </Grid>
    </>
  );
};

export default Won;
