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

function AddMN() {
  const classes = useStyles();
  const categoryOptions = [{ id: "1", name: "I.A.T.F" }];

  const validationSchema = yup.object({});
  const initValues = {
    identifier: "",
    name: "",
    date: "",
    hour: "",
    typeService: "",
    semen: "",
    inseminator: "",
    nroStraws: "",
    handjobSex: "",
    iatf: "",
    observation: "",
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
                  Información de Servicio
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
              <SelectFieldFormik
                onChange={props.handleChange}
                label="Tipo de servicio"
                name="typeService"
                lg={6}
                sm={6}
                xs={12}
              ></SelectFieldFormik>
              <SelectFieldFormik
                onChange={props.handleChange}
                label="Reproductor/semen"
                name="semen"
                lg={6}
                sm={6}
                xs={12}
              ></SelectFieldFormik>
              <SelectFieldFormik
                onChange={props.handleChange}
                label="Inseminador"
                name="inseminator"
                lg={6}
                sm={6}
                xs={12}
              ></SelectFieldFormik>
              <SelectFieldFormik
                onChange={props.handleChange}
                label="Nro. pajillas"
                name="nroStraws"
                lg={6}
                sm={6}
                xs={12}
              ></SelectFieldFormik>
              <SelectFieldFormik
                onChange={props.handleChange}
                label="Sexo pajilla"
                name="handjobSex"
                lg={6}
                sm={6}
                xs={12}
              ></SelectFieldFormik>
              <Grid
                lg={6}
                sm={6}
                xs={12}
                container
                justifyContent="center"
                alignContent="center"
                alignItems="center"
              >
                <CheckboxFormik
                  name="iatf"
                  options={categoryOptions}
                  onChange={props.handleChange}
                ></CheckboxFormik>
              </Grid>
              <TextFieldFormik
                label="Observaciones"
                name="observation"
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

AddMN.propTypes = propTypes;

export default AddMN;
