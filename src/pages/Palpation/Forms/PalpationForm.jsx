import React, { useEffect } from "react";
import { Grid, InputAdornment, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import AutocompleteFieldFormik from "../../../components/Inputs/AutocompleteFieldFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import { stateOptions, typeServicesTest } from "../../../constants";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AnimalActions from "../../../redux/actions/animal.actions";
import PalpationActions from "../../../redux/actions/palpation.actions";
import CustomInfoIcon from "../../../components/CustomInfoIcon";
import CollaboratorActions from "../../../redux/actions/collaborator.actions";
import { useParams } from "react-router";
import { format, isSameDay } from "date-fns";
import CustomModal, { customModal } from "../../../components/Modal";

const validationSchema = (animalList) =>
  yup.lazy((values) =>
    yup.object({
      animalId: yup.string().required("Este campo es requerido.").nullable(),
      userId: yup.string().required("Este campo es requerido.").nullable(),
      touchDate: yup
        .date()
        .max(new Date(), "No puedes poner una fecha futura")
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
              "La fecha de la palpación debe ser mayor a la fecha de entrada de hato."
            ),
        }),
      pregnantDate: yup
        .date()
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
              "La fecha de preñez debe ser mayor a la fecha de entrada de hato."
            ),
        }),
      state: yup.string().required("Este campo es requerido"),
    })
  );

const defaultInitValues = {
  animalId: "",
  touchDate: new Date(),
  state: "",
  pregnantDate: new Date(),
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
  // const stateTitle =
  //   'Una vez que se declare el estado del animal como "Preñada" o "Vacía" ya no estará disponible en este módulo hasta que se realize un nuevo servicio del animal.';
  // const animalTitle =
  //   "Los animales listados en este módulo tienen que registrar un servicio previo relacionado.";
  const dispatch = useDispatch();
  const currentAnimal = useSelector((state) => state.animal.current);
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

  const preSubmit = (values, actions) => {
    if (type === "create") {
      if (!femaleAnimals.some((e) => e._id === values.animalId)) {
        customModal({
          title: "Advertencia",
          message: "El identificador del animal que ingreso no existe.",
          textOk: null,
          textCancel: "OK",
          onSubmit: () => {},
        });
        return;
      }

      if (!listCollaborator.some((e) => e._id === values.userId)) {
        customModal({
          title: "Advertencia",
          message: "El responsable que ingreso no existe.",
          textOk: null,
          textCancel: "OK",
          onSubmit: () => {},
        });
        return;
      }

      if (
        currentAnimal.palpations.some((e) =>
          isSameDay(new Date(e.touchDate), new Date(values.touchDate))
        )
      ) {
        customModal({
          title: "Advertencia",
          message:
            "Se registra mas de una palpación en esta fecha. ¿Esta seguro de esta palpación?",
          textOk: "OK",
          textCancel: "Cancelar",
          onSubmit: () => onSubmit(values, actions),
        });
        return;
      }
    }
    onSubmit(values, actions);
  };

  const onSubmit = async (values, actions) => {
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
    <>
      <Formik
        initialValues={initValues}
        onSubmit={preSubmit}
        validationSchema={validationSchema(femaleAnimals)}
        enableReinitialize
      >
        {(props) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            if (props.values.animalId) {
              if (
                !currentAnimal ||
                currentAnimal._id !== props.values.animalId
              ) {
                dispatch(
                  AnimalActions.get({ _id: props.values.animalId })
                ).then((rsp) => {
                  props.setFieldValue(
                    "pregnantDate",
                    rsp.activeService.serviceDate
                  );
                });
              } else if (
                currentAnimal &&
                currentAnimal._id === props.values.animalId
              ) {
                dispatch(
                  AnimalActions.get({ _id: props.values.animalId })
                ).then((rsp) => {
                  props.setFieldValue(
                    "pregnantDate",
                    rsp.activeService.serviceDate
                  );
                });
              }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [props.values.animalId]);

          return (
            <form onSubmit={props.handleSubmit}>
              <Grid container spacing={1}>
                <Typography variant={"subtitle1"} gutterBottom>
                  {type === "create" ? "Agregar Palpacion" : "Editar Palpacion"}
                </Typography>
              </Grid>
              <Grid container spacing={1}>
                {!hideAnimal && (
                  <>
                    <AutocompleteFieldFormik
                      required
                      options={femaleAnimals}
                      name="animalId"
                      label="Identificación del animal"
                      startAdornment={
                        <InputAdornment position="start" style={{ margin: 0 }}>
                          <CustomInfoIcon
                            title={
                              <>
                                Genero = Hembra <br />
                                Servida = Si
                              </>
                            }
                            placement="bottom"
                          />
                        </InputAdornment>
                      }
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
                          ? femaleAnimals.find(
                              (e) => e._id === props.values.animalId
                            )?.name
                          : ""
                      }
                    />
                  </>
                )}
                <DatePickerFieldFormik
                  required
                  label="Fecha de tacto"
                  name="touchDate"
                  onChange={props.handleChange}
                  xs={12}
                />
                <SelectFieldFormik
                  required
                  onChange={props.handleChange}
                  options={Object.keys(stateOptions).map((key) => ({
                    _id: key,
                    name: stateOptions[key],
                  }))}
                  label="Estado"
                  disabled={type === "create" ? false : true}
                  name="state"
                  xs={12}
                />

                {props.values.animalId &&
                  currentAnimal &&
                  currentAnimal._id === props.values.animalId &&
                  stateOptions[props.values.state] ===
                    stateOptions.PREGNANT && (
                    <>
                      <DatePickerFieldFormik
                        disabled
                        label="Fecha preñez"
                        name="pregnantDate"
                        onChange={props.handleChange}
                        xs={12}
                      />
                      <TextFieldFormik
                        label="Tipo de Servicio"
                        name="serviceType"
                        disabled
                        onChange={props.handleChange}
                        xs={12}
                        value={
                          currentAnimal.activeService &&
                          typeServicesTest[
                            currentAnimal.activeService.serviceType
                          ]
                        }
                      />
                    </>
                  )}
                <SelectFieldFormik
                  required
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
          );
        }}
      </Formik>
      <CustomModal />
    </>
  );
};

export default PalpationForm;
