import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../../../components/Inputs/TextFieldFormik";
import SelectFieldFormik from "../../../../../components/Inputs/SelectFieldFormik";
import DatePickerFieldFormik from "../../../../../components/Inputs/DatePickerFieldFormik";
import ButtonFormik from "../../../../../components/Inputs/ButtonFormik";
import MultipleCheckboxFormik from "../../../../../components/Inputs/MultipleCheckboxFormik";
import { useDispatch, useSelector } from "react-redux";

const propTypes = {};

function FormMove({ setOpen }) {
  const classes = useStyles();

  const validationSchema = yup.object({});

  const handleSubmit = (values, actions) => {};

  return (
    <Grid className={classes.modal}>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant={"subtitle1"}>Nuevo movimiento</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1} className={classes.formStyle}>
              <SelectFieldFormik
                name="move"
                label="Movimiento"
                options={[]}
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
              <DatePickerFieldFormik
                label="Fecha"
                name="activeUpdatedOn"
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
            </Grid>
            <Grid container spacing={1} className={classes.formStyle}>
              <TextFieldFormik
                label="Cantidad"
                name="quantity"
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
              <TextFieldFormik
                label="Valor unidad"
                name="unitValue"
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
              <TextFieldFormik
                label="Cta. compra semen"
                name="buySemen"
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
              <TextFieldFormik
                label="Descripcion"
                name="description"
                multiline
                onChange={props.handleChange}
                xs={12}
                sm={8}
              />
              <TextFieldFormik
                label="A quien"
                name="forWho"
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
                <ButtonFormik xs={3} label="Guardar" type="submit" />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
}

FormMove.propTypes = propTypes;

export default FormMove;
