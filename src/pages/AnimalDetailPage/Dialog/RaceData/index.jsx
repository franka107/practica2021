import React, { useEffect, useState } from "react";
import { Grid, Typography, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { AddCircle } from "@material-ui/icons";
import { useStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import SearchFieldFormik from "../../../../components/Inputs/SearchFieldFormik";
import { useDispatch, useSelector } from "react-redux";
import { animalActions } from "../../../../redux/actions/animal.actions";

import ACTION_TYPES from "../../../../redux/types";
import { racialTypeOptions } from "../../../../constants";
import RaceActions from "../../../../redux/actions/race.actions";

function RaceData({ setOpen }) {
  const classes = useStyles();

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

  useEffect(() => {
    if (!races || races.length === 0) {
      dispatch(RaceActions.listRace());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      .required("Este campo es requerido.")
      .nullable(),
    herdDate: yup
      .date("Ingresa una fecha correcta.")
      // .string("Ingresa la fecha de nacimiento del animal.")
      .nullable(),
    gender: yup
      .string("Ingresa el genero del animal")
      .required("Este campo es requerido."),
  });

  // eslint-disable-next-line no-unused-vars
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
    // values.agribusinessId = currentAgribusiness._id;

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

    dispatch(animalActions.updateElement(values)).then(
      (data) => {
        dispatch({
          type: ACTION_TYPES.ANIMAL.UPDATE_CURRENT,
          payload: values,
        });
        setOpen(false);
      },
      (error) => {}
    );
  };

  return (
    <Grid className={classes.modal}>
      {currentAnimal && (
        <Formik
          initialValues={currentAnimal}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant={"subtitle1"}>Raza</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} className={classes.formStyle}>
                <SearchFieldFormik
                  options={maleAnimals}
                  label="Padre"
                  type="text"
                  name="motherId"
                  onChange={(e, value) => {
                    props.setFieldValue("father", value);
                  }}
                  defaultValue={props.values.father || null}
                  lg={6}
                  sm={6}
                  xs={12}
                ></SearchFieldFormik>
                <SearchFieldFormik
                  options={femaleAnimals}
                  label="Madre"
                  type="text"
                  name="motherId"
                  onChange={(e, value) => {
                    props.setFieldValue("mother", value);
                  }}
                  defaultValue={props.values.mother || null}
                  lg={6}
                  sm={6}
                  xs={12}
                ></SearchFieldFormik>
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
                          name={`percentageRacial${index + 1}`}
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
                  <ButtonFormik xs={3} label="Cancelar" type="cancel" />
                </Grid>
                <Grid item xs={3}>
                  <ButtonFormik xs={3} label="Guardar" type="submit" />
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}
    </Grid>
  );
}

export default RaceData;
