import { Divider, Grid, Typography } from "@material-ui/core";
import { differenceInDays } from "date-fns";
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
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import {
  birthDifficulyOptions,
  birthTypeOptions,
  sexOptions,
} from "../../../constants";
import IdeasCloudApi from "../../../helpers/ideascloudApi";
import AnimalActions from "../../../redux/actions/animal.actions";
import BirthActions from "../../../redux/actions/birth.actions";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import uiActions from "../../../redux/actions/ui.actions";
import { useStyles } from "../../../styles";
const defaultInitValues = {
  children: [],
  birthDate: new Date(),
  animalId: "",
  birthType: "SIMPLE",
  difficulty: "CEASAREAN",
  retainedPlacenta: false,
  lastFemaleBirth: "",
  lastMaleBirth: "",
  firstChildGender: "",
  secondChildGender: "",
  father: "",
  semen: "",
  embryo: "",
};

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
  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );
  const births = useSelector((state) => state.birth.list);
  const maleAnimals = useSelector(
    (state) => state.animal.list.filter((e) => e.gender === "MALE"),
    shallowEqual
  );
  // const allAnimals = useSelector((state) => state.animal.list);
  const femaleAnimals = useSelector(
    (state) =>
      state.animal.list.filter(
        (e) => e.gender === "FEMALE" && e.reproductiveStatus === "PREGNANT"
      ),
    shallowEqual
  );
  const currentAnimal = useSelector((state) => state.animal.current);
  const listSemen = useSelector(
    (state) => state.geneticStock.list.filter((e) => e.geneticType === "SEMEN"),
    shallowEqual
  );
  const listEmbryo = useSelector(
    (state) =>
      state.geneticStock.list.filter((e) => e.geneticType === "EMBRYO"),
    shallowEqual
  );

  const calculateRaces = (originRaces1, originRaces2) => {
    const fatherRaces = Object.keys(originRaces1)
      .filter(
        (key) =>
          (key.includes("race1Id") ||
            key.includes("race2Id") ||
            key.includes("race3Id") ||
            key.includes("race4Id")) &&
          !!originRaces1[key]
      )
      .map((key) => {
        return {
          raceId: originRaces1[key],
          percentageRace: originRaces1[`percentageRace${key.slice(-3, -2)}`],
        };
      });

    const motherRaces = Object.keys(originRaces2)
      .filter(
        (key) =>
          (key.includes("race1Id") ||
            key.includes("race2Id") ||
            key.includes("race3Id") ||
            key.includes("race4Id")) &&
          !!originRaces2[key]
      )
      .map((key) => {
        return {
          raceId: originRaces2[key],
          percentageRace: originRaces2[`percentageRace${key.slice(-3, -2)}`],
        };
      });

    const fullRaces = motherRaces.concat(fatherRaces);

    const countRace = (race) => {
      let count = 0;
      fullRaces.map((e) => {
        if (e.raceId === race.raceId) {
          count++;
        }
      });
      return count;
    };

    let childRaces = [];
    for (const raceObject of fullRaces) {
      if (!Boolean(childRaces.find((e) => e.raceId === raceObject.raceId))) {
        if (countRace(raceObject) !== 1) {
          const coincidences = fullRaces.filter(
            (e) => e.raceId === raceObject.raceId
          );
          const percentageRace =
            Number(
              coincidences[0]?.percentageRace + coincidences[1]?.percentageRace
            ) / 2;
          childRaces.push({
            raceId: raceObject.raceId,
            percentageRace,
          });
        } else {
          childRaces.push({
            raceId: raceObject.raceId,
            percentageRace: Number(raceObject?.percentageRace / 2),
          });
        }
      }
    }

    const result = {};

    childRaces.map((raceObject, i) => {
      result[`race${i + 1}Id`] = raceObject.raceId;
      result[`percentageRace${i + 1}`] = raceObject.percentageRace;
    });

    console.log(result);
    return result;
  };

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

  const onSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        const birth = await dispatch(BirthActions.create(values));

        if (
          birthTypeOptions[values.birthType] === birthTypeOptions.SIMPLE ||
          birthTypeOptions[values.birthType] === birthTypeOptions.TWIN
        ) {
          let races = {};
          if (currentAnimal.activeService) {
            switch (currentAnimal.activeService.serviceType) {
              //Artificial Insemination
              case "AR_IN":
                races = calculateRaces(
                  currentAnimal,
                  currentAnimal.activeService.geneticStock
                );
                break;
              //Natural Mount
              case "NA_MO":
                races = calculateRaces(
                  currentAnimal,
                  currentAnimal.activeService.reproductorAnimal
                );
                break;
              //Embryo transfer
              case "EM_TR":
                races = calculateRaces(
                  currentAnimal,
                  currentAnimal.activeService.geneticStock
                );
                break;
              default:
            }
          }

          let dataChild = {
            identifier: values.firstChildIdentifier,
            name: values.firstChildName,
            gender: values.firstChildGender,
            color: values.firstChildColor,
            reproductiveStatus:
              values.firstChildGender === "MALE" ? null : "EMPTY",
            birthDate: new Date(),
            herdDate: new Date(),
            birthId: birth._id,
            motherId: values.animalId,
            fatherId: currentAnimal.activeService?.reproductorAnimalId,
            bornBy: currentAnimal.activeService?.serviceType,
            ...races,
          };

          await dispatch(AnimalActions.create(dataChild));

          if (birthTypeOptions[values.birthType] === birthTypeOptions.TWIN) {
            let data2Child = {
              identifier: values.secondChildIdentifier,
              name: values.secondChildName,
              gender: values.secondChildGender,
              reproductiveStatus:
                values.secondChildGender === "MALE" ? null : "EMPTY",
              color: values.secondChildColor,
              birthId: birth._id,
              birthDate: new Date(),
              herdDate: new Date(),
              motherId: values.animalId,

              fatherId: currentAnimal.activeService?.reproductorAnimalId,
              bornBy: currentAnimal.activeService?.serviceType,
              ...races,
            };

            await dispatch(AnimalActions.create(data2Child));
          }
        } else {
          await dispatch(BirthActions.create(values));
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
    <Formik
      initialValues={initValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {births &&
        function Form(props) {
          useEffect(() => {
            if (props.values.animalId) {
              const animalSelectedBirths = births.filter(
                (birth) => birth.animalId === props.values.animalId
              );
              const lastBirthComparison = (first, second, gender) => {
                if (
                  first === null ||
                  new Date(second.birthDate) > new Date(first.birthDate)
                ) {
                  if (
                    second.birthType === "SIMPLE" &&
                    second.children[0].gender === gender
                  ) {
                    return second;
                  }
                  if (second.birthType === "TWIN") {
                    const filteredChildren = second.children.filter(
                      (child) => child.gender === gender
                    );
                    if (filteredChildren.length > 0) {
                      return second;
                    }
                  }
                  return first;
                } else {
                  return first;
                }
              };

              const lastMaleBirth = animalSelectedBirths.reduce((a, b) => {
                return lastBirthComparison(a, b, "MALE");
              }, null);

              const lastFemaleBirth = animalSelectedBirths.reduce((a, b) => {
                return lastBirthComparison(a, b, "FEMALE");
              }, null);

              props.setFieldValue(
                "lastMaleBirth",
                lastMaleBirth
                  ? lastMaleBirth.children.filter((e) => e.gender === "MALE")[0]
                      .identifier
                  : ""
              );
              props.setFieldValue(
                "lastFemaleBirth",
                lastFemaleBirth
                  ? lastFemaleBirth.children.filter(
                      (e) => e.gender === "FEMALE"
                    )[0].identifier
                  : ""
              );
            } else {
              props.setFieldValue("lastMaleBirth", "");
              props.setFieldValue("lastFemaleBirth", "");
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [props.values.animalId]);

          /*
          useEffect(() => {
            if (currentAnimal && currentAnimal._id === props.values.animalId) {
              const days = differenceInDays(
                new Date(),
                new Date(currentAnimal.pregnantDate)
              );
              if (days < 283) {
                dispatch(
                  uiActions.showSnackbar(
                    `El parto se esta dando con ${days} días, es prematuro.`,
                    "warning"
                  )
                );
              }
              if (!currentAnimal.pregnantDate) {
                dispatch(
                  uiActions.showSnackbar(
                    "No hay informacion de la fecha de preñez",
                    "warning"
                  )
                );
              }
            }
          }, [currentAnimal]);

          */
          useEffect(() => {
            props.setFieldValue("firstChildGender", "");
            props.setFieldValue("secondChildGender", "");
            if (props.values.animalId) {
              dispatch(AnimalActions.get({ _id: props.values.animalId })).then(
                (animal) => {
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
                }
              );
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [props.values.animalId]);
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
                  <Typography variant={"subtitle2"}>Datos Generales</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                {!hideAnimal && (
                  <>
                    <AutocompleteFieldFormik
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
                  label="Fecha de parto "
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
                      ? femaleAnimals.find(
                          (e) => e._id === props.values.animalId
                        )?.pregnantDate
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
                  value={currentAnimal?.palpations?.[0]?.touchDate || null}
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
                  name="lastMaleBirth"
                  onChange={props.handleChange}
                  lg={6}
                  sm={6}
                  xs={12}
                  disabled
                ></TextFieldFormik>
                <TextFieldFormik
                  label="Ult. cria hembra"
                  name="lastFemaleBirth"
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
  );
};

BirthForm.propTypes = {
  initValues: PropTypes.object,
  type: PropTypes.string,
  onCompleteSubmit: PropTypes.func,
  onClickCancelButton: PropTypes.func,
};

export default BirthForm;
