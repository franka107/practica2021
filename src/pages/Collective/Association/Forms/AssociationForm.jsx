import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import AutocompleteFieldFormik from "../../../../components/Inputs/AutocompleteFieldFormik";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AnimalActions from "../../../../redux/actions/animal.actions";
import AssociationActions from "../../../../redux/actions/association.actions";

/**
 * @component
 * @description Componente, formulario para crear o editar registros de asociaciones
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const defaultInitValues = {
  animalId: "",
  name: "",
  registerNumber: "",
  controlDate: new Date(),
  breeder: "",
  owner: "",
  observation: "",
};

const AssociationForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const femaleAnimals = useSelector(
    (state) => state.animal.list.filter((e) => e.gender === "FEMALE"),
    shallowEqual
  );

  useEffect(() => {
    if (!femaleAnimals || femaleAnimals.length === 0) {
      dispatch(AnimalActions.list());
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
        await dispatch(AssociationActions.create(values, animal));
      }
      if (type === "update") {
        await dispatch(AssociationActions.update(values));
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
                ? "Agregar registro de asociación"
                : "Editar registro de asociación"}
            </Typography>
          </Grid>
          <Grid container spacing={1}>
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
                  ? femaleAnimals.find((e) => e._id === props.values.animalId)
                      ?.name
                  : ""
              }
            />
            <TextFieldFormik
              label="Nro. registro"
              name="registerNumber"
              onChange={props.handleChange}
              xs={12}
            />
            <DatePickerFieldFormik
              label="Fecha"
              name="controlDate"
              onChange={props.handleChange}
              xs={12}
            />
            <TextFieldFormik
              label="Criador"
              name="breeder"
              onChange={props.handleChange}
              xs={12}
            />
            <TextFieldFormik
              label="Propietario"
              name="owner"
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

export default AssociationForm;
