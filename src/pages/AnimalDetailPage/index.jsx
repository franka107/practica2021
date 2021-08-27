import { Paper } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Close, Edit } from "@material-ui/icons";
import clsx from "clsx";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import { BorderLinearProgress } from "../../components/BorderLinearProgress";
import { useStyles } from "./styles";
import Highcharts from "highcharts";
import GeneralData from "./Dialog/GeneralData";
import RaceData from "./Dialog/RaceData";
import BirthData from "./Dialog/BirthData";
import ServiceData from "./Dialog/ServiceData";
import OtherData from "./Dialog/OtherData";
import MilkData from "./Dialog/MilkData";
import WeighingData from "./Dialog/WeighingData";
import CalendarData from "./Dialog/Calendar";
// import CommentaryData from "./Dialog/CommentaryData";
import Calendar from "react-calendar";
import { Dialog } from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import QRData from "./Dialog/QRData";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { animalActions } from "../../redux/actions/animal.actions";
import { getAge, formatDate } from "../../helpers/convertDate";
import ChipsSection from "./ChipsSection";
import QRCode from "qrcode.react";
import "react-calendar/dist/Calendar.css";

export default function AnimalDetailPage() {
  const classes = useStyles();
  const [dialog, setDialog] = useState("");
  const [open, setOpen] = useState(false);
  const [cow] = useState({
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cow_female_black_white.jpg/782px-Cow_female_black_white.jpg",
  });
  const dispatch = useDispatch();
  const params = useParams();
  const { current: currentAnimal } = useSelector((state) => state.animal);
  const { current: currentAgribusiness } = useSelector(
    (state) => state.agribusiness
  );

  useEffect(() => {
    if (currentAgribusiness) {
      dispatch(animalActions.listAll(currentAgribusiness._id));
    }
    if (!currentAnimal) {
      dispatch(animalActions.listById({ _id: params.animalId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, currentAnimal]);

  return (
    <Grid container xs={12}>
      {currentAnimal && (
        <Grid>
          <Grid item container xs={12}>
            <Typography variant="h6">Control Ganadero</Typography>
            <ChipsSection />
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
                          {/* <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/1200px-Codigo_QR.svg.png"
                            alt=""
                            className={classes.qrImage}
                            onClick={() => {
                              setOpen(true);
                              setDialog("QRData");
                            }}
                          /> */}
                          <QRCode
                            renderAs="svg"
                            value={window.location.href}
                            className={classes.qrImage}
                            includeMargin={true}
                          />
                        </div>
                      </div>
                      <Typography
                        variant="h4"
                        className={clsx(
                          classes.textCenter,
                          classes.cowCodeTitle
                        )}
                      >
                        {currentAnimal && currentAnimal.identifier}
                      </Typography>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Nombre
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal && currentAnimal.name}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Sexo
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal && currentAnimal.gender === "FEMALE"
                              ? "Hembra"
                              : "Macho"}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Edad
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal &&
                              getAge(
                                new Date(currentAnimal.birthDate),
                                new Date()
                              )}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            {currentAnimal && currentAnimal.gender === "FEMALE"
                              ? "Estado"
                              : "Categoria"}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal &&
                              currentAnimal.gender === "FEMALE" &&
                              currentAnimal.reproductiveStatus}
                            {currentAnimal &&
                            currentAnimal.gender === "MALE" &&
                            currentAnimal.isReproductive
                              ? "REPRODUCTOR"
                              : "NO REPRODUCTOR"}
                          </Typography>
                          {/* <Typography>Vaca seca, 276 dias de preñez</Typography> */}
                        </Grid>
                      </Grid>
                      <div className={classes.borderLinearProgress}>
                        {currentAnimal && currentAnimal.gender === "FEMALE" && (
                          <BorderLinearProgress
                            variant="determinate"
                            value="50"
                            about="asd"
                          ></BorderLinearProgress>
                        )}
                      </div>
                      <div className={classes.cardHeader}>
                        <Typography
                          variant="body1"
                          className={classes.cardTitle}
                        >
                          Nacimiento
                        </Typography>
                      </div>
                      <Divider className={classes.divider}></Divider>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Fecha
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal &&
                              formatDate(new Date(currentAnimal.birthDate))}
                            {/* {animals && animals.birthDate} */}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Entrada hato
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal &&
                              formatDate(new Date(currentAnimal.herdDate))}
                            {/* {animals && animals.herdDate} */}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={4}>
                          <Typography className={classes.cardFeature}>
                            Nro. Registro
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>
                            {currentAnimal && currentAnimal.registerNumber}
                          </Typography>
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
                          <Typography
                            variant="body1"
                            className={classes.cardTitle}
                          >
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
                              <Typography>
                                {currentAnimal && currentAnimal.father
                                  ? currentAnimal.father.identifier
                                  : "No especificado"}
                              </Typography>
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
                              <Typography>
                                {currentAnimal && currentAnimal.mother
                                  ? currentAnimal.mother.identifier
                                  : "No especificado"}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            className={classes.generalFeature}
                            xs={12}
                          >
                            <Grid item xs={5}>
                              <Typography className={classes.cardFeature}>
                                Raza{" "}
                                {currentAnimal &&
                                currentAnimal.percentageRace1 !== 100
                                  ? "1"
                                  : ""}
                              </Typography>
                            </Grid>
                            <Grid item xs={7}>
                              {currentAnimal && (
                                <Typography>
                                  {currentAnimal &&
                                    currentAnimal.race1 &&
                                    currentAnimal.race1.name}{" "}
                                  -{" "}
                                  {currentAnimal &&
                                    currentAnimal.percentageRace1 &&
                                    currentAnimal.percentageRace1}
                                  %
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                          {currentAnimal &&
                          currentAnimal.percentageRace1 !== 100 ? (
                            <Grid
                              container
                              className={classes.generalFeature}
                              xs={12}
                            >
                              <Grid item xs={5}>
                                <Typography className={classes.cardFeature}>
                                  Raza 2
                                </Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography>
                                  {currentAnimal &&
                                    currentAnimal.race2 &&
                                    currentAnimal.race2.name}{" "}
                                  -{" "}
                                  {currentAnimal &&
                                    currentAnimal.percentageRace2 &&
                                    currentAnimal.percentageRace2}
                                  %
                                </Typography>
                              </Grid>
                            </Grid>
                          ) : (
                            <div></div>
                          )}
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
                              <Typography>
                                {currentAnimal && currentAnimal.color !== ""
                                  ? currentAnimal.color
                                  : "No especificado"}
                              </Typography>
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
                          <Typography
                            variant="body1"
                            className={classes.cardTitle}
                          >
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
                              <Typography>
                                {currentAnimal &&
                                  currentAnimal.childBirthNumber}
                              </Typography>
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
                              <Typography>
                                {currentAnimal &&
                                  formatDate(
                                    new Date(currentAnimal.lastChildBirthDate)
                                  )}
                              </Typography>
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
                              <Typography>No especificado</Typography>
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
                              <Typography>No especificado</Typography>
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
                          <Typography
                            variant="body1"
                            className={classes.cardTitle}
                          >
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
                                  Peso
                                </Typography>
                              </Grid>
                              <Grid item xs={7}>
                                <Typography>
                                  {currentAnimal && currentAnimal.lastWeight}
                                </Typography>
                              </Grid>
                            </Grid>
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
                                <Typography>
                                  {currentAnimal &&
                                    formatDate(
                                      new Date(currentAnimal.lastWeightDate)
                                    )}
                                </Typography>
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
                                <Typography>No especificado</Typography>
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
                                <Typography>No especificado</Typography>
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
                                <Typography>No especificado</Typography>
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
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={6}>
                          <Typography className={classes.cardFeature}>
                            Potrero
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>No especificado</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={6}>
                          <Typography className={classes.cardFeature}>
                            Grupo
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>No especificado</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={6}>
                          <Typography className={classes.cardFeature}>
                            Lote
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>No especificado</Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
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
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
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
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
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
                      <Grid
                        container
                        className={classes.generalFeature}
                        xs={12}
                      >
                        <Grid item xs={5}>
                          <Typography className={classes.cardFeature}>
                            Total leche
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
                            Controles Lácteos
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
                          <Typography>
                            {currentAnimal && currentAnimal.lastWeight}
                          </Typography>
                        </Grid>
                      </Grid>
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
                          <Typography>
                            {currentAnimal &&
                              formatDate(
                                new Date(currentAnimal.lastWeightDate)
                              )}
                          </Typography>
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
                          <Typography>No especificado</Typography>
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
                          <Typography>No especificado</Typography>
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
                          <Typography>No especificado</Typography>
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
                    <div>
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
                    {/* <div style={{ position: "relative", left: "-40%" }}> */}
                    <div>
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
            maxWidth="sm"
            aria-describedby="alert-dialog-description"
            classes={{ paperFullWidth: classes.modal }}
          >
            <Close
              className={classes.closeBtn}
              onClick={() => setOpen(false)}
            />
            {dialog === "GeneralData" && <GeneralData setOpen={setOpen} />}
            {dialog === "RaceData" && <RaceData setOpen={setOpen} />}
            {dialog === "BirthData" && <BirthData />}
            {dialog === "ServiceData" && <ServiceData />}
            {dialog === "OtherData" && <OtherData />}
            {dialog === "MilkData" && <MilkData />}
            {dialog === "WeighingData" && <WeighingData />}
            {dialog === "CalendarData" && <CalendarData />}
            {/*
        {dialog === "CommentaryData" && <CommentaryData />}
        */}
            {dialog === "QRData" && <QRData />}
          </Dialog>
        </Grid>
      )}
    </Grid>
  );
}
