import { Grid, InputAdornment, Typography } from "@material-ui/core";
import { differenceInDays, format } from "date-fns";
import { FieldArray, Formik } from "formik";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as yup from "yup";
import CustomInfoIcon from "../../../components/CustomInfoIcon";
import AutocompleteFieldFormik from "../../../components/Inputs/AutocompleteFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import CheckboxFormik from "../../../components/Inputs/CheckboxFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import CustomModal, { customModal } from "../../../components/Modal";
import {
  birthDifficulyOptions,
  birthTypeOptions,
  sexOptions,
} from "../../../constants";
// import IdeasCloudApi from "../../../helpers/ideascloudApi";
import AnimalActions from "../../../redux/actions/animal.actions";
import BirthActions from "../../../redux/actions/birth.actions";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
// import uiActions from "../../../redux/actions/ui.actions";
import { useStyles } from "../../../styles";
const defaultInitValues = {
  children: [
    {
      identifier: "",
      color: "",
      weight: null,
      gender: "",
    },
  ],
  birthDate: new Date(),
  animalId: "",
  birthType: "SIMPLE",
  difficulty: "EUTOCICUS",
  retainedPlacenta: false,
  lastFemaleBirth: " ",
  lastMaleBirth: " ",
  firstChildGender: "",
  secondChildGender: "",
  father: "",
  semen: "",
  embryo: "",
};

const validationSchema = (animalList, totalAnimalsIdentifiers) =>
  yup.lazy((values) =>
    yup.object({
      animalId: yup
        .string()
        .nullable(true)
        .required("Este campo es requerido."),
      birthDate: yup
        .date()
        // .max(new Date(), "No puedes ingresar una fecha futura")
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
              "La fecha del nacimiento debe ser mayor a la fecha de entrada de hato."
            ),
        }),
      birthType: yup.string().required("Esta campo es requerido."),
      retainedPlacenta: yup.boolean().required("Este campo es obligatorio"),
      difficulty: yup.string().required("Esta campo es requerido."),
      children: yup.array().of(
        yup.object().shape({
          identifier: yup
            .string()
            .required("El identificador es requerido")
            .notOneOf(totalAnimalsIdentifiers(), "Identificador duplicado"),
          gender: yup.string().required("Género requerido"),
        })
      ),
    })
  );

/**
 * @component
 * @description Componente, formulario para crear o editar los datos de nacimientos de una vaca
 * @author Frank Cary Viveros <frank.cary@ideascloud.io>
 */

