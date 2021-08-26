import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  CircularProgress,
  InputAdornment,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStyles } from "./styles";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";
import SearchFieldFormik from "../../../../components/Inputs/SearchFieldFormik";
import CheckboxFormik from "../../../../components/Inputs/CheckboxFormik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTES_DICT } from "../../../../routes/routesDict";
import { animalActions } from "../../../../redux/actions/animal.actions";
import { categoryOptions, raceOptions } from "./constants";
import ACTION_TYPES from "../../../../redux/types";
import {
  racialTypeOptions,
  sexOptions,
  stateOptions,
} from "../../../../constants";
import {
  getFemaleAnimals,
  getMaleAnimals,
} from "../../../../redux/selectors/animal.selector";
import { format, formatISO } from "date-fns";

const propTypes = {};

function AddIndividual({ setOpen, typeAccion = "create", animalId = "" }) {
  const classes = useStyles();
  const history = useHistory();

  const letters = ["A", "B", "C", "D"];
  const [animalRace, setAnimalRace] = useState({
    A: { type: "1", percentage: "100%" },
  });
  const dispatch = useDispatch();
  const { current: currentAnimal } = useSelector((state) => state.animal);
  const { list: races } = useSelector((state) => state.race);
  const { current: currentAgribusiness } = useSelector(
    (state) => state.agribusiness
  );
  const { list: animals } = useSelector((state) => state.animal);
  const maleAnimals = useSelector(getMaleAnimals());
  const femaleAnimals = useSelector(getFemaleAnimals());

  const [errorPercentage, setErrorPercentage] = useState("");

  const validationSchema = yup.object({
    identifier: yup
      .string("Ingresa la identificacion del animal.")
      .required("Este campo es requerido."),
    name: yup
      .string("Ingresa el nombre del animal.")
      .required("Este campo es requerido."),
    birthDate: yup
      .date("Ingresa una fecha correcta.")
      .max(new Date(), "No puedes poner una fecha futura")
      .nullable(),
    herdDate: yup
      .date("Ingresa una fecha correcta.")
      // .string("Ingresa la fecha de nacimiento del animal.")
      .required("Este campo es requerido.")
      .nullable(),
    gender: yup
      .string("Ingresa el genero del animal")
      .required("Este campo es requerido."),
  });
  const [initValues, setInitValues] = useState({
    identifier: "",
    name: "",
    birthDate: null,
    herdDate: new Date(),
    registerNumber: "",
    gender: "MALE",
    isReproductive: false,
    category: "",
    father: null,
    mother: null,
    fatherId: "",
    motherId: "",
    racial1: "",
    percentageRacial1: 100,
    racial2: "",
    percentageRacial2: 0,
    racial3: "",
    percentageRacial3: 0,
    racial4: "",
    percentageRacial4: 0,
    racialType: null,
    color: "",
    reproductiveStatus: null,
  });

  useEffect(() => {
    if (typeAccion === "update") {
      if (!currentAnimal) {
        dispatch(animalActions.listById({ _id: animalId }));
      }
    }
    // console.log("hola", femaleAnimals);
  }, []);

  useEffect(() => {
    // if (typeAccion === "update") {
    //   if (currentAnimal) {
    //     let total =
    //       parseFloat(currentAnimal.percentageRacial1) +
    //       parseFloat(currentAnimal.percentageRacial2) +
    //       parseFloat(currentAnimal.percentageRacial3) +
    //       parseFloat(currentAnimal.percentageRacial4);
    //     if (total !== 100) {
    //       setErrorPercentage(
    //         "El porcentaje total debe ser 100%. Porfavor ajuste sus cantidades"
    //       );
    //     } else {
    //       setErrorPercentage("");
    //     }
    //   }
    // }
  }, [currentAnimal]);

  const handleCheckPercentage = (list = []) => {
    let total = 0;

    Object.keys(list).forEach((animal) => {
      const percentage = list[animal].percentage.replace("%", "");
      total = total + parseFloat(percentage);
    });

    if (total !== 100) {
      setErrorPercentage(
        "El porcentaje total debe ser 100%. Porfavor ajuste sus cantidades"
      );
    } else {
      setErrorPercentage("");
    }
  };

  const handleAddRace = () => {
    const races = { ...animalRace };
    if (letters[Object.keys(races).length]) {
      races[letters[Object.keys(races).length]] = {
        type: "1",
        percentage: "0%",
      };

      setAnimalRace(races);
    }
  };

  const handleRemoveRace = (id) => {
    const races = { ...animalRace };
    delete races[id];

    setAnimalRace(races);
  };

  const handleSubmit = (values, actions) => {
    // if (errorPercentage === "") {
    values.agribusinessId = currentAgribusiness._id;

    if (values.gender === "MALE") {
      if (values.isReproductive) {
        values.category = "REPRODUCTOR";
      } else {
        values.category = "";
      }
      values.reproductiveStatus = null;
    }

    if (values.gender === "FEMALE") {
      values.isReproductive = null;
      values.category = "";
    }

    if (values.father) {
      values.fatherId = values.father._id;
    }
    if (values.mother) {
      values.motherId = values.mother._id;
    }

    if (typeAccion === "create") {
      dispatch(animalActions.createElement(values));
      setOpen(false);
      console.log("init", values);
    }
    if (typeAccion === "update") {
      dispatch(animalActions.updateElement(values)).then((data) => {
        dispatch({
          type: ACTION_TYPES.ANIMAL.UPDATE_CURRENT,
          payload: null,
        });
      });
      setOpen(false);
      console.log(values.birthDate);
      console.log(format(new Date(values.birthDate), "yyyy-MM-dd"));
    }
    // }
  };

  const AnimalForm = ({
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    resetForm,
    values,
    errors,
    touched,
  }) => {
    return (
      <form onSubmit={handleSubmit} className={classes.formStyle}>
        <Grid container spacing={1} className={classes.formStyle}>
          <Grid item xs={12}>
            <Typography variant={"subtitle2"}>Datos Generales</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <TextFieldFormik
            label="Identificación del animal (Número de Arete)"
            name="identifier"
            type="text"
            onChange={handleChange}
            xs={12}
          ></TextFieldFormik>
          <TextFieldFormik
            label="Nombre"
            name="name"
            type="text"
            onChange={handleChange}
            xs={12}
          ></TextFieldFormik>
          <DatePickerFieldFormik
            label="Fecha de nacimiento"
            name="birthDate"
            onChange={handleChange}
            lg={6}
            sm={6}
            xs={12}
          ></DatePickerFieldFormik>
          <DatePickerFieldFormik
            label="Entrada de hato"
            name="herdDate"
            onChange={handleChange}
            lg={6}
            sm={6}
            xs={12}
          ></DatePickerFieldFormik>
          <TextFieldFormik
            label="Nro de registro"
            name="registerNumber"
            type="text"
            onChange={handleChange}
            xs={12}
          ></TextFieldFormik>
          <SelectFieldFormik
            onChange={handleChange}
            options={sexOptions}
            label="Sexo"
            name="gender"
            lg={6}
            sm={6}
            xs={12}
          ></SelectFieldFormik>
          {values.gender === "MALE" ? (
            <Grid
              lg={6}
              sm={6}
              xs={12}
              container
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <CheckboxFormik
                label="Categoria"
                name="isReproductive"
                options={categoryOptions}
                onChange={handleChange}
                checked={values.isReproductive}
              ></CheckboxFormik>
            </Grid>
          ) : (
            <SelectFieldFormik
              options={animals}
              onChange={handleChange}
              options={stateOptions}
              label="Estado"
              name="reproductiveStatus"
              lg={6}
              sm={6}
              xs={12}
            ></SelectFieldFormik>
          )}

          {typeAccion === "create" ? (
            <SearchFieldFormik
              options={maleAnimals}
              label="Padre"
              type="text"
              name="fatherId"
              onChange={(e, value) => {
                setFieldValue("father", value);
              }}
              lg={6}
              sm={6}
              xs={12}
            ></SearchFieldFormik>
          ) : (
            <SearchFieldFormik
              options={maleAnimals}
              label="Padre"
              type="text"
              name="fatherId"
              onChange={(e, value) => {
                setFieldValue("father", value);
              }}
              defaultValue={values.father || null}
              lg={6}
              sm={6}
              xs={12}
            ></SearchFieldFormik>
          )}

          {typeAccion === "create" ? (
            <SearchFieldFormik
              options={femaleAnimals}
              label="Madre"
              type="text"
              name="motherId"
              onChange={(e, value) => {
                setFieldValue("mother", value);
              }}
              lg={6}
              sm={6}
              xs={12}
            ></SearchFieldFormik>
          ) : (
            <SearchFieldFormik
              options={femaleAnimals}
              label="Madre"
              type="text"
              name="motherId"
              onChange={(e, value) => {
                setFieldValue("mother", value);
              }}
              defaultValue={values.mother || null}
              lg={6}
              sm={6}
              xs={12}
            ></SearchFieldFormik>
          )}
        </Grid>
        <Grid container spacing={1} className={classes.formStyle}>
          <Grid item xs={12}>
            <Typography variant={"subtitle2"}>Raza</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container className={classes.border}>
          {Object.keys(animalRace).map((raceItem, index) => (
            <Grid
              item
              xs={12}
              container
              key={`race-option-${raceItem}`}
              spacing={1}
              className={classes.raceContainer}
            >
              <Grid item xs={12}>
                <Typography
                  variant={"body2"}
                  gutterBottom
                  className={classes.subtitle}
                >
                  {`Raza ${raceItem}`}
                </Typography>
              </Grid>
              <Grid item container sm={8} xs={12}>
                <SelectFieldFormik
                  name={`racial${index + 1}`}
                  label="Raza"
                  options={races}
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                container
                sm={4}
                xs={12}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid item xs={11}>
                  <TextFieldFormik
                    xs={12}
                    name={`percentageRacial${index + 1}`}
                    endAdornment={
                      <InputAdornment position="start">%</InputAdornment>
                    }
                    type="number"
                    label="Porcentaje"
                    style={{ textAlign: "end" }}
                    // type="number"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={1}>
                  {Boolean(index) && (
                    <DeleteIcon
                      color={"secondary"}
                      className={classes.deleteIcon}
                      onClick={() => handleRemoveRace(raceItem)}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12} className={classes.errorMessage}>
            <Typography variant={"caption"} gutterBottom>
              {errorPercentage}
            </Typography>
          </Grid>
          <AddCircle
            color={"secondary"}
            className={classes.addBtn}
            onClick={handleAddRace}
          />
        </Grid>
        <Grid container spacing={1}>
          <SelectFieldFormik
            onChange={handleChange}
            options={racialTypeOptions}
            label="Tipo Racial"
            name="racialType"
            lg={6}
            sm={6}
            xs={12}
          ></SelectFieldFormik>

          <TextFieldFormik
            label="Color"
            type="text"
            name="color"
            onChange={handleChange}
            lg={6}
            sm={6}
            xs={12}
          ></TextFieldFormik>
        </Grid>
        <Grid item container justifyContent={"flex-end"} xs={12}>
          {/* <Grid item xs={3} className={classes.paddingButton}>
                                <ButtonFormik xs={3} label="Cancelar" type="cancel" />
                            </Grid> */}
          <Grid item xs={3}>
            <ButtonFormik
              xs={3}
              label="Guardar"
              type="submit"
              onClick={handleSubmit}
            />
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <Grid className={classes.modal}>
      <Typography variant={"subtitle1"} gutterBottom>
        Registro de animal
      </Typography>
      {/* <Divider /> */}

      {typeAccion === "update" && currentAnimal && (
        <Formik
          initialValues={currentAnimal}
          // initialValues={{
          //   ...currentAnimal,
          //   birthDate: formatISO(
          //     new Date(currentAnimal.birthDate),
          //     "yyyy-MM-dd"
          //   ),
          //   herdDate: format(new Date(currentAnimal.herdDate), "yyyy-MM-dd"),
          // }}
          // initialValues={{
          //   ...currentAnimal,
          //   birthDate: format(
          //     new Date(currentAnimal.birthDate),
          //     "yyyy-MM-dd'T'HH:mm:ss.SSS"
          //   ),
          //   herdDate: format(
          //     new Date(currentAnimal.herdDate),
          //     "yyyy-MM-dd'T'HH:mm:ss.SSS"
          //   ),
          // }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => <AnimalForm {...props} />}
        </Formik>
      )}
      {typeAccion === "create" && (
        <Formik
          initialValues={initValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => <AnimalForm {...props} />}
        </Formik>
      )}
    </Grid>
  );
}

AddIndividual.propTypes = propTypes;

export default AddIndividual;
