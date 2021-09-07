import React, { useState } from "react";
import {
  Chip,
  Grid,
  Typography,
  Dialog,
  IconButton,
  Paper,
  Divider,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import FormCollaborator from "./Forms/FormCollaborator";
import { Close, Edit, Add, Delete } from "@material-ui/icons";
import { menuList, columnsTable } from "./constants";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";
import QRCode from "qrcode.react";
import CustomMuiTable from "../../components/CustomMuiTable";

function Management() {
  const [cow] = useState({
    imageSrc:
      "https://autocerrajeros.com/wp-content/uploads/2019/05/home-1110868_960_720.png",
  });
  const classes = useStyles();
  const history = useHistory();
  const { location = {} } = history;
  const [activeTab] = useState("inicio");
  const [searchText] = useState();
  const [open, setOpen] = useState(0);
  const [section, setSection] = useState(0);
  // const dispatch = useDispatch();
  const { current: currentFarm } = useSelector((state) => state.farm);
  const { list: listAgribusiness } = useSelector((state) => state.agribusiness);
  const options = {
    selectableRows: "none",
    searchText,
    search: false,
  };

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
                setOpen(true);
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="delete"
              onClick={() => {
                setOpen(true);
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
      <Typography variant={"h6"}>Establo Name</Typography>
      <Grid container spacing={2} className={classes.optionContainer}>
        {menuList.submenu.map((menu, index) => (
          <Grid item key={`option-${menu.id}`}>
            <Chip
              label={menu.title}
              onClick={() => {
                history.push(`${location.pathname}#${menu.id}`);
                setOpen(menu.open);
                setSection(menu.id);
              }}
              className={clsx(
                classes.option,
                activeTab === menu.id && classes.active,
                activeTab !== menu.id && classes.inactive
              )}
            />
          </Grid>
        ))}
      </Grid>
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
                  setOpen(true);
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
                      setOpen(true);
                    }}
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
                  <QRCode
                    renderAs="svg"
                    value={window.location.href}
                    className={classes.qrImage}
                    includeMargin={true}
                    onClick={() => {
                      setOpen(true);
                    }}
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
                <Grid item xs={4}>
                  <Typography className={classes.cardFeature}>
                    Criador
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    {/* {currentFarm && currentFarm.nit} */}
                  </Typography>
                </Grid>
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
                  setOpen(true);
                  setSection("Collaborator");
                }}
              >
                <Add fontSize="small"></Add>
              </IconButton>
            </div>
            <Divider></Divider>
            <br />
            <div className="">
              <CustomMuiTable
                data={[]}
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
                      setOpen(true);
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
                          setOpen(true);
                        }}
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
                      <QRCode
                        renderAs="svg"
                        value={window.location.href}
                        className={classes.qrImage}
                        includeMargin={true}
                        onClick={() => {
                          setOpen(true);
                        }}
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
                    <Grid item xs={4}>
                      <Typography className={classes.cardFeature}>
                        Criador
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>
                        {/* {currentFarm && currentFarm.nit} */}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog
        open={Boolean(open)}
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        maxWidth={section === "3" ? "sm" : "md"}
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close
          className={classes.closeBtn}
          onClick={() => {
            setOpen(false);
          }}
        />
        {section === "Collaborator" && <FormCollaborator setOpen={setOpen} />}
      </Dialog>
    </Grid>
  );
}

export default Management;
