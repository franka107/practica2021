import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";

/**
 * @component
 * @description Componente, formulario de los datos relacionados a la produccion lechera del animal
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const MilkForm = ({
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

export default MilkForm;
