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

function OtherData({ setOpen }) {
  const classes = useStyles();
  const handleSubmit = (values) => {
    console.log(values);
  };
  const validationSchema = yup.object({});
  return (
    <Grid className={classes.modal}>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Typography variant={"subtitle1"} gutterBottom>
              Partos
            </Typography>
            <Grid container spacing={1}>
              <TextFieldFormik
                label="Total leche"
                name="crias"
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
              <TextFieldFormik
                label="Controles lácteos"
                name="crias"
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
              <TextFieldFormik
                label="Días de lactancia"
                name="crias"
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
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

export default OtherData;
