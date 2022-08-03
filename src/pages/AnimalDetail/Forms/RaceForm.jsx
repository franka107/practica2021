import React, { useEffect, useState } from "react";
import { Grid, Typography, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { AddCircle } from "@material-ui/icons";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AnimalActions from "../../../redux/actions/animal.actions";
import { useStyles } from "../styles";
import { racialTypeOptions } from "../../../constants";
import RaceActions from "../../../redux/actions/race.actions";

/**
 * @component
 * @description Componente, formulario de los datos relacionados con la raza del animal
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const RaceForm = ({
  initValues,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const classes = useStyles();
  // const letters = ["A", "B", "C", "D"];
  const [racesShow, setRacesShow] = useState([
    { letter: "A", show: true },
    { letter: "B", show: false },
    { letter: "C", show: false },
    { letter: "D", show: false },
  ]);
  const [inxRace, setInxRace] = useState(0);
  const dispatch = useDispatch();
  const currentAnimal = useSelector((state) => state.animal.current);
  const listRaces = useSelector((state) =>
    state.race.list.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
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

  useEffect(() => {
    const r = racesShow;
    let i = inxRace;
    if (!listRaces || listRaces.length === 0) {
      dispatch(RaceActions.listRace());
    }
    if (
      !femaleAnimals ||
      femaleAnimals.length === 0 ||
      !maleAnimals ||
      maleAnimals.length === 0
    ) {
      dispatch(AnimalActions.list());
    }
    if (
      currentAnimal.percentageRace2 !== 0 &&
      currentAnimal.percentageRace2 !== null
    ) {
      r[1].show = true;
      i = i + 1;
    }

    if (
      currentAnimal.percentageRace3 !== 0 &&
      currentAnimal.percentageRace3 !== null
    ) {
      r[2].show = true;
      i = i + 1;
    }

    if (
      currentAnimal.percentageRace4 !== 0 &&
      currentAnimal.percentageRace4 !== null
    ) {
      r[3].show = true;
      i = i + 1;
    }
    setInxRace(i);
    setRacesShow(r);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = yup.object({});

  // eslint-disable-next-line no-unused-vars
  const handleCheckPercentage = (list = {}) => {
    let total = 0;

    Object.keys(list).forEach((animal) => {
      const percentage = list[animal];
      total = total + parseFloat(percentage);
    });

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

  const handleAddRace = () => {
    const r = racesShow;
    const i = inxRace;
    r[i + 1].show = true;
    setInxRace(i + 1);
    console.log(r);
    setRacesShow(r);
  };

  const handleRemoveRace = (index, values) => {
    const r = racesShow;
    const i = inxRace;

    values[`percentageRace${index + 1}`] = 0;
    values[`race${index + 1}Id`] = "";

    r[i].show = false;
    setInxRace(i - 1);
    setRacesShow(r);
  };

  const handleSubmit = async (values, actions) => {
    try {
      const validPercentages = handleCheckPercentage({
        percentageRace1:
          values.percentageRace1 && values.percentageRace1 !== 0
            ? values.percentageRace1
            : 0,
        percentageRace2:
          values.percentageRace2 && values.percentageRace2 !== 0
            ? values.percentageRace2
            : 0,
        percentageRace3:
          values.percentageRace3 && values.percentageRace3 !== 0
            ? values.percentageRace3
            : 0,
        percentageRace4:
          values.percentageRace4 && values.percentageRace4 !== 0
            ? values.percentageRace4
            : 0,
      });

      let cont = 1;
      while (cont <= 4) {
        if (values[`race${cont}Id`] || values[`race${cont}Id`] !== "") {
          values[`race${cont}`] = listRaces.find(
            // eslint-disable-next-line no-loop-func
            (e) => e._id === values[`race${cont}Id`]
          );
        }
        cont = cont + 1;
      }

      if (!validPercentages) return;
      // if (errorPercentage === "") {
      // values.agribusinessId = currentAgribusiness._id;

      // if (values.father) {
      //   values.fatherId = values.father._id;
      // } else {
      //   values.fatherId = "";
      // }

      // if (values.mother) {
      //   values.motherId = values.mother._id;
      // } else {
      //   values.motherId = "";
      // }

      await dispatch(AnimalActions.update(values));
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
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant={"subtitle1"}>Raza</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} className={classes.formStyle}>
            {/* <SearchFieldFormik
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
            ></SearchFieldFormik> */}
            <TextFieldFormik
              label="Madre"
              type="text"
              name="motherRef"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
            ></TextFieldFormik>
            <TextFieldFormik
              label="Padre"
              type="text"
              name="fatherRef"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
            ></TextFieldFormik>
          </Grid>
          <Grid item xs={12} container className={classes.border}>
            {racesShow.map((raceItem, index) => (
              <>
                {raceItem.show && (
                  <Grid
                    item
                    xs={12}
                    container
                    key={`race-option-${index}`}
                    spacing={1}
                    className={classes.raceContainer}
                  >
                    <Grid item xs={12}>
                      <Typography
                        variant={"body2"}
                        gutterBottom
                        className={classes.subtitle}
                      >
                        {`Raza ${raceItem.letter}`}
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
                        {inxRace === index && Boolean(index) && (
                          <DeleteIcon
                            className={classes.deleteIcon}
                            onClick={() =>
                              handleRemoveRace(index, props.values)
                            }
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </>
            ))}
            <Grid item xs={12} className={classes.errorMessage}>
              <Typography variant={"caption"} gutterBottom>
                {errorPercentage}
              </Typography>
            </Grid>
            {inxRace !== racesShow.length - 1 && (
              <AddCircle className={classes.addBtn} onClick={handleAddRace} />
            )}
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
          <Grid item container justifyContent="space-between" xs={12}>
            <Grid item xs={5}>
              <ButtonFormik
                xs={3}
                label="Cancelar"
                type="cancel"
                onClick={onClickCancelButton}
              />
            </Grid>
            <Grid item xs={5}>
              <ButtonFormik xs={3} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default RaceForm;
