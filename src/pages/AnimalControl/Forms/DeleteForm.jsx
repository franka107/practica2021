import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import { deleteOptions } from "../../../constants";
import AnimalActions from "../../../redux/actions/animal.actions";

const DeleteForm = ({ onClickCancelButton, idDelete }) => {
  const dispatch = useDispatch();

  const [initValues] = useState({
    motive: "",
    activeUpdatedOn: new Date(),
    motiveDetail: "",
  });

  const handleSubmit = (values) => {
    values._id = idDelete;
    dispatch(AnimalActions.deleteAnimal(values));
    onClickCancelButton();
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
          <Grid container>
            <Typography variant={"subtitle1"} gutterBottom>
              Eliminar Registro
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            <SelectFieldFormik
              label="Motivo"
              name="motive"
              onChange={props.handleChange}
              options={deleteOptions}
              xs={6}
            />
            <DatePickerFieldFormik
              label="Fecha"
              name="activeUpdatedOn"
              onChange={props.handleChange}
              xs={6}
            />
            <TextFieldFormik
              label="Detalles"
              name="motiveDetail"
              type="text"
              multiline
              rows={3}
              onChange={props.handleChange}
              xs={12}
            ></TextFieldFormik>
          </Grid>
          <Grid item container justifyContent={"flex-end"} xs={12}>
            <Grid item xs={4} style={{ paddingRight: "1rem" }}>
              <ButtonFormik xs={4} label="Cancelar" type="cancel" />
            </Grid>
            <Grid item xs={4}>
              <ButtonFormik xs={4} label="Confirmar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};
export default DeleteForm;
