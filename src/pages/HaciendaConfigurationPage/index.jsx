import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Paper,
  Divider,
} from "@material-ui/core";
import {
  useHistory,
  generatePath,
  useParams,
  useLocation,
} from "react-router-dom";
import clsx from "clsx";
import {
  Edit,
  Add,
  Delete,
  Camera,
  Photo,
  CameraAlt,
} from "@material-ui/icons";
import { columnsTable, haciendaRouteOptions } from "./constants";
import { useStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "qrcode.react";
import CustomMuiTable from "../../components/CustomMuiTable";
import { ROUTES_DICT } from "../../routes/routesDict";
import CollaboratorActions from "../../redux/actions/collaborator.actions";

const HaciendaConfigurationPage = ({ children, setTitle, setChipList }) => {
  const [cow] = useState({
    imageSrc:
      "https://autocerrajeros.com/wp-content/uploads/2019/05/home-1110868_960_720.png",
  });
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchText] = useState();
  const currentUser = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch();
  const currentFarm = useSelector((state) => state.farm.current);
  const listCollaborator = useSelector((state) => state.collaborator.list);
  const listAgribusiness = useSelector((state) => state.agribusiness.list);
  const options = {
    selectableRows: "none",
    searchText,
    search: false,
  };

  useEffect(() => {
    setTitle("Configuración de Hacienda");
    setChipList(haciendaRouteOptions(location));
    if (!listCollaborator || listCollaborator.length === 0) {
      dispatch(CollaboratorActions.list());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actionColumn = {
    label: "Acciones",
    name: "actions",
    options: {
      searchable: false,
      filter: false,
      sort: false,
      customBodyRenderLite: (dataIndex, rowIndex) => {
        return (
          <>
            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="edit"
              onClick={() => {
                history.push(
                  generatePath(ROUTES_DICT.hacienda.collaborator.update, {
                    ...params,
                    _id: listCollaborator[dataIndex]._id,
                  })
                );
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="delete"
              onClick={() => {
                history.push(
                  generatePath(ROUTES_DICT.hacienda.collaborator.delete, {
                    ...params,
                    _id: listCollaborator[dataIndex]._id,
                  })
                );
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </>
        );
      },
    },
  };

  return (
    <Grid item container xs={12}>
      <Grid item container xs={12}>
        <Grid item xs={12} lg={4}>
          <Paper elevation={4} className={classes.card}>
            <div className={classes.cardHeader}>
              <Typography variant="body1" className={classes.cardTitle}>
                Informacion Hacienda
              </Typography>
              <IconButton
                className={classes.cardEditIcon}
                size="small"
                onClick={() => {
                  history.push(
                    generatePath(ROUTES_DICT.hacienda.farm.update, {
                      ...params,
                      _id: currentUser._id,
                    })
                  );
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
                    onClick={() => {
                      history.push(
                        generatePath(ROUTES_DICT.hacienda.farm.image.upload, {
                          ...params,
                          _id: currentUser._id,
                        })
                      );
                    }}
                    size="small"
                  >
                    <CameraAlt fontSize="small"></CameraAlt>
                  </IconButton>
                </div>
                <img
                  src={
                    currentFarm && currentFarm.imageUrl
                      ? currentFarm.imageUrl
                      : cow.imageSrc
                  }
                  className={classes.cowImage}
                  alt=""
                  srcset=""
                />
                <div className={clsx(classes.cowImageQrButton)}>
                  <QRCode
                    renderAs="svg"
                    value={window.location.href}
                    className={classes.qrImage}
                    includeMargin={true}
                    onClick={() => {}}
                  />
                </div>
              </div>
              <Typography
                variant="h4"
                className={clsx(classes.textCenter, classes.cowCodeTitle)}
              >
                {currentFarm && currentFarm.name}
              </Typography>
              <Grid container className={classes.generalFeature} xs={12}>
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>
                    Dirección
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{currentFarm && currentFarm.address}</Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.generalFeature} xs={12}>
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>
                    Propietario
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{currentFarm && currentFarm.landLord}</Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.generalFeature} xs={12}>
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>
                    Teléfono
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    {currentFarm && currentFarm.phoneNumber}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.generalFeature} xs={12}>
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>Nit</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{currentFarm && currentFarm.nit}</Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.generalFeature} xs={12}>
                {/* 
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>
                    Criador
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    {/* {currentFarm && currentFarm.nit} 
                  </Typography>
                </Grid>
                */}
              </Grid>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Paper elevation={4} className={classes.card}>
            <div className={classes.cardHeader}>
              <Typography variant="body1" className={classes.cardTitle}>
                Colaboradores
              </Typography>
              <IconButton
                className={classes.cardEditIcon}
                size="small"
                onClick={() => {
                  history.push(ROUTES_DICT.hacienda.collaborator.create);
                }}
              >
                <Add fontSize="small"></Add>
              </IconButton>
            </div>
            <Divider></Divider>
            <br />
            <div className="">
              <CustomMuiTable
                data={listCollaborator}
                columns={[...columnsTable, actionColumn]}
                options={options}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper elevation={4} className={classes.card}>
            <div className={classes.cardHeader}>
              <Typography variant="body1" className={classes.cardTitle}>
                Existencias
              </Typography>
            </div>
            <Divider></Divider>
            <div className="">
              <br />
              <Grid container className={classes.generalFeature} xs={12}>
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>
                    Machos
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{currentFarm && currentFarm.address}</Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.generalFeature} xs={12}>
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>
                    Hembras
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{currentFarm && currentFarm.address}</Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.generalFeature} xs={12}>
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>U.G.G</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{currentFarm && currentFarm.address}</Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.generalFeature} xs={12}>
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>
                    Fecha U.G.G
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{currentFarm && currentFarm.address}</Typography>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid item container xs={12} style={{ padding: "1rem 0 1rem 0" }}>
        <Typography variant="h6">Agronegocios</Typography>
      </Grid>
      {listAgribusiness && (
        <Grid item container xs={12}>
          {listAgribusiness.map((agribusiness, index) => (
            <Grid item xs={12} lg={4} key={`id${index}`}>
              <Paper elevation={4} className={classes.card}>
                <div className={classes.cardHeader}>
                  <Typography variant="body1" className={classes.cardTitle}>
                    Informacion Agronegocio
                  </Typography>
                  <IconButton
                    className={classes.cardEditIcon}
                    size="small"
                    onClick={() => {
                      history.push(
                        generatePath(ROUTES_DICT.hacienda.agribusiness.update, {
                          ...params,
                          _id: agribusiness._id,
                        })
                      );
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
                        onClick={() => {
                          history.push(
                            generatePath(
                              ROUTES_DICT.hacienda.agribusiness.image.upload,
                              {
                                ...params,
                                _id: agribusiness._id,
                              }
                            )
                          );
                        }}
                        size="small"
                      >
                        <CameraAlt fontSize="small"></CameraAlt>
                      </IconButton>
                    </div>
                    <img
                      src={
                        agribusiness && agribusiness.imageUrl
                          ? agribusiness.imageUrl
                          : cow.imageSrc
                      }
                      className={classes.cowImage}
                      alt=""
                      srcset=""
                    />
                    <div className={clsx(classes.cowImageQrButton)}>
                      <QRCode
                        renderAs="svg"
                        value={window.location.href}
                        className={classes.qrImage}
                        includeMargin={true}
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                  <Typography
                    variant="h4"
                    className={clsx(classes.textCenter, classes.cowCodeTitle)}
                  >
                    {agribusiness.name}
                  </Typography>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={4}>
                      <Typography className={classes.cardFeature}>
                        Dirección
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{agribusiness.address}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={4}>
                      <Typography className={classes.cardFeature}>
                        Propietario
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {currentFarm && currentFarm.landLord}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={4}>
                      <Typography className={classes.cardFeature}>
                        Teléfono
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{agribusiness.phoneNumber}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    <Grid item xs={4}>
                      <Typography className={classes.cardFeature}>
                        Nit
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{currentFarm && currentFarm.nit}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.generalFeature} xs={12}>
                    {/*

                    <Grid item xs={4}>
                      <Typography className={classes.cardFeature}>
                        Criador
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                      </Typography>
                    </Grid>
                    */}
                  </Grid>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      {children()}
    </Grid>
  );
};

export default HaciendaConfigurationPage;
