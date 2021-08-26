import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import CheckboxFormik from "../../../../components/Inputs/CheckboxFormik";
import { useDispatch, useSelector } from "react-redux";
import { animalActions } from "../../../../redux/actions/animal.actions";
import {
  categoryOptions,
  sexOptions,
  stateOptions,
} from "../../../../constants";

function GeneralData({ setOpen }) {
  const classes = useStyles();
  const { current: currentAnimal } = useSelector((state) => state.animal);
  const handleSubmit = (values) => {
    console.log(values);
  };
  const validationSchema = yup.object({});

  return (
    <Grid className={classes.modal}>
      <Formik
        initialValues={currentAnimal}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Typography variant={"subtitle1"} gutterBottom>
              Datos generales
            </Typography>
            <Grid container spacing={1}>
              <TextFieldFormik
                label="Identificación del animal"
                name="identifier"
                onChange={props.handleChange}
              />
              <TextFieldFormik
                label="Nombre"
                name="name"
                onChange={props.handleChange}
              />
            </Grid>
            <Grid container spacing={1} xs={12}>
              <Grid item>
                <Typography
                  style={{ marginTop: "1rem" }}
                  variant={"subtitle1"}
                  gutterBottom
                >
                  Estado
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <DatePickerFieldFormik
                label="Fecha de nacimiento"
                name="birthDate"
                onChange={props.handleChange}
                xs={6}
              />
              <DatePickerFieldFormik
                label="Entrada hato"
                name="herdDate"
                onChange={props.handleChange}
                xs={6}
              />
              <TextFieldFormik
                label="Número de registro"
                name="registerNumber"
                onChange={props.handleChange}
                xs={6}
              />
            </Grid>

            <Grid container spacing={1}>
              <SelectFieldFormik
                label="Sexo"
                name="gender"
                onChange={props.handleChange}
                options={sexOptions}
                xs={6}
              />
              {props.values.gender === "MALE" ? (
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
                    label="Categoria"
                    name="isReproductive"
                    options={categoryOptions}
                    onChange={props.handleChange}
                    checked={props.values.isReproductive}
                  ></CheckboxFormik>
                </Grid>
              ) : (
                <SelectFieldFormik
                  onChange={props.handleChange}
                  options={stateOptions}
                  label="Estado"
                  name="reproductiveStatus"
                  lg={6}
                  sm={6}
                  xs={12}
                ></SelectFieldFormik>
              )}
            </Grid>
            <Grid item container justifyContent={"flex-end"} xs={12}>
              <Grid item xs={3} className={classes.paddingButton}>
                <ButtonFormik xs={3} label="Cancelar" type="cancel" />
              </Grid>
              <Grid item xs={3}>
                <ButtonFormik
                  xs={3}
                  label="Guardar"
                  type="submit"
                  onClick={handleSubmit}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
}

export default GeneralData;
