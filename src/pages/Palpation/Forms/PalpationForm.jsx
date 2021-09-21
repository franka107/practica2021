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
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const femaleAnimals = useSelector(
    (state) =>
      state.animal.list.filter((e) => e.gender === "FEMALE" && e.serviceId),
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
  });

  const handleSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        const animal = femaleAnimals.find((e) => e._id === values.animalId);
        await dispatch(PalpationActions.create(values, animal));
      }
      if (type === "update") {
        await dispatch(PalpationActions.update(values));
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
            <DatePickerFieldFormik
              label="Fecha de tacto"
              name="touchDate"
              onChange={props.handleChange}
              xs={12}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              options={Object.keys(stateOptions).map((key) => ({
                _id: key,
                name: stateOptions[key],
              }))}
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
              name="userId"
              label="Responsable"
              onChange={props.handleChange}
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
  );
};

export default PalpationForm;
