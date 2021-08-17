import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { useStyles } from "./styles";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../../../components/Inputs/SelectFieldFormik";
import CheckboxFormik from "../../../../../components/Inputs/CheckboxFormik";
import TimerPicker from "../../../../../components/Inputs/TimePickerFormik";

const propTypes = {};

function AddTransfer() {
  const classes = useStyles();
  const categoryOptions = [{ id: "1", name: "Retuvo placenta" }];

  const validationSchema = yup.object({});
  const initValues = {
    identifier: "",
    name: "",
    date: "",
    hour: "",
    cod: "",
    embryoName: "",
    embryoType: "",
    condition: "",
    stadium: "",
    quantity: "",
    quality: "",
    embryoSex: "",
    rightOvary: "",
    leftOvary: "",
    inseminator: "",
    commentary: "",
  };
  const handleSubmit = (values, actions) => {
    console.log(values);
  };

  return (
    <Grid className={classes.modal}>
      <Typography variant={"subtitle1"} gutterBottom>
        Registrar servicio
      </Typography>
      <Divider />
      <Formik
        initialValues={initValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className={classes.formStyle}>
            <Grid container spacing={1} className={classes.formStyle}>
              <Grid item>
                <Typography variant={"subtitle2"}>
                  Información de servicio
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <TextFieldFormik
                label="Identificación de hembra"
                name="identifier"
                onChange={props.handleChange}
                lg={6}
                sm={6}
                xs={12}
              ></TextFieldFormik>
              <TextFieldFormik
                label="Nombre"
                name="name"
                onChange={props.handleChange}
                lg={6}
                sm={6}
                xs={12}
              ></TextFieldFormik>
              <DatePickerFieldFormik
                label="Fecha"
                name="date"
                onChange={props.handleChange}
                lg={6}
                sm={6}
                xs={12}
              ></DatePickerFieldFormik>
              <TimerPicker
                label="Hora"
                name="hour"
                onChange={props.handleChange}
                lg={6}
                sm={6}
                xs={12}
              ></TimerPicker>
            </Grid>
            <Grid container spacing={1} className={classes.formStyle}>
              <Grid item>
                <Typography variant={"subtitle2"}>Embrión</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <SelectFieldFormik
                onChange={props.handleChange}
                label="Cód."
                name="cod"
                lg={3}
                sm={3}
                xs={12}
              ></SelectFieldFormik>
              <TextFieldFormik
                label="Nombre Embrión"
                name="embryoName"
                onChange={props.handleChange}
                lg={3}
                sm={3}
                xs={12}
                disabled
              ></TextFieldFormik>
              <SelectFieldFormik
                onChange={props.handleChange}
                label="Tipo de embrión"
                name="embryoType"
                lg={3}
                sm={3}
                xs={12}
              ></SelectFieldFormik>
              <SelectFieldFormik
                onChange={props.handleChange}
                label="Condición"
                name="condition"
                lg={3}
                sm={3}
                xs={12}
              ></SelectFieldFormik>
              <SelectFieldFormik
                onChange={props.handleChange}
                label="Estadio"
                name="stadium"
                lg={4}
                sm={4}
                xs={12}
              ></SelectFieldFormik>
              <SelectFieldFormik
                onChange={props.handleChange}
                label="Calidad"
                name="quality"
                lg={2}
                sm={2}
                xs={12}
              ></SelectFieldFormik>
              <SelectFieldFormik
                onChange={props.handleChange}
                label="Cantidad"
                name="quantity"
                lg={2}
                sm={2}
                xs={12}
              ></SelectFieldFormik>
              <SelectFieldFormik
                onChange={props.handleChange}
                label="Sexo embrión"
                name="embryoSex"
                lg={4}
                sm={4}
                xs={12}
              ></SelectFieldFormik>
            </Grid>
            <Grid container spacing={1} className={classes.formStyle}>
              <Grid item>
                <Typography variant={"subtitle2"}>
                  Hallazgo en ovarios
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <TextFieldFormik
                label="Ovario derecho"
                name="rightOvary"
                onChange={props.handleChange}
                lg={4}
                sm={4}
                xs={12}
              ></TextFieldFormik>
              <TextFieldFormik
                label="Ovario izquierdo"
                name="leftOvary"
                onChange={props.handleChange}
                lg={4}
                sm={4}
                xs={12}
              ></TextFieldFormik>
              <SelectFieldFormik
                onChange={props.handleChange}
                label="Estado"
                name="state"
                lg={4}
                sm={4}
                xs={12}
              ></SelectFieldFormik>
              <TextFieldFormik
                label="Inseminador"
                name="inseminator"
                onChange={props.handleChange}
                multiline
                rows={2}
                xs={12}
              ></TextFieldFormik>
            </Grid>
            <Grid item container justifyContent={"flex-end"} xs={12}>
              <Grid item xs={3} className={classes.paddingButton}>
                <ButtonFormik xs={3} label="Cancelar" type="cancel" />
              </Grid>
              <Grid item xs={3}>
                <ButtonFormik xs={3} label="Siguiente" type="submit" />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
}

AddTransfer.propTypes = propTypes;

export default AddTransfer;
