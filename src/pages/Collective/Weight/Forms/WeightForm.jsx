import React, { useEffect } from "react";
import { Grid, InputAdornment, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";
import AutocompleteFieldFormik from "../../../../components/Inputs/AutocompleteFieldFormik";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AnimalActions from "../../../../redux/actions/animal.actions";
import WeightActions from "../../../../redux/actions/weight.actions";
import { controlTypeOptions } from "../../../../constants";
import CollaboratorActions from "../../../../redux/actions/collaborator.actions";
import { useParams } from "react-router";
import { format } from "date-fns";
import CustomInfoIcon from "../../../../components/CustomInfoIcon";
import CustomModal, { customModal } from "../../../../components/Modal";

const defaultInitValues = {
  animalId: "",
  controlDate: new Date(),
  controlType: "",
  weight: "",
  userId: "",
  observation: "",
};

const validationSchema = (animalList) =>
  yup.lazy((values) =>
    yup.object({
      animalId: yup
        .string()
        .typeError("Este campo es requerido")
        .required("Este campo es requerido."),
      userId: yup
        .string()
        .typeError("Este campo es requerido")
        .required("Este campo es requerido."),
      controlType: yup
        .string()
        .typeError("Este campo es requerido")
        .required("Este campo es requerido"),
      controlDate: yup
        .date()
        .typeError("Este campo es requerido.")
        .max(new Date(), "No puedes ingresar una fecha futura")
        .when("animalId", {
          is: (value) => animalList.some((e) => e._id === value),
          then: (rule) =>
            rule.min(
              format(
                new Date(
                  animalList.find((e) => e._id === values.animalId).herdDate
                ),
                "yyyy-MM-dd"
              ),
              "La fecha de control peso debe ser mayor a la fecha de entrada de hato."
            ),
        }),
      weight: yup
        .number()
        .typeError("Este campo es requerido.")
        .min(1, "Ingrese un valor mayor a 1")
        .required("Este campo es requerido."),
    })
  );

/**
 * @component
 * @description Componente, formulario para crear o editar datos de pesos de animales
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

function WeightForm({
  initValues = defaultInitValues,
  type = "create",
  hideAnimal = false,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) {
  const dispatch = useDispatch();
  const params = useParams();
  const animalList = useSelector((state) => state.animal.list, shallowEqual);
  const listCollaborator = useSelector((state) => state.collaborator.list);

  useEffect(() => {
    if (!listCollaborator || listCollaborator.length === 0) {
      dispatch(CollaboratorActions.list());
    }
    if (!animalList || animalList.length === 0) {
      dispatch(AnimalActions.list());
    }
    if (hideAnimal) {
      initValues.animalId = params._id;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preSubmit = (values, actions) => {
    if (values.weight < 20) {
      customModal({
        title: "Advertencia",
        message: "Control de peso muy bajo. ¿Desea continuar?",
        textOk: "SI",
        textCancel: "NO",
        onSubmit: () => onSubmit(values, actions),
      });
      return;
    }

    if (values.weight > 2200) {
      customModal({
        title: "Advertencia",
        message: "Control de peso muy alto. ¿Desea continuar?",
        textOk: "SI",
        textCancel: "NO",
        onSubmit: () => onSubmit(values, actions),
      });
      return;
    }
    onSubmit(values, actions);
  };

  const onSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        const animal = animalList.find((e) => e._id === values.animalId);
        await dispatch(WeightActions.create(values, animal));
      }
      if (type === "update") {
        await dispatch(WeightActions.update(values));
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
    <>
      <Formik
        initialValues={initValues}
        onSubmit={preSubmit}
        validationSchema={validationSchema(animalList)}
        enableReinitialize
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={1}>
              <Typography variant={"subtitle1"} gutterBottom>
                {type === "create" ? "Agregar Pesaje" : "Editar Pesaje"}
              </Typography>
            </Grid>
            <Grid container spacing={1}>
              {!hideAnimal && (
                <>
                  <AutocompleteFieldFormik
                    startAdornment={
                      <InputAdornment position="start" style={{ margin: 0 }}>
                        <CustomInfoIcon
                          title={<>Sin filtros</>}
                          placement="bottom"
                        />
                      </InputAdornment>
                    }
                    required
                    options={animalList}
                    name="animalId"
                    label="Identificacíon del animal"
                    onChange={props.handleChange}
                    defaultValue={
                      type === "create" ? null : props.values.animal
                    }
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
                        ? animalList.find(
                            (e) => e._id === props.values.animalId
                          )?.name
                        : ""
                    }
                  />
                </>
              )}
              <DatePickerFieldFormik
                required
                label="Fecha"
                name="controlDate"
                onChange={props.handleChange}
                xs={12}
              />
              <SelectFieldFormik
                required
                label="Tipo de Control"
                name="controlType"
                options={Object.keys(controlTypeOptions).map((key) => ({
                  _id: key,
                  name: controlTypeOptions[key],
                }))}
                onChange={props.handleChange}
                xs={12}
              />
              <TextFieldFormik
                required
                label="Peso"
                name="weight"
                type="number"
                onChange={props.handleChange}
                xs={12}
              />
              <SelectFieldFormik
                required
                onChange={props.handleChange}
                options={listCollaborator}
                label="Responsable"
                name="userId"
                xs={12}
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
      <CustomModal />
    </>
  );
}

export default WeightForm;
