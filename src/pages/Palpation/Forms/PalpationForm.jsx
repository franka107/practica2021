import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import AutocompleteFieldFormik from "../../../components/Inputs/AutocompleteFieldFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import { stateOptions } from "../../../constants";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AnimalActions from "../../../redux/actions/animal.actions";
import PalpationActions from "../../../redux/actions/palpation.actions";
import CustomInfoIcon from "../../../components/CustomInfoIcon";
import CollaboratorActions from "../../../redux/actions/collaborator.actions";
import { useParams } from "react-router";

const defaultInitValues = {
  animalId: "",
  touchDate: new Date(),
  state: "",
  pregnancyDate: new Date(),
  userId: "",
  observation: "",
};

const PalpationForm = ({
  initValues = defaultInitValues,
  type = "create",
  hideAnimal = false,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const params = useParams();
  const stateTitle =
    'Una vez que se declare el estado del animal como "Preñada" o "Vacía" ya no estará disponible en este módulo hasta que se realize un nuevo servicio del animal.';
  const animalTitle =
    "Los animales listados en este módulo tienen que registrar un servicio previo relacionado.";
  const dispatch = useDispatch();
  const femaleAnimals = useSelector(
    (state) =>
      state.animal.list.filter(
        (e) => e.gender === "FEMALE" && e.isServed === true
        // e.ageInMonths > agribusiness!.isHeifer!
      ),
    shallowEqual
  );
  const listCollaborator = useSelector((state) => state.collaborator.list);

  useEffect(() => {
    if (!listCollaborator || listCollaborator.length === 0) {
      dispatch(CollaboratorActions.list());
    }
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
      .required("Este campo es requerido.")
      .nullable(),
    touchDate: yup
      .date("Ingresa una fecha correcta.")
      .max(new Date(), "No puedes poner una fecha futura")
      .nullable(),
    pregnancyDate: yup
      .date("Ingresa una fecha correcta.")
      .max(new Date(), "No puedes poner una fecha futura")
      .nullable(),
    state: yup.string().required("Este campo es requerido"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      if (hideAnimal) {
        values.animalId = params._id;
      }
      if (type === "create") {
        const animal = femaleAnimals.find((e) => e._id === values.animalId);
        const user = listCollaborator.find((e) => e._id === values.userId);
        await dispatch(PalpationActions.create(values, animal, user));
      }
      if (type === "update") {
        await dispatch(PalpationActions.update(values));
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
              {type === "create" ? "Agregar Palpacion" : "Editar Palpacion"}
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            {!hideAnimal && (
              <>
                <Grid item container xs={12}>
                  <AutocompleteFieldFormik
                    options={femaleAnimals}
                    name="animalId"
                    label="Identificación del animal"
                    onChange={props.handleChange}
                    defaultValue={
                      type === "create" ? null : props.values.animal
                    }
                    xs={11}
                  />
                  <CustomInfoIcon title={animalTitle} />
                </Grid>
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
              label="Fecha de tacto"
              name="touchDate"
              onChange={props.handleChange}
              xs={12}
            />
            <Grid item container xs={12}>
              <SelectFieldFormik
                onChange={props.handleChange}
                options={Object.keys(stateOptions).map((key) => ({
                  _id: key,
                  name: stateOptions[key],
                }))}
                label="Estado"
                disabled={type === "create" ? false : true}
                name="state"
                xs={11}
              />
              <CustomInfoIcon title={stateTitle} />
            </Grid>
            {/* {stateOptions[props.values.state] === stateOptions.PREGNANT && (
              <DatePickerFieldFormik
                label="Fecha preñez"
                name="pregnancyDate"
                onChange={props.handleChange}
                xs={12}
              />
            )} */}
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              name="userId"
              label="Responsable"
              options={listCollaborator}
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

export default PalpationForm;
