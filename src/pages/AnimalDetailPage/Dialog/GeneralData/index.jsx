import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { aditionalForm, generalForm, statusForm } from "./constants";
import { useStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";
import { categoryOptions, sexOptions } from "../../../../constants";

function GeneralData({ setOpen, setAnimalsList, agribusinessId }) {
  const classes = useStyles();
  const [sections] = useState([
    {
      title: "",
      form: generalForm(),
    },
  ]);

  const [secondSection] = useState([
    {
      title: "",
      form: statusForm(),
    },
    {
      title: "",
      form: aditionalForm(),
    },
  ]);

  const initialValues = {};
  const handleSubmit = () => {};
  const validationSchema = yup.object({});

  return (
    <Grid className={classes.modal}>
      <Formik
        initialValues={initialValues}
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
                name="name"
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
              <SelectFieldFormik
                label="Categoría"
                name="category"
                onChange={props.handleChange}
                options={categoryOptions}
                xs={6}
              />
            </Grid>
          </form>
        )}
      </Formik>

      {/* 
      <CustomForm sections={sections} showButton={false}></CustomForm>
      <Typography variant={"subtitle1"} gutterBottom>
        Status
      </Typography>
      <CustomForm sections={secondSection} handlePrev={true}></CustomForm>
      */}
    </Grid>
  );
}

export default GeneralData;
