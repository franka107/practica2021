import React, { useEffect, useState } from "react";
import { Grid, Typography, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { AddCircle } from "@material-ui/icons";
import { generalForm } from "./constants";
import { useStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import SearchFieldFormik from "../../../../components/Inputs/SearchFieldFormik";
import { useSelector } from "react-redux";
import { animalActions } from "../../../../redux/actions/animal.actions";

function RaceData({ setOpen }) {
  const classes = useStyles();
  const { current: currentAnimal } = useSelector((state) => state.animal);
  const letters = ["A", "B", "C", "D"];

  const [errorPercentage, setErrorPercentage] = useState("");

  const [animalRace, setAnimalRace] = useState({
    A: { type: "1", percentage: "100%" },
  });
  const [raceType, setRaceType] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
    raceType: "",
    raceTypeText: "",
  });

  const handleCheckRaceType = (item, id) => {
    const calculateRaceType = raceType.getRace.filter((race) => race.id === id);
    const raceTypeTemp = calculateRaceType[0].racialType;
    const race = { ...raceType };
    race[item] = raceTypeTemp;

    const taurus = Object.keys(race).filter((rc) => race[rc] === "BU");
    const indicus = Object.keys(race).filter((rc) => race[rc] === "ZE");

    if (taurus.length > 0 && indicus.length) {
      race.raceType = "HB";
      race.raceTypeText = "Media Sangre";
    } else if (taurus.length > 0) {
      race.raceType = "BU";
      race.raceTypeText = "Taurino";
    } else {
      race.raceType = "ZE";
      race.raceTypeText = "Cebuino";
    }

    setRaceType(race);
  };

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

  const handleRemoveRace = (id) => {
    const races = { ...animalRace };
    delete races[id];

    setAnimalRace(races);
    handleCheckPercentage(races);
  };
  const handleAddRace = () => {
    const races = { ...animalRace };

    if (letters[Object.keys(races).length]) {
      races[letters[Object.keys(races).length]] = {
        type: "1",
        percentage: "0%",
      };

      setAnimalRace(races);
      handleCheckPercentage(races);
    }
  };
  const handleSubmit = (values) => {
    console.log(values);
  };
  const validationSchema = yup.object({});

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
                  options={[]}
                  label="Madre"
                  type="text"
                  name="motherId"
                  // onChange={(e, value) => {
                  //   setFieldValue("mother", value);
                  // }}
                  lg={6}
                  sm={6}
                  xs={12}
                ></SearchFieldFormik>
                <SearchFieldFormik
                  options={[]}
                  label="Madre"
                  type="text"
                  name="motherId"
                  // onChange={(e, value) => {
                  //   setFieldValue("mother", value);
                  // }}
                  // defaultValue={values.mother || null}
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
                        options={[]}
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
                  options={[]}
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
          )}
        </Formik>
      )}
    </Grid>
  );
}

export default RaceData;