const BirthForm = ({
  initValues = defaultInitValues,
  type = "create",
  hideAnimal = false,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const params = useParams();
  const dispatch = useDispatch();

  const births = useSelector((state) => state.birth.list);
  const maleAnimals = useSelector(
    (state) => state.animal.list.filter((e) => e.gender === "MALE"),
    shallowEqual
  );
  const femaleAnimals = useSelector(
    (state) =>
      state.animal.list.filter(
        (animal) => animal.gender === "FEMALE" && animal.isPregnant === true
      ),
    shallowEqual
  );
  const currentAnimal = useSelector((state) => state.animal.current);
  const allAnimals = useSelector((state) => state.animal);

  const getLastMaleChild = allAnimals.list?.reduce((a, b) => {
    return new Date(a.birthDate) > new Date(b.birthDate) && a.gender === "MALE"
      ? a
      : b;
  }, 0);

  const getLastFemaleChild = allAnimals.list?.reduce((a, b) => {
    return new Date(a.birthDate) > new Date(b.birthDate) &&
      a.gender === "FEMALE"
      ? a
      : b;
  }, 0);

  const totalAnimalsIdentifiers = () =>
    allAnimals?.list.concat(allAnimals?.listDeads).map((e) => e?.identifier);

  const listSemen = useSelector(
    (state) => state.geneticStock.list.filter((e) => e.geneticType === "SEMEN"),
    shallowEqual
  );
  const listEmbryo = useSelector(
    (state) =>
      state.geneticStock.list.filter((e) => e.geneticType === "EMBRYO"),
    shallowEqual
  );

  const classes = useStyles();

  useEffect(() => {
    dispatch(AnimalActions.clearCurrent());
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

  const preSubmit = (values, actions) => {
    if (type === "create") {
      if (
        currentAnimal.dryingControl.length === 0 &&
        currentAnimal.births.length > 0
      ) {
        customModal({
          title: "Advertencia",
          message:
            "El animal no fue secado. Por favor secar al animal antes de ingresar un parto.",
          textOk: null,
          textCancel: "OK",
          onSubmit: () => {},
        });
        return;
      }
      if (
        currentAnimal &&
        differenceInDays(
          new Date(values.birthDate),
          new Date(currentAnimal.pregnantDate)
        ) < 265
      ) {
        customModal({
          title: `Advertencia, ${differenceInDays(
            new Date(values.birthDate),
            new Date(currentAnimal.pregnantDate)
          )} día(s) de preñez`,
          message:
            "El tiempo de gestación parece ser muy corto. \n¿Está seguro de continuar?",
          textOk: "SI",
          textCancel: "NO",
          onSubmit: () => onSubmit(values, actions),
        });
        return;
      }
      if (
        currentAnimal &&
        differenceInDays(
          new Date(values.birthDate),
          new Date(currentAnimal.pregnantDate)
        ) > 265
      ) {
        customModal({
          title: `Advertencia, ${differenceInDays(
            new Date(values.birthDate),
            new Date(currentAnimal.pregnantDate)
          )} día(s) de preñez`,
          message:
            "El tiempo de gestación parece ser muy largo. \n¿Está seguro de continuar? ",
          textOk: "SI",
          textCancel: "NO",
          onSubmit: () => onSubmit(values, actions),
        });
        return;
      }
    }
    onSubmit(values, actions);
  };

  const onSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        await dispatch(BirthActions.create(values));
      }
      if (type === "update") {
        await dispatch(BirthActions.update(values));
      }
      if (hideAnimal) {
        await dispatch(AnimalActions.get({ _id: params._id }));
      }
      dispatch(BirthActions.list());
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
        validationSchema={validationSchema(
          femaleAnimals,
          totalAnimalsIdentifiers
        )}
        enableReinitialize
      >
        {births &&
          function Form(props) {
            // useEffect(() => {

            //   props.setFieldValue("lastMaleBirth", getLastMaleChild.identifier);
            //   props.setFieldValue(
            //     "lastFemaleBirth",
            //     getLastFemaleChild.identifier
            //   );
            // }, []);

            useEffect(() => {
              props.setFieldValue("firstChildGender", "");
              props.setFieldValue("secondChildGender", "");
              if (props.values.animalId) {
                dispatch(
                  AnimalActions.get({ _id: props.values.animalId })
                ).then((animal) => {
                  if (animal.activeService) {
                    switch (animal.activeService.serviceType) {
                      //Inseminación artificial
                      case "AR_IN":
                        if (
                          animal.activeService.strawGender === "MALE" ||
                          animal.activeService.strawGender === "FEMALE"
                        ) {
                          props.setFieldValue(
                            "firstChildGender",
                            animal.activeService.strawGender
                          );
                          props.setFieldValue(
                            "secondChildGender",
                            animal.activeService.strawGender
                          );
                        }
                        break;
                      case "NA_MO":
                        break;
                      // Transferencia de embriones
                      case "EM_TR":
                        if (
                          animal.activeService.embryoGender === "MALE" ||
                          animal.activeService.embryoGender === "FEMALE"
                        ) {
                          props.setFieldValue(
                            "firstChildGender",
                            animal.activeService.embryoGender
                          );
                          props.setFieldValue(
                            "secondChildGender",
                            animal.activeService.embryoGender
                          );
                        }
                        break;

                      default:
                        break;
                    }
                  }
                });
              }

              // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [props.values.animalId]);

            useEffect(() => {
              if (props.values.birthType === "SIMPLE") {
                if (props.values.children.length !== 1) {
                  props.setFieldValue("children", [
                    {
                      identifier: "",
                      color: "",
                      weight: null,
                      gender: "",
                    },
                  ]);
                }
                if (props.values.children.length === 0) {
                  props.setFieldValue("children", [
                    {
                      identifier: "",
                      color: "",
                      weight: null,
                      gender: "",
                    },
                  ]);
                }
              }
              if (props.values.birthType === "TWIN") {
                if (props.values.children.length === 1) {
                  props.setFieldValue("children", [
                    {
                      identifier: "",
                      color: "",
                      weight: null,
                      gender: "",
                    },
                    {
                      identifier: "",
                      color: "",
                      weight: null,
                      gender: "",
                    },
                  ]);
                }
              }
              if (props.values.birthType === "ABORTION") {
                if (props.values.children.length === 1) {
                  props.setFieldValue("children", []);
                }
              }
              // arrayHelpers.
              // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [props.values.birthType]);

            return (
              <form onSubmit={props.handleSubmit} className={classes.formStyle}>
                <Grid container spacing={1}>
                  <Grid item>
                    <Typography variant={"subtitle1"}>
                      {type === "create"
                        ? "Nuevo nacimiento"
                        : "Editar nacimiento"}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item>
                    <Typography variant={"subtitle2"}>
                      Datos Generales
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid
                    container
                    spacing={1}
                    className={classes.form__subBorder}
                  >
                    {!hideAnimal && (
                      <>
                        <AutocompleteFieldFormik
                          startAdornment={
                            <InputAdornment
                              position="start"
                              style={{ margin: 0 }}
                            >
                              <CustomInfoIcon
                                title={
                                  <>
                                    Genero = Hembra <br />
                                    Preñada = Si
                                  </>
                                }
                                placement="bottom"
                              />
                              {/* <Info></Info> */}
                            </InputAdornment>
                          }
                          required
                          options={femaleAnimals}
                          displayName={false}
                          name="animalId"
                          label="Identificacíon del animal"
                          onChange={props.handleChange}
                          defaultValue={
                            type === "create" ? "" : props.values.animal
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
                      label="Fecha de Preñez"
                      name="pregnantDate"
                      onChange={props.handleChange}
                      lg={6}
                      value={
                        props.values.animalId &&
                        currentAnimal &&
                        currentAnimal.pregnantDate
                          ? currentAnimal.pregnantDate
                          : null
                      }
                      sm={6}
                      disabled
                      xs={12}
                    />
                    <DatePickerFieldFormik
                      label="Fecha de Ult. Tacto"
                      name="touchDate"
                      onChange={props.handleChange}
                      lg={6}
                      disabled
                      value={
                        props.values.animalId &&
                        currentAnimal &&
                        currentAnimal.palpations &&
                        currentAnimal.palpations[0].touchDate
                          ? currentAnimal.palpations[0].touchDate
                          : null
                      }
                      sm={6}
                      xs={12}
                    />
                  </Grid>
                  <DatePickerFieldFormik
                    required
                    label="Fecha de parto"
                    name="birthDate"
                    onChange={props.handleChange}
                    lg={4}
                    sm={4}
                    xs={12}
                  />
                  <SelectFieldFormik
                    required
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
                  />
                  <SelectFieldFormik
                    required
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
                  />

                  <CheckboxFormik
                    sm={6}
                    xs={12}
                    name="retainedPlacenta"
                    label="Retuvo placenta"
                    onChange={props.handleChange}
                  />

                  <Grid
                    container
                    spacing={1}
                    className={classes.form__subBorder}
                  >
                    <TextFieldFormik
                      label="Ult. cria macho"
                      name="lastMaleBirth"
                      onChange={props.handleChange}
                      value={getLastFemaleChild.identifier || " "}
                      lg={6}
                      sm={6}
                      xs={12}
                      disabled
                    />
                    <TextFieldFormik
                      label="Ult. cria hembra"
                      name="lastFemaleBirth"
                      onChange={props.handleChange}
                      value={getLastMaleChild.identifier || " "}
                      lg={6}
                      sm={6}
                      xs={12}
                      disabled
                    />
                  </Grid>
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
                        <Typography variant={"subtitle2"}>
                          {birthTypeOptions[props.values.birthType] ===
                          birthTypeOptions.SIMPLE
                            ? "Datos de la cría"
                            : "Datos de las crías"}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={1}
                      className={classes.form__subBorder}
                    >
                      <FieldArray
                        name="races"
                        render={function Children(arrayHelpers) {
                          // useEffect(() => {
                          //   if (props.values.birthType === "SIMPLE") {
                          //     if (props.values.children.length !== 1) {
                          //       arrayHelpers.replace([
                          //         {
                          //           identifier: "",
                          //           color: "",
                          //           weight: null,
                          //           gender: "",
                          //         },
                          //       ]);
                          //     }
                          //     if (props.values.children.length === 0) {
                          //       arrayHelpers.push({
                          //         identifier: "",
                          //         color: "",
                          //         weight: null,
                          //         gender: "",
                          //       });
                          //     }
                          //   }
                          //   if (props.values.birthType === "TWIN") {
                          //     if (props.values.children.length === 1) {
                          //       arrayHelpers.push({
                          //         identifier: "",
                          //         color: "",
                          //         weight: null,
                          //         gender: "",
                          //       });
                          //     }
                          //   }
                          //   // arrayHelpers.
                          //   // eslint-disable-next-line react-hooks/exhaustive-deps
                          // }, [props.values.birthType]);

                          return (
                            <>
                              {props.values.children.map((c, i) => (
                                <Grid
                                  item
                                  xs={12}
                                  container
                                  spacing={1}
                                  key={`chil-${i}`}
                                >
                                  <TextFieldFormik
                                    required
                                    label="Identificación"
                                    name={`children.${i}.identifier`}
                                    onChange={props.handleChange}
                                    lg={3}
                                    sm={3}
                                    xs={12}
                                  />
                                  <TextFieldFormik
                                    label="Nombre"
                                    name={`children.${i}.name`}
                                    onChange={props.handleChange}
                                    lg={3}
                                    sm={3}
                                    xs={12}
                                  />
                                  <SelectFieldFormik
                                    required
                                    onChange={props.handleChange}
                                    options={sexOptions.slice(1)}
                                    label="Sexo"
                                    name={`children.${i}.gender`}
                                    sm={3}
                                    xs={12}
                                  />
                                  <TextFieldFormik
                                    label="Color"
                                    name={`children.${i}.color`}
                                    onChange={props.handleChange}
                                    lg={3}
                                    sm={3}
                                    xs={12}
                                  />
                                </Grid>
                              ))}
                            </>
                          );
                        }}
                      />
                    </Grid>
                  </>
                )}
                {/* <br />
                <Divider />
                <br />
               */}
                <TextFieldFormik
                  label="Detalles"
                  name="detail"
                  onChange={props.handleChange}
                  xs={12}
                />
                <Grid
                  item
                  container
                  justifyContent={"flex-end"}
                  style={{ gap: "0.5rem" }}
                  xs={12}
                >
                  <Grid item xs={3} className={classes.paddingButton}>
                    <ButtonFormik
                      onClick={onClickCancelButton}
                      xs={3}
                      label="Cancelar"
                      type="cancel"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <ButtonFormik xs={3} label="Guardar" type="submit" />
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

BirthForm.propTypes = {
  initValues: PropTypes.object,
  type: PropTypes.string,
  onCompleteSubmit: PropTypes.func,
  onClickCancelButton: PropTypes.func,
};

export default BirthForm;
