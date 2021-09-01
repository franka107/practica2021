import { Typography } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import clsx from "clsx";
import QRCode from "qrcode.react";
import { getAge, formatDate } from "../../helpers/convertDate";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useStyles } from "../AnimalControlPage/AnimalDescription/styles";
import { Paper } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Familytree from "../../components/FamilyTree";
import { ROUTES_DICT } from "../../routes/routesDict";
import { BorderLinearProgress } from "../../components/BorderLinearProgress";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { animalActions } from "../../redux/actions/animal.actions";

export default function PedigreePage() {
  const classes = useStyles();
  const history = useHistory();
  const [dialog, setDialog] = useState();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
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

  const [cow] = useState({
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Cow_female_black_white.jpg/782px-Cow_female_black_white.jpg",
  });
  const chartOptions = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
      },
    },
    title: {
      text: undefined,
    },

    plotOptions: {
      pie: {
        innerSize: 200,
        depth: 45,
      },
    },
    series: [
      {
        name: "Delivered amount",
        data: [
          ["10%", 8],
          ["20%", 12],
          ["16%", 3],
        ],
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <Grid container xs={12}>
      <Typography variant={"h6"}>Control Ganadero</Typography>
      <Grid container spacing={2} className={classes.optionContainer}>
        <Grid item>
          <Chip
            className={clsx(classes.option)}
            onClick={() => {
              history.push(ROUTES_DICT.animalControl);
            }}
            label="Inicio"
          ></Chip>
        </Grid>
        <Grid item>
          <Chip
            className={clsx(classes.option)}
            label="Información General"
            onClick={() => {
              history.push(ROUTES_DICT.animalDetail + `/${params.animalId}`);
            }}
          ></Chip>
        </Grid>
        <Grid item>
          <Chip
            className={clsx(classes.option, classes.active)}
            onClick={() => {
              history.push(ROUTES_DICT.pedigree);
            }}
            label="Pedigree"
          ></Chip>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
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
                className={clsx(classes.textCenter, classes.cowCodeTitle)}
              >
                {currentAnimal && currentAnimal.identifier}
              </Typography>
              <Grid container className={classes.generalFeature} xs={12}>
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>
                    Nombre
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{currentAnimal && currentAnimal.name}</Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.generalFeature} xs={12}>
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>Sexo</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    {currentAnimal && currentAnimal.gender === "FEMALE"
                      ? "Hembra"
                      : "Macho"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.generalFeature} xs={12}>
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>Edad</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    {currentAnimal &&
                      getAge(new Date(currentAnimal.birthDate), new Date())}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.generalFeature} xs={12}>
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
                <Typography variant="body1" className={classes.cardTitle}>
                  Nacimiento
                </Typography>
              </div>
              <Divider className={classes.divider}></Divider>
              <Grid container className={classes.generalFeature} xs={12}>
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>Fecha</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    {currentAnimal &&
                      formatDate(new Date(currentAnimal.birthDate))}
                    {/* {animals && animals.birthDate} */}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.generalFeature} xs={12}>
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
              <Grid container className={classes.generalFeature} xs={12}>
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
          <Paper elevation={4} className={classes.card}>
            <div className={classes.cardHeader}>
              <Typography variant="body1" className={classes.cardTitle}>
                Porcentaje Pedigree
              </Typography>
            </div>
            <Divider></Divider>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Paper
            elevation={4}
            className={classes.card}
            style={{ minHeight: "100%" }}
          >
            <div className={classes.cardHeader}>
              <Typography variant="body1" className={classes.cardTitle}>
                Cuadro genealógico
              </Typography>
            </div>
            <Divider></Divider>
            <Familytree />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
