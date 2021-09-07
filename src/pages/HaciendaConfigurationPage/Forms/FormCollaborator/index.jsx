import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { useStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";

function FormCollaborator() {
  const classes = useStyles();

  const [initValues] = useState({});

  const handleSubmit = (values) => {
    console.log(values);
    // dispatch(animalActions.deleteElement(values)).then(
    //   (data) => {
    //     history.push(ROUTES_DICT.animalControl);
    //   },
    //   (error) => {}
    // );
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
                label="Nombres"
                name="motiveDetail"
                type="text"
                onChange={props.handleChange}
                xs={12}
                sm={6}
              ></TextFieldFormik>
              <TextFieldFormik
                label="Apellidos"
                name="motiveDetail"
                type="text"
                onChange={props.handleChange}
                xs={12}
                sm={6}
              ></TextFieldFormik>
              <SelectFieldFormik
                label="Cargo"
                name="motive"
                onChange={props.handleChange}
                options={[]}
                xs={6}
              />
              <DatePickerFieldFormik
                label="Fecha de ingreso"
                name="activeUpdatedOn"
                onChange={props.handleChange}
                xs={6}
              />
            </Grid>
            <Grid item container justifyContent={"flex-end"} xs={12}>
              <Grid item xs={4}>
                <ButtonFormik xs={4} label="Guardar" type="submit" />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default FormCollaborator;
