import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";

/**
 * @component
 * @description Componente, formulario de los datos de peso del animal
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const WeightForm = ({
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
            Pesaje
          </Typography>
          <Grid container spacing={1}>
            <DatePickerFieldFormik
              label="Último pesaje"
              name="lastparto"
              onChange={props.handleChange}
              xs={12}
              sm={3}
            />
            <TextFieldFormik
              label="Peso"
              name="nroBirth"
              onChange={props.handleChange}
              xs={12}
              sm={3}
            />
            <DatePickerFieldFormik
              label="Gr./Día"
              name="lastparto"
              onChange={props.handleChange}
              xs={12}
              sm={3}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              options={[]}
              label="C.Corp"
              name="state"
              sm={3}
              xs={12}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              options={[]}
              label="Estado"
              name="state"
              sm={6}
              xs={12}
            />
            <TextFieldFormik
              label="Alzada"
              name="nroBirth"
              onChange={props.handleChange}
              xs={12}
              sm={6}
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

export default WeightForm;
