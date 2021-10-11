import React, { useEffect, useState } from "react";
import { Grid, Typography, InputAdornment } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStyles } from "../styles";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import SearchFieldFormik from "../../../components/Inputs/SearchFieldFormik";
import CheckboxFormik from "../../../components/Inputs/CheckboxFormik";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import AnimalActions from "../../../redux/actions/animal.actions";
import {
  categoryOptions,
  racialTypeOptions,
  sexOptions,
  stateOptions,
} from "../../../constants";
import raceActions from "../../../redux/actions/race.actions";

/**
 * @component
 * @description Componente, formulario de animales
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const defaultInitValues = {
  identifier: "",
  name: "",
  birthDate: null,
  herdDate: new Date(),
  registerNumber: "",
  gender: "MALE",
  category: null,
  father: null,
  mother: null,
  fatherId: "",
  motherId: "",
  race1Id: "",
  percentageRace1: 0,
  race2Id: "",
  percentageRace2: 0,
  race3Id: "",
  percentageRace3: 0,
  race4Id: "",
  percentageRace4: 0,
  racialType: "",
  color: "",
  reproductiveStatus: null,
};

function AnimalForm({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) {
  const classes = useStyles();

  const letters = ["A", "B", "C", "D"];
  const [animalRace, setAnimalRace] = useState({
    A: {},
  });
  const dispatch = useDispatch();
  const listRaces = useSelector((state) =>
    state.race.list.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );
  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );
  const femaleAnimals = useSelector(
    (state) => state.animal.list.filter((e) => e.gender === "FEMALE"),
    shallowEqual
  );

  const maleAnimals = useSelector(
    (state) => state.animal.list.filter((e) => e.gender === "MALE"),
    shallowEqual
  );

  const [errorPercentage, setErrorPercentage] = useState("");

  const validationSchema = yup.object({
    identifier: yup
      .string("Ingresa la identificacion del animal.")
      .required("Este campo es requerido."),
    name: yup.string("Ingresa el nombre del animal."),
    birthDate: yup
      .date("Ingresa una fecha correcta.")
      .max(new Date(), "No puedes poner una fecha futura")
      .nullable(),
    herdDate: yup
      .date("Ingresa una fecha correcta.")
      .required("Este campo es requerido.")
      .nullable(),
    gender: yup
      .string("Ingresa el genero del animal")
      .required("Este campo es requerido."),
  });

  useEffect(() => {
    if (!listRaces || listRaces.length === 0) {
      dispatch(raceActions.listRace());
    }
    if (type === "update") {
      if (initValues) {
        if (initValues.percentageRace2 !== 0) handleAddRace();
        if (initValues.percentageRace3 !== 0) handleAddRace();
        if (initValues.percentageRace4 !== 0) handleAddRace();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddRace = () => {
    const races = { ...animalRace };
    if (letters[Object.keys(races).length]) {
      races[letters[Object.keys(races).length]] = {};
      setAnimalRace(races);
    }
  };

  const handleCheckPercentage = (list = {}) => {
    let total = 0;

    Object.keys(list).forEach((animal) => {
      const percentage = list[animal];
      total = total + parseFloat(percentage);
    });

    console.log("total");
    console.log(total);

    if (total !== 100) {
      setErrorPercentage(
        "El porcentaje total debe ser 100%. Porfavor ajuste sus cantidades"
      );
      return false;
    } else {
      setErrorPercentage("");
      return true;
    }
  };

  const handleRemoveRace = (id, index, values) => {
    const races = { ...animalRace };
    delete races[id];
    values[`percentageRace${index + 1}`] = 0;
    values[`race${index + 1}Id`] = "";

    setAnimalRace(races);
  };

  const onSubmit = (values, actions) => {
    // if (errorPercentage === "") {

    const validPercentages = handleCheckPercentage({
      percentageRace1: values.percentageRace1,
      percentageRace2: values.percentageRace2,
      percentageRace3: values.percentageRace3,
      percentageRace4: values.percentageRace4,
    });

    if (!validPercentages) return;
    if (values.racialType === "") values.racialType = null;
    values.agribusinessId = currentAgribusiness._id;

    if (values.gender === "MALE") {
      if (values.isReproductive) {
        values.category = "REPRODUCTOR";
      } else {
        values.category = null;
      }
      values.reproductiveStatus = null;
    }

    if (values.gender === "FEMALE") {
      values.category = null;
    }

    if (values.father) {
      values.fatherId = values.father._id;
    } else {
      values.fatherId = "";
    }

    if (values.mother) {
      values.motherId = values.mother._id;
    } else {
      values.motherId = "";
    }

    if (type === "create") {
      dispatch(AnimalActions.create(values));
      onClickCancelButton();
    }
    if (type === "update") {
      dispatch(AnimalActions.update(values));
      onClickCancelButton();
    }
    // }
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className={classes.formStyle}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              {type === "create" && "Nuevo animal"}
              {type === "update" && "Editar animal"}
            </Typography>
          </Grid>
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
              onChange={props.handleChange}
              xs={12}
            ></TextFieldFormik>
            <TextFieldFormik
              label="Nombre"
              name="name"
              type="text"
              onChange={props.handleChange}
              xs={12}
            ></TextFieldFormik>
            <DatePickerFieldFormik
              label="Fecha de nacimiento"
              name="birthDate"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
            ></DatePickerFieldFormik>
            <DatePickerFieldFormik
              label="Entrada de hato"
              name="herdDate"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
            ></DatePickerFieldFormik>
            <TextFieldFormik
              label="Nro de registro"
              name="registerNumber"
              type="text"
              onChange={props.handleChange}
              xs={12}
            ></TextFieldFormik>
            <SelectFieldFormik
              onChange={props.handleChange}
              options={sexOptions.slice(1)}
              label="Sexo"
              name="gender"
              lg={6}
              sm={6}
              xs={12}
            ></SelectFieldFormik>
            {props.values.gender === "MALE" ? (
              <Grid
                lg={6}
                sm={6}
                xs={12}
                item
                container
                alignContent="center"
                alignItems="center"
              >
                <CheckboxFormik
                  label="Reproductor"
                  name="isReproductive"
                  options={categoryOptions}
                  onChange={props.handleChange}
                  checked={props.values.isReproductive}
                ></CheckboxFormik>
              </Grid>
            ) : (
              <SelectFieldFormik
                onChange={props.handleChange}
                options={Object.keys(stateOptions).map((key) => ({
                  _id: key,
                  name: stateOptions[key],
                }))}
                label="Estado"
                name="reproductiveStatus"
                lg={6}
                sm={6}
                xs={12}
              ></SelectFieldFormik>
            )}

            {type === "create" ? (
              <TextFieldFormik
                options={maleAnimals}
                label="Padre"
                type="text"
                name="fatherRef"
                onChange={props.handleChange}
                lg={6}
                sm={6}
                xs={12}
              ></TextFieldFormik>
            ) : (
              <TextFieldFormik
                options={maleAnimals}
                label="Padre"
                type="text"
                name="fatherRef"
                onChange={props.handleChange}
                defaultValue={props.values.father || null}
                lg={6}
                sm={6}
                xs={12}
              ></TextFieldFormik>
            )}

            {type === "create" ? (
              <TextFieldFormik
                options={femaleAnimals}
                label="Madre"
                type="text"
                name="motherRef"
                onChange={props.handleChange}
                lg={6}
                sm={6}
                xs={12}
              ></TextFieldFormik>
            ) : (
              <TextFieldFormik
                options={femaleAnimals}
                label="Madre"
                type="text"
                name="motherRef"
                onChange={props.handleChange}
                defaultValue={props.values.mother || null}
                lg={6}
                sm={6}
                xs={12}
              ></TextFieldFormik>
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
                    name={`race${index + 1}Id`}
                    label="Raza"
                    options={listRaces}
                    onChange={props.handleChange}
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
                      name={`percentageRace${index + 1}`}
                      endAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                      type="number"
                      label="Porcentaje"
                      style={{ textAlign: "end" }}
                      // type="number"
                      onChange={props.handleChange}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    {Boolean(index) && (
                      <DeleteIcon
                        color={"secondary"}
                        className={classes.deleteIcon}
                        onClick={() =>
                          handleRemoveRace(raceItem, index, props.values)
                        }
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
              onChange={props.handleChange}
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
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
            ></TextFieldFormik>
          </Grid>
          <Grid item container justifyContent={"flex-end"} xs={12}>
            <Grid item xs={3} className={classes.paddingButton}>
              <ButtonFormik
                xs={3}
                label="Cancelar"
                type="cancel"
                onClick={onClickCancelButton}
              />
            </Grid>
            <Grid item xs={3}>
              <ButtonFormik xs={3} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

export default AnimalForm;
