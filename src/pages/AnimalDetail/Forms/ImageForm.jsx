import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { useStyles } from "./ImageData/styles";
import { Formik } from "formik";
import * as yup from "yup";
// import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";

function ImageData({ setOpen }) {
  const classes = useStyles();
  const handleSubmit = (values, actions) => {};

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
              Imagen
            </Typography>
            <Grid container spacing={1}>
              <Button variant="contained" component="label">
                Cargar Imagen
                <input type="file" hidden />
              </Button>
              {/* <TextFieldFormik
                label="Identificación del animal"
                name="identifier"
                onChange={props.handleChange}
              />
              <TextFieldFormik
                label="Nombre"
                name="name"
                onChange={props.handleChange}
              /> */}
            </Grid>

            <Grid item container justifyContent={"flex-end"} xs={12}>
              <Grid item xs={3} className={classes.paddingButton}>
                <ButtonFormik xs={3} label="Cancelar" type="cancel" />
              </Grid>
              <Grid item xs={3}>
                <ButtonFormik xs={3} label="Guardar" type="submit" />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
}

export default ImageData;
