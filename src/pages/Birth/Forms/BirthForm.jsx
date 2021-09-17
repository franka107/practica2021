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
import { categoryOptions } from "../../../constants";
import AnimalActions from "../../../redux/actions/animal.actions";
import { useStyles } from "../../../styles";
const defaultInitValues = {};

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
  const validationSchema = () => yup.lazy((values) => yup.object({}));
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
      }
      if (type === "update") {
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
              sm={4}
              xs={12}
            ></SelectFieldFormik>
            <SelectFieldFormik
              onChange={props.handleChange}
              label="Dificultad"
              name="difficulty"
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
          {props.values.birthType && (
            <>
              <Grid container spacing={1} className={classes.formStyle}>
                <Grid item>
                  <Typography variant={"subtitle2"}>Nacimientos</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} className={classes.form__subBorder}>
                <TextFieldFormik
                  label="Identificación"
                  name="identifier"
                  onChange={props.handleChange}
                  lg={3}
                  sm={3}
                  xs={12}
                ></TextFieldFormik>
                <TextFieldFormik
                  label="Nombre"
                  name="name"
                  onChange={props.handleChange}
                  lg={3}
                  sm={3}
                  xs={12}
                ></TextFieldFormik>
                <TextFieldFormik
                  label="Peso"
                  name="weight"
                  onChange={props.handleChange}
                  lg={3}
                  sm={3}
                  xs={12}
                ></TextFieldFormik>
                <TextFieldFormik
                  label="Color"
                  name="color"
                  onChange={props.handleChange}
                  lg={3}
                  sm={3}
                  xs={12}
                ></TextFieldFormik>
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
