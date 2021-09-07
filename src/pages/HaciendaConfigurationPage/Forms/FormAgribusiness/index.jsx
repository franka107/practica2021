import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { useStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../components/Inputs/ButtonFormik";

function FormAgribusiness() {
  const classes = useStyles();

  const [initValues] = useState({});

  const handleSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = yup.object({});

  return (
    <div className={classes.modal}>
      <Typography variant={"subtitle1"} gutterBottom>
        Hacienda o Empresa
      </Typography>
      <Formik
        initialValues={initValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={1}>
              <TextFieldFormik
                label="Detalles"
                name="motiveDetail"
                type="text"
                multiline
                rows={3}
                onChange={props.handleChange}
                xs={12}
              ></TextFieldFormik>
            </Grid>
            <Grid item container justifyContent={"flex-end"} xs={12}>
              <Grid item xs={4} className={classes.paddingButton}>
                <ButtonFormik xs={4} label="Cancelar" type="cancel" />
              </Grid>
              <Grid item xs={4}>
                <ButtonFormik xs={4} label="Confirmar" type="submit" />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default FormAgribusiness;
