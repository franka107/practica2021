import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";

const ServiceForm = ({
  initValues,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  const validationSchema = yup.object({});

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Typography variant={"subtitle1"} gutterBottom>
            Servicios y palpación
          </Typography>
          <Grid container spacing={1}>
            <DatePickerFieldFormik
              label="Último celo"
              name="lastCelo"
              onChange={props.handleChange}
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              label="I.E.C"
              name="iec"
              onChange={props.handleChange}
              xs={12}
              sm={4}
            />
            <DatePickerFieldFormik
              label="Última palpación"
              name="lastCelo"
              onChange={props.handleChange}
              xs={12}
              sm={4}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              options={[]}
              label="Estado"
              name="state"
              xs={12}
            />
            <TextFieldFormik
              label="Observación"
              name="observation"
              onChange={props.handleChange}
              multiline
              rows={4}
              xs={12}
            />
            <DatePickerFieldFormik
              label="Último celo"
              name="lastCelo"
              onChange={props.handleChange}
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              label="Dias preñez"
              name="iec"
              onChange={props.handleChange}
              xs={12}
              sm={4}
            />
            <DatePickerFieldFormik
              label="Parto esperadp"
              name="lastCelo"
              onChange={props.handleChange}
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              label="Comentario"
              name="observation"
              onChange={props.handleChange}
              multiline
              rows={4}
              xs={12}
            />
          </Grid>
          <Grid item container justifyContent="space-between" xs={12}>
            <Grid item xs={5}>
              <ButtonFormik
                xs={3}
                label="Cancelar"
                type="cancel"
                onClick={onClickCancelButton}
              />
            </Grid>
            <Grid item xs={5}>
              <ButtonFormik xs={3} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default ServiceForm;
