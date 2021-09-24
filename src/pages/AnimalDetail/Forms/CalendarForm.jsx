import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "../styles";
import { IconButton, Button } from "@material-ui/core";
import { Edit, Close, Brush, Flag } from "@material-ui/icons";
import clsx from "clsx";
import Calendar from "react-calendar";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import { Formik } from "formik";
import * as yup from "yup";

/**
 * @component
 * @description Componente, formulario de los datos del calendario
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const CalendarForm = ({
  initValues,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const classes = useStyles();
  const [newItem, setNewItem] = useState(true);
  const [ediItem, setEdiItem] = useState(false);
  const [saveItem, setSavetem] = useState(false);
  useEffect(() => {
    // moment.locale("es");
  }, []);
  const handleSubmit = (values, actions) => {};

  const validationSchema = yup.object({});

  return (
    <Grid className={classes.modal}>
      <Typography variant={"subtitle1"} gutterBottom>
        Calendario
      </Typography>
      <Grid container justify={"center"}>
        <Grid item>
          <Calendar value={new Date()}></Calendar>
        </Grid>
      </Grid>
      <Typography variant={"subtitle1"} gutterBottom>
        {/* {moment(new Date()).format("Do MMM YYYY")} */}
      </Typography>
      {ediItem === true && (
        <Grid item>
          <Formik
            initialValues={{}}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Grid container className={classes.containerIcons}>
                  <Grid item>
                    <IconButton
                      className={clsx(
                        classes.cardIcon,
                        classes.cardIconSelected
                      )}
                      size="small"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.cardIcon} size="small">
                      <Close fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.cardIcon} size="small">
                      <Brush fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.cardIcon} size="small">
                      <Flag fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.cardIcon} size="small">
                      <Flag fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.cardIcon} size="small">
                      <Flag fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.cardIcon} size="small">
                      <Flag fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Typography variant={"subtitle1"} gutterBottom>
                  <Edit fontSize="small" className={classes.icon}></Edit>
                  Vacunas
                </Typography>
                <Grid container spacing={1}>
                  <TextFieldFormik
                    label="Nomnre de lugar"
                    name="identifier"
                    onChange={props.handleChange}
                    xs={12}
                    sm={4}
                  />
                  <TextFieldFormik
                    label="Vacuna"
                    name="name"
                    onChange={props.handleChange}
                    xs={12}
                    sm={4}
                  />
                  <TextFieldFormik
                    label="Veterinario"
                    name="name"
                    onChange={props.handleChange}
                    xs={12}
                    sm={4}
                  />
                </Grid>
              </form>
            )}
          </Formik>
          <Grid
            item
            container
            justify={"flex-end"}
            className={classes.buttons}
            spacing={3}
          >
            <Grid item sm={3} xs={12} className={classes.prevBtnContainer}>
              <Button className={classes.prevBtn}>Cancelar</Button>
            </Grid>
            <Grid item sm={3} xs={12}>
              <Button
                className={classes.nextBtn}
                onClick={() => {
                  setEdiItem(false);
                  setNewItem(true);
                  setSavetem(true);
                  setTimeout(() => {
                    setSavetem(false);
                  }, 3000);
                }}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      {newItem === true && (
        <Grid item>
          {saveItem === true && (
            <Typography variant={"body2"} gutterBottom>
              <Edit fontSize="small" className={classes.icon}></Edit>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Typography>
          )}
          <Grid item container xs={12} justify={"center"}>
            <Grid item xs={12} sm={3}>
              <Button
                className={classes.nextBtn}
                onClick={() => {
                  setEdiItem(true);
                  setNewItem(false);
                }}
              >
                Añadir nota
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default CalendarForm;
