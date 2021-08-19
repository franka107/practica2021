import React, { useState } from "react";
import { Chip, Grid, Typography, Dialog, Divider } from "@material-ui/core";
import clsx from "clsx";
import { Close } from "@material-ui/icons";
import { useStyles } from "./styles";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";

function WeightHeader() {
  const classes = useStyles();
  const [open, setOpen] = useState(0);
  const validationSchema = yup.object({});
  const initValues = {
    date: "",
    iec: "",
    observation: "",
  };
  const handleSubmit = (values, actions) => {};

  return (
    <Grid item container xs={12}>
      <Typography variant={"h6"}>Colectiva / Peso</Typography>
      <Grid container spacing={2} className={classes.optionContainer}>
        <Grid item>
          <Chip
            label={"Agregar ingreso peso"}
            onClick={() => {
              setOpen(true);
            }}
            className={clsx(classes.option)}
          />
        </Grid>
      </Grid>
      <Dialog
        open={Boolean(open)}
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        maxWidth="xs"
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close className={classes.closeBtn} onClick={() => setOpen(false)} />
        <Grid className={classes.modal}>
          <Typography variant={"subtitle1"} gutterBottom>
            Agregar pesaje
          </Typography>
          <Divider />
          <Formik
            initialValues={initValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit} className={classes.formStyle}>
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
        </Grid>
      </Dialog>
    </Grid>
  );
}

export default WeightHeader;
