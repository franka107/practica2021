import React from "react";
import { Grid, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import AutocompleteFieldFormik from "../../../components/Inputs/AutocompleteFieldFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";

const defaultInitValues = {
  animalId: "",
  touchDate: "",
  state: "",
  pregnancyDate: "",
  responsable: "",
};

const PalpationForm = ({
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
              {type === "create" ? "Agregar Palpacion" : "Editar Palpacion"}
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
            <TextFieldFormik
              label="Nombre"
              name="name"
              disabled
              onChange={props.handleChange}
              xs={12}
            />
            <DatePickerFieldFormik
              label="Fecha de tacto"
              name="touchDate"
              onChange={props.handleChange}
              xs={12}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              options={[]}
              label="Estado"
              name="state"
              xs={12}
            />
            <DatePickerFieldFormik
              label="Fecha preñez"
              name="pregnancyDate"
              onChange={props.handleChange}
              xs={12}
            />
            <AutocompleteFieldFormik
              options={[]}
              name="responsable"
              label="Responsable"
              onChange={props.handleChange}
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

export default PalpationForm;
