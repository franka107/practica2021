import { Divider, Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router";
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
import IdeasCloudApi from "../../../helpers/ideascloudApi";
import AnimalActions from "../../../redux/actions/animal.actions";
import BirthActions from "../../../redux/actions/birth.actions";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import { useStyles } from "../../../styles";
const defaultInitValues = {
  children: [],
  birthDate: new Date(),
  animalId: null,
  birthType: birthTypeOptions.SIMPLE,
  difficulty: birthDifficulyOptions.CEASAREAN,
  retainedPlacenta: false,
  father: "",
  semen: "",
  embryo: "",
};

const BirthForm = ({
  initValues = defaultInitValues,
  type = "create",
  hideAnimal = false,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const params = useParams();
  const dispatch = useDispatch();
  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );
  const maleAnimals = useSelector(
    (state) => state.animal.list.filter((e) => e.gender === "MALE"),
    shallowEqual
  );
  const allAnimals = useSelector((state) => state.animal.list);
  const femaleAnimals = useSelector(
    (state) =>
      state.animal.list.filter(
        (e) => e.gender === "FEMALE" && e.reproductiveStatus === "PREGNANT"
      ),
    shallowEqual
  );
  const listSemen = useSelector(
    (state) => state.geneticStock.list.filter((e) => e.geneticType === "SEMEN"),
    shallowEqual
  );
  const listEmbryo = useSelector(
    (state) =>
      state.geneticStock.list.filter((e) => e.geneticType === "EMBRYO"),
    shallowEqual
  );

  const validationSchema = () =>
    yup.lazy((values) =>
      yup.object({
        animalId: yup
          .string("Ingresa vaca")
          .nullable(true)
          .required("Este campo es requerido."),
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
  const getLastBirthDate = (animalId, gender) => {
    const lastBirth = animalId
      ? allAnimals.find((e) => e._id === animalId)?.births[0]
      : null;

    const childs = [];

    if (lastBirth) {
      typeof lastBirth.child1 === "object" && childs.push(lastBirth.child1);
      typeof lastBirth.child2 === "object" && childs.push(lastBirth.child2);
      const child = childs.find((e) => e.gender === gender);
      if (child) return lastBirth.birthDate;
      else return null;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (!listSemen || listSemen.length === 0) {
      dispatch(geneticStockActions.listGeneticStockByAgribusiness());
    }
    if (!femaleAnimals || femaleAnimals.length === 0) {
      dispatch(AnimalActions.list());
    }
    if (hideAnimal) {
      initValues.animalId = params._id;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        //await dispatch(MovementActions.create(transformedValues, geneticType));
        let childs = [];
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
              motherId: values.animalId,
            })
          );
          childs.push(firstChild);
          values.children.push(firstChild._id);
          values.child1Id = firstChild._id;
          if (birthTypeOptions[values.birthType] === birthTypeOptions.TWIN) {
            const secondChild = await dispatch(
              AnimalActions.create({
                identifier: values.secondChildIdentifier,
                name: values.secondChildName,
                gender: values.secondChildGender,
                color: values.secondChildColor,
                birthDate: values.birthDate,
                herdDate: values.birthDate,
                motherId: values.animalId,
              })
            );
            childs.push(secondChild);
            values.children.push(secondChild._id);
            values.child2Id = secondChild._id;
          }
          const animal = femaleAnimals.find((e) => e._id === values.animalId);
          await dispatch(BirthActions.create(values, animal));

          const cowData = await IdeasCloudApi.fetch("animalGetById", {
            _id: values.animalId,
          });
          await dispatch(
            AnimalActions.update({
              ...cowData,
              agribusinessId: currentAgribusiness._id,
              reproductiveStatus: "EMPTY",
            })
          );
        }
      }
      if (type === "update") {
        await dispatch(BirthActions.update(values));

        //await dispatch(MovementActions.update(transformedValues, geneticType));
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
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {function Form(props) {
        useEffect(() => {
          props.setFieldValue(
            "lastMaleBirthDate",
            getLastBirthDate(props.values.animalId, "MALE")
          );
          props.setFieldValue(
            "lastfemaleBirthDate",
            getLastBirthDate(props.values.animalId, "FEMALE")
          );
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [props.values]);
        return (
          <form onSubmit={props.handleSubmit} className={classes.formStyle}>
            <Grid container spacing={1}>
              <Grid item>
                <Typography variant={"subtitle1"}>
                  {type === "create" ? "Nuevo nacimiento" : "Editar nacimiento"}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item>
                <Typography variant={"subtitle2"}>Datos Generales</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              {!hideAnimal && (
                <>
                  <AutocompleteFieldFormik
                    options={femaleAnimals}
                    name="animalId"
                    label="Identificacíon del animal"
                    onChange={props.handleChange}
                    defaultValue={
                      type === "create" ? null : props.values.animal
                    }
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
                        ? femaleAnimals.find(
                            (e) => e._id === props.values.animalId
                          )?.name
                        : ""
                    }
                  />
                </>
              )}
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
                name="pregnantDate"
                onChange={props.handleChange}
                lg={6}
                value={
                  props.values.animalId
                    ? femaleAnimals.find((e) => e._id === props.values.animalId)
                        ?.pregnantDate
                    : null
                }
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
                value={
                  props.values.animalId
                    ? femaleAnimals.find((e) => e._id === props.values.animalId)
                        ?.palpations[0]?.touchDate
                    : null
                }
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
              {props.values.animalId &&
                femaleAnimals.find((e) => e._id === props.values.animalId)
                  ?.activeService?.serviceType === "NA_MO" && (
                  <TextFieldFormik
                    label="Padre"
                    name="father"
                    disabled
                    onChange={props.handleChange}
                    value={
                      props.values.animalId
                        ? maleAnimals.find(
                            (e) =>
                              e._id ===
                              femaleAnimals.find(
                                (e) => e._id === props.values.animalId
                              )?.activeService.reproductorAnimalId
                          )?.identifier
                        : ""
                    }
                    lg={6}
                    sm={6}
                    xs={12}
                  />
                )}
              {props.values.animalId &&
                femaleAnimals.find((e) => e._id === props.values.animalId)
                  ?.activeService?.serviceType === "EM_TR" && (
                  <TextFieldFormik
                    label="Embrión"
                    name="embryo"
                    disabled
                    onChange={props.handleChange}
                    value={
                      props.values.animalId
                        ? listEmbryo.find(
                            (e) =>
                              e._id ===
                              femaleAnimals.find(
                                (e) => e._id === props.values.animalId
                              )?.activeService.geneticStockId
                          )?.identifier
                        : ""
                    }
                    lg={6}
                    sm={6}
                    xs={12}
                  />
                )}
              {props.values.animalId &&
                femaleAnimals.find((e) => e._id === props.values.animalId)
                  ?.activeService?.serviceType === "AR_IN" && (
                  <TextFieldFormik
                    label="Semen"
                    name="semen"
                    disabled
                    onChange={props.handleChange}
                    value={
                      props.values.animalId
                        ? listSemen.find(
                            (e) =>
                              e._id ===
                              femaleAnimals.find(
                                (e) => e._id === props.values.animalId
                              )?.activeService.geneticStockId
                          )?.identifier
                        : ""
                    }
                    lg={6}
                    sm={6}
                    xs={12}
                  />
                )}
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
              <DatePickerFieldFormik
                label="Ult. cria macho"
                name="lastMaleBirthDate"
                onChange={props.handleChange}
                lg={6}
                sm={6}
                xs={12}
                disabled
              ></DatePickerFieldFormik>
              <TextFieldFormik
                label="Ult. cria hembra"
                name="lastFemaleBirthDate"
                onChange={props.handleChange}
                lg={6}
                sm={6}
                xs={12}
                disabled
              ></TextFieldFormik>
            </Grid>
            <Grid
              item
              container
              justifyContent={"flex-end"}
              style={{ gap: "0.5rem" }}
              xs={12}
            >
              <Grid item xs={3} className={classes.paddingButton}>
                <ButtonFormik xs={3} label="Cancelar" type="cancel" />
              </Grid>
              <Grid item xs={3}>
                <ButtonFormik xs={3} label="Siguiente" type="submit" />
              </Grid>
            </Grid>
          </form>
        );
      }}
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
