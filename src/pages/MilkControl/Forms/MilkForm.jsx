import React, { useEffect } from "react";
import { Grid, InputAdornment, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import AutocompleteFieldFormik from "../../../components/Inputs/AutocompleteFieldFormik";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AnimalActions from "../../../redux/actions/animal.actions";
import MilkActions from "../../../redux/actions/milkControl.actions";
import { useParams } from "react-router";

const defaultInitValues = {
  animalId: "",
  name: "",
  controlDate: new Date(),
  firstSample: 0,
  secondSample: 0,
  thirdSample: 0,
  observation: "",
};

const MilkForm = ({
  initValues = defaultInitValues,
  type = "create",
  hideAnimal = false,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const femaleAnimals = useSelector(
    (state) => state.animal.list.filter((e) => e.gender === "FEMALE"),
    shallowEqual
  );

  useEffect(() => {
    if (!femaleAnimals || femaleAnimals.length === 0) {
      dispatch(AnimalActions.list());
    }
    if (hideAnimal) {
      initValues.animalId = params._id;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = yup.object({
    animalId: yup
      .string("Ingresa la identificacion del animal.")
      .required("Este campo es requerido."),
    controlDate: yup
      .date("Ingresa una fecha correcta.")
      .max(new Date(), "No puedes poner una fecha futura")
      .nullable(),
  });

  const handleSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        const animal = femaleAnimals.find((e) => e._id === values.animalId);
        await dispatch(MilkActions.create(values, animal));
      }
      if (type === "update") {
        await dispatch(MilkActions.update(values));
      }
      if (hideAnimal) {
        await dispatch(AnimalActions.get({ _id: params._id }));
      }
      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
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
              {type === "create"
                ? "Agregar control lechero"
                : "Editar control lechero"}
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            {!hideAnimal && (
              <>
                <AutocompleteFieldFormik
                  options={femaleAnimals}
                  name="animalId"
                  label="Identificacíon del animal"
                  onChange={props.handleChange}
                  defaultValue={type === "create" ? null : props.values.animal}
                  xs={12}
                />
                <TextFieldFormik
                  label="Nombre"
                  name="name"
                  disabled
                  onChange={props.handleChange}
                  xs={12}
                  value={
                    props.values.animalId
                      ? femaleAnimals.find(
                          (e) => e._id === props.values.animalId
                        )?.name
                      : ""
                  }
                />
              </>
            )}
            <DatePickerFieldFormik
              label="Fecha"
              name="controlDate"
              onChange={props.handleChange}
              xs={12}
            />
            <TextFieldFormik
              label="Muestra A.M"
              name="firstSample"
              onChange={props.handleChange}
              endAdornment={
                <InputAdornment position="start">Kg</InputAdornment>
              }
              type="number"
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              label="Muestra P.M"
              name="secondSample"
              onChange={props.handleChange}
              endAdornment={
                <InputAdornment position="start">Kg</InputAdornment>
              }
              type="number"
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              label="3ra Muestra"
              name="thirdSample"
              type="number"
              onChange={props.handleChange}
              endAdornment={
                <InputAdornment position="start">Kg</InputAdornment>
              }
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              label="Observaciones"
              name="observation"
              multiline
              rows={3}
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

export default MilkForm;
