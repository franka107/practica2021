import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import MultipleCheckboxFormik from "../../../components/Inputs/MultipleCheckboxFormik";
import CheckboxFormik from "../../../components/Inputs/CheckboxFormik";

/**
 * @component
 * @description Componente, formulario de los datos extra del animal
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const OtherForm = ({
  initValues,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  const validationSchema = yup.object({});
  //const categoryOptions = [
  //  { id: "1", name: "Descornado" },
  //  { id: "2", name: "Herrado" },
  //  { id: "3", name: "Podología" },
  //];

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Typography variant={"subtitle1"} gutterBottom>
            Otros
          </Typography>
          <Grid container spacing={1}>
            <DatePickerFieldFormik
              label="Potrero"
              name="lastparto"
              onChange={props.handleChange}
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              label="Grupo"
              name="crias"
              onChange={props.handleChange}
              xs={12}
              sm={4}
            />
            <DatePickerFieldFormik
              label="Lote"
              name="lastparto"
              onChange={props.handleChange}
              xs={12}
              sm={4}
            />
            <Grid
              sm={4}
              xs={12}
              item
              container
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <CheckboxFormik
                name="isReproductive"
                label="Descornado"
                options={{ _id: "1", name: "Descornado" }}
                onChange={props.handleChange}
                checked={true}
              ></CheckboxFormik>
            </Grid>
            <Grid
              sm={4}
              xs={12}
              item
              container
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <CheckboxFormik
                label="Herrado"
                name="isReproductive"
                options={{ id: "2", name: "Herrado" }}
                onChange={props.handleChange}
                checked={false}
              ></CheckboxFormik>
            </Grid>
            <Grid
              sm={4}
              xs={12}
              container
              item
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <CheckboxFormik
                label="Podología"
                name="isReproductive"
                options={{ id: "3", name: "Podología" }}
                onChange={props.handleChange}
                checked={false}
              ></CheckboxFormik>
            </Grid>
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

export default OtherForm;
