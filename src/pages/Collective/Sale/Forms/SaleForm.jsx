import React from "react";
import { Grid, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import AutocompleteFieldFormik from "../../../../components/Inputs/AutocompleteFieldFormik";

const defaultInitValues = {
  animalId: "",
  date: "",
  iec: "",
  observation: "",
};

const SaleForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const validationSchema = yup.object({});

  const handleSubmit = (values, actions) => {
    console.log(values);
  };

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
              {type === "create" ? "Agregar Venta" : "Editar Venta"}
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            <AutocompleteFieldFormik
              options={[]}
              name="animalId"
              label="Identificacíon del animal"
              onChange={props.handleChange}
              xs={12}
            />
            <DatePickerFieldFormik
              label="Fecha"
              name="date"
              onChange={props.handleChange}
              xs={12}
            />
            <TextFieldFormik
              label="Peso"
              name="weight"
              onChange={props.handleChange}
              xs={12}
            />
            <TextFieldFormik
              label="Valor por Lb./Kg"
              name="valueWeight"
              onChange={props.handleChange}
              xs={12}
            />
            <TextFieldFormik
              label="Obervaciones"
              name="observation"
              onChange={props.handleChange}
              multiline
              rows={4}
              xs={12}
            />
          </Grid>
          <Grid item container xs={12} justifyContent="space-between">
            <Grid item xs={5}>
              <ButtonFormik
                xs={12}
                label="Cancelar"
                type="cancel"
                onClick={onClickCancelButton}
              />
            </Grid>
            <Grid item xs={5}>
              <ButtonFormik xs={12} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default SaleForm;
