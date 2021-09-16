import React from "react";
import { Grid, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";

const defaultInitValues = {
  date: "",
  iec: "",
  observation: "",
};
function WeightForm({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) {
  const validationSchema = yup.object({});

  const handleSubmit = (values, actions) => {};

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={1}>
            <Typography variant={"subtitle1"} gutterBottom>
              {type === "create" ? "Agregar Pesaje" : "Editar Pesaje"}
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            <DatePickerFieldFormik
              label="Fecha"
              name="date"
              onChange={props.handleChange}
              xs={12}
            ></DatePickerFieldFormik>
            <SelectFieldFormik
              label="Tipo de Control"
              name="controlType"
              onChange={props.handleChange}
              xs={12}
            ></SelectFieldFormik>
            <TextFieldFormik
              label="Peso"
              name="weight"
              onChange={props.handleChange}
              xs={12}
            ></TextFieldFormik>
            <SelectFieldFormik
              label="Responsable"
              name="responsable"
              onChange={props.handleChange}
              xs={12}
            ></SelectFieldFormik>
          </Grid>
          <Grid item container xs={12} justifyContent="space-between">
            <Grid item xs={5}>
              <ButtonFormik xs={12} label="Cancelar" type="cancel" />
            </Grid>
            <Grid item xs={5}>
              <ButtonFormik xs={12} label="Siguiente" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

export default WeightForm;
