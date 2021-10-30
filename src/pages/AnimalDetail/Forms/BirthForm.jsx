import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";

/**
 * @component
 * @description Componente, formulario de los datos de parto del animal
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const BirthForm = ({
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
            Partos
          </Typography>
          <Grid container spacing={1}>
            <TextFieldFormik
              label="Nro. de partos"
              name="nroBirth"
              onChange={props.handleChange}
              xs={12}
              sm={6}
            />
            <TextFieldFormik
              label="Crias"
              name="crias"
              onChange={props.handleChange}
              xs={12}
              sm={6}
            />
            <DatePickerFieldFormik
              label="Último parto"
              name="lastparto"
              onChange={props.handleChange}
              xs={12}
              sm={3}
            />
            <TextFieldFormik
              label="I.E.P.T"
              name="iept"
              onChange={props.handleChange}
              xs={12}
              sm={3}
            />
            <TextFieldFormik
              label="I.E.P.u"
              name="iepu"
              onChange={props.handleChange}
              xs={12}
              sm={3}
            />
            <DatePickerFieldFormik
              label="Último aborto"
              name="herdDate"
              onChange={props.handleChange}
              xs={12}
              sm={3}
            />
            <TextFieldFormik
              label="I.E.P.T"
              name="iept"
              onChange={props.handleChange}
              multiline={true}
              rows={3}
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

export default BirthForm;
