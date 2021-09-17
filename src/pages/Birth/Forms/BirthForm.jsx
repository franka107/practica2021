import { Divider, Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as yup from "yup";
import AutocompleteFieldFormik from "../../../components/Inputs/AutocompleteFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import CheckboxFormik from "../../../components/Inputs/CheckboxFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import MultipleCheckboxFormik from "../../../components/Inputs/MultipleCheckboxFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import {
  birthDifficulyOptions,
  birthTypeOptions,
  categoryOptions,
  sexOptions,
} from "../../../constants";
import AnimalActions from "../../../redux/actions/animal.actions";
import BirthActions from "../../../redux/actions/birth.actions";
import { useStyles } from "../../../styles";
const defaultInitValues = {
  children: [],
  birthDate: new Date(),
  animalId: null,
  birthType: birthTypeOptions.SIMPLE,
  difficulty: birthDifficulyOptions.CEASAREAN,
  retainedPlacenta: false,
};

const BirthForm = ({
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
  const validationSchema = () =>
    yup.lazy((values) =>
      yup.object({
        animalId: yup
          .string("Ingresa vaca")
          .nullable(true)
          .required("Esta campo es requerido."),
        birthDate: yup
          .date("Ingresa una fecha")
          .required("Este campo es requerido."),
        birthType: yup
          .string("Ingresa el tipo de nacimiento")
          .required("Esta campo es requerido."),
        retainedPlacenta: yup
          .boolean("Evalua si retuvo placenta")
          .required("Este campo es obligatorio"),
        difficulty: yup
          .string("Ingresa el tipo de deficultad")
          .required("Esta campo es requerido."),
      })
    );
  const classes = useStyles();

  useEffect(() => {
    if (!femaleAnimals || femaleAnimals.length === 0) {
      dispatch(AnimalActions.list());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        //await dispatch(MovementActions.create(transformedValues, geneticType));
        if (
          birthTypeOptions[values.birthType] === birthTypeOptions.SIMPLE ||
          birthTypeOptions[values.birthType] === birthTypeOptions.TWIN
        ) {
          const firstChild = await dispatch(
            AnimalActions.create({
              identifier: values.firstChildIdentifier,
              name: values.firstChildName,
              gender: values.firstChildGender,
              color: values.firstChildColor,
              birthDate: values.birthDate,
              herdDate: values.birthDate,
            })
          );
          values.children.push(firstChild._id);
          if (birthTypeOptions[values.birthType] === birthTypeOptions.TWIN) {
            const secondChild = await dispatch(
              AnimalActions.create({
                identifier: values.firstChildIdentifier,
                name: values.firstChildName,
                gender: values.firstChildGender,
                color: values.firstChildColor,
                birthDate: values.birthDate,
                herdDate: values.birthDate,
              })
            );
            values.children.push(secondChild._id);
          }
          await dispatch(BirthActions.create(values));
        }
      }
      if (type === "update") {
        await dispatch(BirthActions.update(values));

        //await dispatch(MovementActions.update(transformedValues, geneticType));
      }
      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
  };
  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className={classes.formStyle}>
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant={"subtitle2"}>Datos Generales</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <AutocompleteFieldFormik
              options={femaleAnimals}
              name="animalId"
              label="Identificacíon del animal"
              onChange={props.handleChange}
              defaultValue={type === "create" ? null : props.values.animal}
              md={6}
              xs={12}
            />
            <TextFieldFormik
              label="Nombre"
              name="name"
              disabled
              onChange={props.handleChange}
              xs={12}
              md={6}
              value={
                props.values.animalId
                  ? femaleAnimals.find((e) => e._id === props.values.animalId)
                      ?.name
                  : ""
              }
            />
            <DatePickerFieldFormik
              label="Fecha "
              name="birthDate"
              onChange={props.handleChange}
              lg={4}
              sm={4}
              xs={12}
            ></DatePickerFieldFormik>
            <SelectFieldFormik
              onChange={props.handleChange}
              label="Tipo de parto"
              name="birthType"
              lg={4}
              options={Object.keys(birthTypeOptions).map((key) => ({
                _id: key,
                name: birthTypeOptions[key],
              }))}
              sm={4}
              xs={12}
            ></SelectFieldFormik>
            <SelectFieldFormik
              onChange={props.handleChange}
              label="Dificultad"
              name="difficulty"
              options={Object.keys(birthDifficulyOptions).map((key) => ({
                _id: key,
                name: birthDifficulyOptions[key],
              }))}
              lg={4}
              sm={4}
              xs={12}
            ></SelectFieldFormik>
            <TextFieldFormik
              label="Detalles"
              name="detail"
              onChange={props.handleChange}
              xs={12}
            ></TextFieldFormik>
            <DatePickerFieldFormik
              label="Fecha de Preñez"
              name="pregnancyDate"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              disabled
              xs={12}
            ></DatePickerFieldFormik>
            <DatePickerFieldFormik
              label="Fecha de Ult. Tacto"
              name="touchDate"
              onChange={props.handleChange}
              lg={6}
              disabled
              sm={6}
              xs={12}
            ></DatePickerFieldFormik>
            <CheckboxFormik
              sm={6}
              xs={12}
              name="retainedPlacenta"
              label="Retuvo placenta"
              onChange={props.handleChange}
            />
            <TextFieldFormik
              label="Padre"
              name="fatherId"
              disabled
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
            ></TextFieldFormik>
          </Grid>

          {(birthTypeOptions[props.values.birthType] ===
            birthTypeOptions.SIMPLE ||
            birthTypeOptions[props.values.birthType] ===
              birthTypeOptions.TWIN) && (
            <>
              <Grid container spacing={1} className={classes.formStyle}>
                <Grid item>
                  <Typography variant={"subtitle2"}>Nacimientos</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} className={classes.form__subBorder}>
                <TextFieldFormik
                  label="Identificación"
                  name="firstChildIdentifier"
                  onChange={props.handleChange}
                  lg={3}
                  sm={3}
                  xs={12}
                ></TextFieldFormik>
                <TextFieldFormik
                  label="Nombre"
                  name="firstChildName"
                  onChange={props.handleChange}
                  lg={3}
                  sm={3}
                  xs={12}
                ></TextFieldFormik>
                <SelectFieldFormik
                  onChange={props.handleChange}
                  options={sexOptions.slice(1)}
                  label="Sexo"
                  name="firstChildGender"
                  sm={3}
                  xs={12}
                ></SelectFieldFormik>
                <TextFieldFormik
                  label="Color"
                  name="firstChildColor"
                  onChange={props.handleChange}
                  lg={3}
                  sm={3}
                  xs={12}
                ></TextFieldFormik>
                {birthTypeOptions[props.values.birthType] ===
                  birthTypeOptions.TWIN && (
                  <>
                    <TextFieldFormik
                      label="Identificación"
                      name="secondChildIdentifier"
                      onChange={props.handleChange}
                      lg={3}
                      sm={3}
                      xs={12}
                    ></TextFieldFormik>
                    <TextFieldFormik
                      label="Nombre"
                      name="secondChildName"
                      onChange={props.handleChange}
                      lg={3}
                      sm={3}
                      xs={12}
                    ></TextFieldFormik>
                    <SelectFieldFormik
                      onChange={props.handleChange}
                      options={sexOptions.slice(1)}
                      label="Sexo"
                      name="secondChildGender"
                      sm={3}
                      xs={12}
                    ></SelectFieldFormik>
                    <TextFieldFormik
                      label="Color"
                      name="secondChildColor"
                      onChange={props.handleChange}
                      lg={3}
                      sm={3}
                      xs={12}
                    ></TextFieldFormik>
                  </>
                )}
              </Grid>
            </>
          )}
          <br />
          <Divider />
          <br />
          <Grid container spacing={1}>
            <TextFieldFormik
              label="Ult. cria macho"
              name="paddock"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
              disabled
            ></TextFieldFormik>
            <TextFieldFormik
              label="Ult. cria hembra"
              name="group"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
              disabled
            ></TextFieldFormik>
          </Grid>
          <Grid item container justifyContent={"flex-end"} xs={12}>
            <Grid item xs={3} className={classes.paddingButton}>
              <ButtonFormik xs={3} label="Cancelar" type="cancel" />
            </Grid>
            <Grid item xs={3}>
              <ButtonFormik xs={3} label="Siguiente" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

BirthForm.propTypes = {
  initValues: PropTypes.object,
  type: PropTypes.string,
  onCompleteSubmit: PropTypes.func,
  onClickCancelButton: PropTypes.func,
};

export default BirthForm;
