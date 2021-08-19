import { Paper } from "@material-ui/core";
import { Chip, Typography } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Close, Edit } from "@material-ui/icons";
import clsx from "clsx";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import { BorderLinearProgress } from "../../components/BorderLinearProgress";
import PlanCard from "../../components/PlanCard";
import { useStyles } from "./styles";
import Highcharts from "highcharts";
// import BirthData from "./Dialog/BirthData";
// import GeneralData from "./Dialog/GeneralData";
// import RaceData from "./Dialog/RaceData";
// import ServiceData from "./Dialog/ServiceData";
// import WeighingData from "./Dialog/WeighingData";
// import OtherData from "./Dialog/OtherData";
// import MilkData from "./Dialog/MilkData";
// import CommentaryData from "./Dialog/CommentaryData";
// import CalendarData from "./Dialog/Calendar";
import Calendar from "react-calendar";
import { Dialog } from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import QRData from "./Dialog/QRData";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { animalActions } from "../../redux/actions/animal.actions";
import { ROUTES_DICT } from "../../routes/routesDict";

export default function AnimalDetailPage() {
  const classes = useStyles();
  const [dialog, setDialog] = useState("");
  const [open, setOpen] = useState(false);
  const [cow, setCow] = useState({
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cow_female_black_white.jpg/782px-Cow_female_black_white.jpg",
  });
  const history = useHistory();
  const { location = {} } = history;
  const dispatch = useDispatch();
  const { animals } = useSelector((state) => state.animal);

  useEffect(() => {
    const id = location.hash + "";
    dispatch(animalActions.listById({ _id: id.replace(/#/gi, "") }));
  }, [location]);

  return (
    <Grid container xs={12}>
      <Grid item container xs={12}>
        <Typography variant="h6">Control Ganadero</Typography>
        <Grid container spacing={2} className={classes.optionContainer}>
          <Grid item>
            <Chip className={clsx(classes.option)} label="Inicio"></Chip>
          </Grid>
          <Grid item>
            <Chip
              className={clsx(classes.option, classes.active)}
              label="Información General"
            ></Chip>
          </Grid>
          <Grid item>
            <Chip
              className={clsx(classes.option)}
              onClick={() => {
                history.push(ROUTES_DICT.pedigree);
              }}
              label="Pedigree"
            ></Chip>
          </Grid>
          <Grid item>
            <Chip
              className={clsx(classes.option, classes.optionDelete)}
              label="Eliminar animal"
            ></Chip>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={12} lg={9}>
          <Grid container xs={12}>
            <Grid item xs={12} lg={4}>
              {/* General Info Card */}
              <Paper elevation={4} className={classes.card}>
                <div className={classes.cardHeader}>
                  <Typography variant="body1" className={classes.cardTitle}>
                    Datos generales
                  </Typography>
                  <IconButton
                    className={classes.cardEditIcon}
                    size="small"
                    onClick={() => {
                      setOpen(true);
                      setDialog("GeneralData");
                    }}
                  >
                    <Edit fontSize="small"></Edit>
                  </IconButton>
                </div>
                <Divider></Divider>
                <div className="">
                  <div className={classes.image}>
                    <div className={clsx(classes.cowImageEditButton)}>
                      <IconButton
                        className={clsx(
                          classes.cardEditIcon,
                          classes.cardEditButtonCow
                        )}
                        size="small"
                      >
                        <Edit fontSize="small"></Edit>
                      </IconButton>
                    </div>
                    <img
                      src={cow.imageSrc}
                      className={classes.cowImage}
                      alt=""
                      srcset=""
                    />
                    <div className={clsx(classes.cowImageQrButton)}>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/1200px-Codigo_QR.svg.png"
                        alt=""
                        className={classes.qrImage}
                        onClick={() => {
                          setOpen(true);
                          setDialog("QRData");
                        }}
                      />
                    </div>
                  </div>
                  <Typography
                    variant="h4"
                    className={clsx(classes.textCenter, classes.cowCodeTitle)}
                  >
                    00123
                  </Typography>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={3}>
                      <Typography className={classes.cardFeature}>
                        Nombre
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{animals && animals.name}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={3}>
                      <Typography className={classes.cardFeature}>
                        Sexo
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>Hembra</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={3}>
                      <Typography className={classes.cardFeature}>
                        Edad
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>4 años, 2 meses, 15 dias</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={3}>
                      <Typography className={classes.cardFeature}>
                        Estado
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>Vaca seca, 276 dias de preñez</Typography>
                    </Grid>
                  </Grid>
                  <div className={classes.borderLinearProgress}>
                    <BorderLinearProgress
                      variant="determinate"
                      value="50"
                      about="asd"
                    ></BorderLinearProgress>
                  </div>
                  <div className={classes.cardHeader}>
                    <Typography variant="body1" className={classes.cardTitle}>
                      Nacimiento
                    </Typography>
                  </div>
                  <Divider className={classes.divider}></Divider>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={4}>
                      <Typography className={classes.cardFeature}>
                        Fecha
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>03 de Enero del 2016</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={4}>
                      <Typography className={classes.cardFeature}>
                        Entrada hato
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>04 de enero del 2017</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={4}>
                      <Typography className={classes.cardFeature}>
                        Nro. Registros
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>005</Typography>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Grid container style={{ height: "100%" }} xs={12}>
                <Grid item xs={12} lg={6}>
                  {/* Race card */}
                  <Paper
                    style={{ height: "96%" }}
                    elevation={4}
                    className={classes.card}
                  >
                    <div className={classes.cardHeader}>
                      <Typography variant="body1" className={classes.cardTitle}>
                        Raza
                      </Typography>
                      <IconButton
                        className={classes.cardEditIcon}
                        size="small"
                        onClick={() => {
                          setOpen(true);
                          setDialog("RaceData");
                        }}
                      >
                        <Edit fontSize="small"></Edit>
                      </IconButton>
                    </div>
                    <Divider className={classes.divider}></Divider>
                    <div className="">
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={5}>
                          <Typography className={classes.cardFeature}>
                            Padre
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography>#0001</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={5}>
                          <Typography className={classes.cardFeature}>
                            Madre
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography>#0002</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={5}>
                          <Typography className={classes.cardFeature}>
                            Raza
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography>03 Holstein NEG-T 100%</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={5}>
                          <Typography className={classes.cardFeature}>
                            Color
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography>Rojo</Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                  {/* Parts Card */}
                  <Paper
                    style={{ height: "96%" }}
                    elevation={4}
                    className={classes.card}
                  >
                    <div className={classes.cardHeader}>
                      <Typography variant="body1" className={classes.cardTitle}>
                        Partos
                      </Typography>
                      <IconButton
                        className={classes.cardEditIcon}
                        size="small"
                        onClick={() => {
                          setOpen(true);
                          setDialog("BirthData");
                        }}
                      >
                        <Edit fontSize="small"></Edit>
                      </IconButton>
                    </div>
                    <Divider></Divider>
                    <a className={clsx(classes.link)} href="/#">
                      Grafica Reproductiva
                    </a>
                    <div className="">
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={5}>
                          <Typography className={classes.cardFeature}>
                            Nro. de partos
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography>2</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={5}>
                          <Typography className={classes.cardFeature}>
                            Ultimo parto
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography>23 de Junio del 2018</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={5}>
                          <Typography className={classes.cardFeature}>
                            IEPT
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography>0.00</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={5}>
                          <Typography className={classes.cardFeature}>
                            IEP u
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography>0</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={5}>
                          <Typography className={classes.cardFeature}>
                            uLt. aborto
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>
                          <Typography>Ninguno</Typography>
                        </Grid>
                      </Grid>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} lg={12}>
                  {/* Servicios y palpacion*/}
                  <Paper
                    style={{ height: "96%" }}
                    elevation={4}
                    className={classes.card}
                  >
                    <div className={classes.cardHeader}>
                      <Typography variant="body1" className={classes.cardTitle}>
                        Servicios y palpación
                      </Typography>
                      <IconButton
                        className={classes.cardEditIcon}
                        size="small"
                        onClick={() => {
                          setOpen(true);
                          setDialog("ServiceData");
                        }}
                      >
                        <Edit fontSize="small"></Edit>
                      </IconButton>
                    </div>
                    <Divider className={classes.divider}></Divider>
                    <Grid container className="">
                      <Grid item xs={6}>
                        <Grid
                          container
                          className={classes.generalFeature}
                          xs={12}
                        >
                          <Grid item xs={5}>
                            <Typography className={classes.cardFeature}>
                              Fecha de pesaje
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography>2</Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className={classes.generalFeature}
                          xs={12}
                        >
                          <Grid item xs={5}>
                            <Typography className={classes.cardFeature}>
                              Peso
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography>23 de Junio del 2018</Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className={classes.generalFeature}
                          xs={12}
                        >
                          <Grid item xs={5}>
                            <Typography className={classes.cardFeature}>
                              Gr./Día
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography>Lorem Ipsum</Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className={classes.generalFeature}
                          xs={12}
                        >
                          <Grid item xs={5}>
                            <Typography className={classes.cardFeature}>
                              C. Corp
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography>Lorem Ipsum</Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          className={classes.generalFeature}
                          xs={12}
                        >
                          <Grid item xs={5}>
                            <Typography className={classes.cardFeature}>
                              Alzada
                            </Typography>
                          </Grid>
                          <Grid item xs={7}>
                            <Typography>Lorem Ipsum</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={{
                            chart: {
                              type: "scatter",
                              margin: [70, 50, 60, 80],
                              events: {
                                click: function (e) {
                                  // find the clicked values and the series
                                  var x = Math.round(e.xAxis[0].value),
                                    y = Math.round(e.yAxis[0].value),
                                    series = this.series[0];

                                  // Add it
                                  series.addPoint([x, y]);
                                },
                              },
                            },
                            title: {
                              text: "",
                            },

                            accessibility: {
                              announceNewData: {
                                enabled: true,
                              },
                            },
                            xAxis: {
                              gridLineWidth: 1,
                              minPadding: 0.2,
                              maxPadding: 0.2,
                              maxZoom: 20,
                            },
                            yAxis: {
                              title: {
                                text: "Value",
                              },
                              minPadding: 0.2,
                              maxPadding: 0.2,
                              maxZoom: 20,
                              plotLines: [
                                {
                                  value: 0,
                                  width: 1,
                                  color: "#808080",
                                },
                              ],
                            },
                            legend: {
                              enabled: false,
                            },
                            exporting: {
                              enabled: false,
                            },
                            plotOptions: {
                              series: {
                                lineWidth: 1,
                                point: {
                                  events: {
                                    click: function () {
                                      if (this.series.data.length > 1) {
                                        this.remove();
                                      }
                                    },
                                  },
                                },
                              },
                            },
                            series: [
                              {
                                data: [
                                  [20, 20],
                                  [105, 40],
                                ],
                              },
                            ],
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={12}>
            <Grid item xs={12} lg={4}>
              {/*Ubicacion de corral*/}
              <Paper elevation={4} className={classes.card}>
                <div className={classes.cardHeader}>
                  <Typography variant="body1" className={classes.cardTitle}>
                    Ubicación de corral
                  </Typography>
                  <IconButton
                    className={classes.cardEditIcon}
                    size="small"
                    onClick={() => {
                      setOpen(true);
                      setDialog("OtherData");
                    }}
                  >
                    <Edit fontSize="small"></Edit>
                  </IconButton>
                </div>
                <Divider className={classes.divider}></Divider>
                <div className="">
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={6}>
                      <Typography className={classes.cardFeature}>
                        Potrero
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Lorem Ipsum</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={6}>
                      <Typography className={classes.cardFeature}>
                        Grupo
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Lorem Ipsum</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={6}>
                      <Typography className={classes.cardFeature}>
                        Lote
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Lorem Ipsum</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={6}>
                      <Typography className={classes.cardFeature}>
                        Descornado
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Checkbox
                        size="small"
                        defaultChecked
                        color="primary"
                        className={classes.checkboxSmall}
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={6}>
                      <Typography className={classes.cardFeature}>
                        Herrado
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Checkbox
                        size="small"
                        defaultChecked
                        color="primary"
                        className={classes.checkboxSmall}
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={6}>
                      <Typography className={classes.cardFeature}>
                        Pologia
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Checkbox
                        size="small"
                        defaultChecked
                        color="primary"
                        className={classes.checkboxSmall}
                        inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={4}>
              {/* Produccion lechera */}
              <Paper
                style={{ height: "94%" }}
                elevation={4}
                className={classes.card}
              >
                <div className={classes.cardHeader}>
                  <Typography variant="body1" className={classes.cardTitle}>
                    Producción Lechera
                  </Typography>
                  <IconButton
                    className={classes.cardEditIcon}
                    size="small"
                    onClick={() => {
                      setOpen(true);
                      setDialog("MilkData");
                    }}
                  >
                    <Edit fontSize="small"></Edit>
                  </IconButton>
                </div>
                <Divider className={classes.divider}></Divider>
                <div className="">
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={5}>
                      <Typography className={classes.cardFeature}>
                        Total leche
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography>2</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={5}>
                      <Typography className={classes.cardFeature}>
                        Controles Lácteos
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography>23 de Junio del 2018</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={5}>
                      <Typography className={classes.cardFeature}>
                        Dias de lactancía
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography>675</Typography>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={4}>
              {/* Pesos */}
              <Paper
                style={{ height: "94%" }}
                elevation={4}
                className={classes.card}
              >
                <div className={classes.cardHeader}>
                  <Typography variant="body1" className={classes.cardTitle}>
                    Pesos
                  </Typography>
                  <IconButton
                    className={classes.cardEditIcon}
                    size="small"
                    onClick={() => {
                      setOpen(true);
                      setDialog("WeighingData");
                    }}
                  >
                    <Edit fontSize="small"></Edit>
                  </IconButton>
                </div>
                <Divider className={classes.divider}></Divider>
                <div className="">
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={5}>
                      <Typography className={classes.cardFeature}>
                        Fecha de pesaje
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography>2</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={5}>
                      <Typography className={classes.cardFeature}>
                        Peso
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography>23 de Junio del 2018</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={5}>
                      <Typography className={classes.cardFeature}>
                        Gr./Día
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography>Lorem Ipsum</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={5}>
                      <Typography className={classes.cardFeature}>
                        C. Corp
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography>Lorem Ipsum</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={5}>
                      <Typography className={classes.cardFeature}>
                        Alzada
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography>Lorem Ipsum</Typography>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Grid container>
            <Grid item xs={12}>
              {/* Calendario*/}
              <Paper
                style={{ height: "96%" }}
                elevation={4}
                className={classes.card}
              >
                <div className={classes.cardHeader}>
                  <Typography variant="body1" className={classes.cardTitle}>
                    Calendario
                  </Typography>
                  <IconButton
                    className={classes.cardEditIcon}
                    size="small"
                    onClick={() => {
                      setOpen(true);
                      setDialog("CalendarData");
                    }}
                  >
                    <Edit fontSize="small"></Edit>
                  </IconButton>
                </div>
                <Divider className={classes.divider}></Divider>

                <div>
                  <Typography
                    className={classes.calendarTitle}
                    variant="subtitle1"
                  >
                    4 de sep del 2020
                  </Typography>
                  <Calendar value={new Date()}></Calendar>
                  <Typography className={classes.generalFeature}>
                    Vacunación
                  </Typography>
                  <Typography className={classes.generalFeature}>
                    Lorem Ipsum dole mer ammnet, consequertum
                  </Typography>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              {/* Linea de tiempo */}
              <Paper
                style={{ height: "96%" }}
                elevation={4}
                className={classes.card}
              >
                <div className={classes.cardHeader}>
                  <Typography variant="body1" className={classes.cardTitle}>
                    Linea de tiempo
                  </Typography>{" "}
                </div>
                <Divider className={classes.divider}></Divider>
                <Typography variant="body1" className={classes.cardTitle}>
                  This Week
                </Typography>
                <div style={{ position: "relative", left: "-40%" }}>
                  <Timeline>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>02 hours ago</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>21 hours ago</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                      </TimelineSeparator>
                      <TimelineContent>22 hours ago</TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </div>
                <Typography variant="body1" className={classes.cardTitle}>
                  Last Week
                </Typography>
                <div style={{ position: "relative", left: "-40%" }}>
                  <Timeline>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>02 hours ago</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>21 hours ago</TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={Boolean(open)}
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        maxWidth="md"
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close className={classes.closeBtn} onClick={() => setOpen(false)} />
        {/* {dialog === "CalendarData" && <CalendarData />}
        {dialog === "BirthData" && <BirthData />}
        {dialog === "CommentaryData" && <CommentaryData />}
        {dialog === "GeneralData" && <GeneralData />}
        {dialog === "MilkData" && <MilkData />}
        {dialog === "OtherData" && <OtherData />}
        {dialog === "RaceData" && <RaceData />}
        {dialog === "ServiceData" && <ServiceData />}
        {dialog === "WeighingData" && <WeighingData />}
        {dialog === "QRData" && <QRData />} */}
      </Dialog>
    </Grid>
  );
}
