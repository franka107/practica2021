import React, { useEffect, useState } from "react";
import { Grid, Typography, InputAdornment } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { AddCircle } from "@material-ui/icons";
import { useStyles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import TextFieldFormik from "../../../../../components/Inputs/TextFieldFormik";
import SelectFieldFormik from "../../../../../components/Inputs/SelectFieldFormik";
import SearchFieldFormik from "../../../../../components/Inputs/SearchFieldFormik";
import ButtonFormik from "../../../../../components/Inputs/ButtonFormik";
import { useDispatch, useSelector } from "react-redux";
import GeneticStockActions from "../../../../../redux/actions/geneticStock.actions";
import { getFemaleAnimals } from "../../../../../redux/selectors/animal.selector";
import MultipleCheckboxFormik from "../../../../../components/Inputs/MultipleCheckboxFormik";

const propTypes = {};

function FormEmbryo({ setOpen, type = "create", geneticStockId = "" }) {
  const classes = useStyles();

  const letters = ["A", "B", "C", "D"];
  const [animalRace, setAnimalRace] = useState({
    A: { type: "1", percentage: "100%" },
  });
  const dispatch = useDispatch();
  const { current: currentAgribusiness } = useSelector(
    (state) => state.agribusiness
  );
  const { list: races } = useSelector((state) => state.race);
  const { current: currentGeneticStock } = useSelector(
    (state) => state.geneticStock
  );

  const femaleAnimals = useSelector(getFemaleAnimals());

  const [errorPercentage, setErrorPercentage] = useState("");

  useEffect(() => {
    if (type === "update") {
      if (!currentGeneticStock) {
        dispatch(
          GeneticStockActions.listGeneticStockById({ _id: geneticStockId })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-unused-vars
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

  const handleRemoveRace = (id, index, values) => {
    const races = { ...animalRace };
    delete races[id];
    // values[`percentageRace${index + 1}`] = 0;
    // values[`race${index + 1}Id`] = "";
    setAnimalRace(races);
  };

  const [initValues] = useState({
    agribusinessId: "",
    animalId: "",
    animal: {},
    name: "",
    active: false,
    value: 0,
    stock: 0,
    totalValue: 0,
    geneticType: "EMBRYO",
    observation: "",
    race1Id: races ? races[0]._id : "",
    percentageRace1: 100,
    race2Id: "",
    percentageRace2: 0,
    race3Id: "",
    percentageRace3: 0,
    race4Id: "",
    percentageRace4: 0,
  });

  const validationSchema = yup.object({
    animalId: yup
      .string("Este campo no puedo ir vacio")
      .required("Este campo es requerido."),
  });

  const handleSubmit = (values, actions) => {
    values.animalId = values.animal._id;
    values.agribusinessId = currentAgribusiness._id;
    if (type === "create") {
      dispatch(GeneticStockActions.createGenticStock(values)).then(
        (data) => {
          dispatch(
            GeneticStockActions.listGeneticStockByAgribusiness({
              geneticType: "EMBRYO",
            })
          );
          dispatch(GeneticStockActions.clearCurrentGenticStock());
          setOpen(false);
        },
        (err) => {}
      );
    }
    if (type === "update") {
      dispatch(GeneticStockActions.updateGeneticStock(values)).then(
        (data) => {
          dispatch(
            GeneticStockActions.listGeneticStockByAgribusiness({
              geneticType: "EMBRYO",
            })
          );
          setOpen(false);
        },
        (err) => {}
      );
    }
  };

  const GeneticStockForm = ({
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1} className={classes.formStyle}>
          {type === "create" ? (
            <SearchFieldFormik
              options={femaleAnimals}
              label="Cod. animal"
              type="text"
              name="animalId"
              onChange={(e, value) => {
                setFieldValue("animal", value);
                if (value) {
                  setFieldValue("animalId", value._id);
                } else {
                  setFieldValue("animalId", "");
                }
              }}
              lg={4}
              sm={4}
              xs={12}
            />
          ) : (
            <SearchFieldFormik
              options={femaleAnimals}
              label="Cod. animal"
              type="text"
              name="animalId"
              onChange={(e, value) => {
                setFieldValue("animal", value);
                if (value) {
                  setFieldValue("animalId", value._id);
                } else {
                  setFieldValue("animalId", "");
                }
              }}
              defaultValue={values.animal || null}
              lg={4}
              sm={4}
              xs={12}
            />
          )}
          <TextFieldFormik
            label="Nombre"
            name="name"
            onChange={handleChange}
            xs={12}
            sm={4}
          />
          <Grid
            lg={4}
            sm={4}
            xs={12}
            container
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <MultipleCheckboxFormik
              label="Activo"
              name="active"
              options={[{ _id: 1, name: "Si" }]}
              onChange={handleChange}
              checked={values.active}
            ></MultipleCheckboxFormik>
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
                    name={`percentageRace${index + 1}`}
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
                      onClick={() => handleRemoveRace(raceItem, index, values)}
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
          <TextFieldFormik
            label="Costo unidad"
            type="number"
            name="value"
            onChange={handleChange}
            lg={4}
            sm={4}
            xs={12}
          ></TextFieldFormik>
          <TextFieldFormik
            label="Existencia"
            type="number"
            name="stock"
            onChange={handleChange}
            lg={4}
            sm={4}
            xs={12}
          ></TextFieldFormik>
          {/* <TextFieldFormik
            label="Valor Total"
            type="number"
            name="totalValue"
            onChange={handleChange}
            lg={4}
            sm={4}
            xs={12}
          ></TextFieldFormik> */}
          <TextFieldFormik
            label="Observación"
            type="text"
            name="observation"
            onChange={handleChange}
            multiline
            rows={3}
            xs={12}
          ></TextFieldFormik>
        </Grid>
        <Grid item container justifyContent={"flex-end"} xs={12}>
          {/* <Grid item xs={3} className={classes.paddingButton}>
                <ButtonFormik
                  xs={3}
                  label="Cancelar"
                  type="cancel"
                  onClick={() => setOpen(false)}
                />
              </Grid> */}
          <Grid item xs={3}>
            <ButtonFormik xs={3} label="Guardar" type="submit" />
          </Grid>
        </Grid>
      </form>
    );
  };

  return (
    <Grid className={classes.modal}>
      <Typography variant={"subtitle1"}>Nuevo Embrion</Typography>
      {type === "update" && currentGeneticStock && (
        <Formik
          initialValues={currentGeneticStock || {}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => <GeneticStockForm {...props} />}
        </Formik>
      )}
      {type === "create" && (
        <Formik
          initialValues={initValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => <GeneticStockForm {...props} />}
        </Formik>
      )}
    </Grid>
  );
}

FormEmbryo.propTypes = propTypes;

export default FormEmbryo;
