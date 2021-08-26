import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import CheckboxFormik from "../../../../components/Inputs/CheckboxFormik";

function OtherData({ setOpen }) {
  const classes = useStyles();
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
    <Grid className={classes.modal}>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Typography variant={"subtitle1"} gutterBottom>
              Partos
            </Typography>
            <Grid container spacing={1}>
              <DatePickerFieldFormik
                label="Último parto"
                name="lastparto"
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
              <TextFieldFormik
                label="Crias"
                name="crias"
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
              <DatePickerFieldFormik
                label="Último parto"
                name="lastparto"
                onChange={props.handleChange}
                xs={12}
                sm={4}
              />
              <Grid
                sm={4}
                xs={12}
                container
                justifyContent="center"
                alignContent="center"
                alignItems="center"
              >
                <CheckboxFormik
                  name="isReproductive"
                  options={[{ id: "1", name: "Descornado" }]}
                  onChange={props.handleChange}
                  checked={true}
                ></CheckboxFormik>
              </Grid>
              <Grid
                sm={4}
                xs={12}
                container
                justifyContent="center"
                alignContent="center"
                alignItems="center"
              >
                <CheckboxFormik
                  name="isReproductive"
                  options={[{ id: "2", name: "Herrado" }]}
                  onChange={props.handleChange}
                  checked={false}
                ></CheckboxFormik>
              </Grid>
              <Grid
                sm={4}
                xs={12}
                container
                justifyContent="center"
                alignContent="center"
                alignItems="center"
              >
                <CheckboxFormik
                  name="isReproductive"
                  options={[{ id: "3", name: "Podología" }]}
                  onChange={props.handleChange}
                  checked={false}
                ></CheckboxFormik>
              </Grid>
            </Grid>
            <Grid item container justifyContent={"flex-end"} xs={12}>
              <Grid item xs={3} className={classes.paddingButton}>
                <ButtonFormik xs={3} label="Cancelar" type="cancel" />
              </Grid>
              <Grid item xs={3}>
                <ButtonFormik
                  xs={3}
                  label="Guardar"
                  type="submit"
                  onClick={handleSubmit}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
}

export default OtherData;
