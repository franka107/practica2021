import { Grid, Typography, InputAdornment } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import PropTypes from "prop-types";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import { movementOptions } from "../../../constants";
import { useDispatch } from "react-redux";
import MovementActions from "../../../redux/actions/movement.actions";
import { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import AutocompleteFieldFormik from "../../../components/Inputs/AutocompleteFieldFormik";
import raceActions from "../../../redux/actions/race.actions";
import CheckboxFormik from "../../../components/Inputs/CheckboxFormik";
import { useStyles } from "../../../styles";
import { AddCircle, Delete } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";

const defaultInitValues = {
  identifier: "",
  name: "",
  active: true,
  value: 0,
  stock: 0,
  //geneticType: "EMBRYO",
  observation: "",
  //race1Id: racesList ? racesList[0]._id : "",
  race1Id: "",
  percentageRace1: 100,
  race2Id: "",
  percentageRace2: 0,
  race3Id: "",
  percentageRace3: 0,
  race4Id: "",
  percentageRace4: 0,
};
const GeneticStockForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  geneticType = "EMBRYO",
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const racesList = useSelector((state) => state.race.list);
  const currentFarm = useSelector((state) => state.farm.current);
  const classes = useStyles();
  const [animalRace, setAnimalRace] = useState({
    A: { type: "1", percentage: "100%" },
  });
  const [errorPercentage, setErrorPercentage] = useState("");
  const letters = ["A", "B", "C", "D"];

  //const currentFarm = useSelector((state) => state.farm.current);
  const validationSchema = () =>
    yup.lazy((values) => {
      return yup.object({
        identifier: yup
          .string("Este campo no puedo ir vacio")
          .required("Este campo es requerido."),
        stock: yup
          .number("Ingrese solo números")
          .integer("Solo números enteros"),
        race1Id: yup
          .string("Ingresa raza.")
          .nullable(true)
          .required("Esta campo es requerido."),
      });
    });

  useEffect(() => {
    (!racesList || racesList.length === 0) && dispatch(raceActions.listRace());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        await dispatch(
          geneticStockActions.createGenticStock({ ...values, geneticType })
        );
      }
      if (type === "update") {
        await dispatch(
          geneticStockActions.updateGeneticStock({ ...values, geneticType })
        );
      }

      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
  };

  const verifyPercentage = (index, val, values) => {
    let tot = 0;
    const p1 = index === 1 ? val : values.percentageRace1;
    const p2 = index === 2 ? val : values.percentageRace2;
    const p3 = index === 3 ? val : values.percentageRace3;
    const p4 = index === 4 ? val : values.percentageRace4;

    tot = parseFloat(p1) + parseFloat(p2) + parseFloat(p3) + parseFloat(p4);

    if (tot !== 100) {
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

  const handleRemoveRace = (id, index, values) => {
    const races = { ...animalRace };
    delete races[id];
    values[`percentageRace${index + 1}`] = 0;
    values[`race${index + 1}Id`] = "";
    setAnimalRace(races);
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {type === "create" && "Nuevo stock genético"}
                {type === "update" && "Editar stock genético"}
              </Typography>
            </Grid>
            <TextFieldFormik
              label="Cod. animal"
              name="identifier"
              onChange={props.handleChange}
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              label="Nombre"
              name="name"
              onChange={props.handleChange}
              xs={12}
              sm={8}
            />
          </Grid>
          <Grid container className={classes.form__border}>
            {Object.keys(animalRace).map((raceItem, index) => (
              <Grid
                item
                xs={12}
                container
                key={`race-option-${raceItem}`}
                spacing={1}
                className={classes.form__raceContainer}
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
                    options={racesList}
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
                    {/* <TextFieldFormik
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
                  /> */}
                    <TextFieldFormik
                      xs={12}
                      name={`percentageRace${index + 1}`}
                      endAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                      type="text"
                      label="Porcentaje"
                      style={{ textAlign: "end" }}
                      // type="number"
                      // onChange={handleChange}
                      onChange={(e) => {
                        const regex = /^\d+(.\d{0,2})?$/;
                        // let newValue = ''
                        const i = index;
                        // setFieldValue("percentageRace1", i + 1);
                        if (regex.test(e.target.value)) {
                          props.setFieldValue(
                            `percentageRace${i + 1}`,
                            e.target.value
                          );
                        }
                        verifyPercentage(i + 1, e.target.value, props.values);
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    {Boolean(index) && (
                      <DeleteIcon
                        color={"secondary"}
                        className={classes.form__raceContainer__deleteIcon}
                        onClick={() =>
                          handleRemoveRace(raceItem, index, props.values)
                        }
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid
              item
              xs={12}
              className={classes.form__raceContainer__errorMessage}
            >
              <Typography variant={"caption"} gutterBottom>
                {errorPercentage}
              </Typography>
            </Grid>
            <AddCircle
              color={"secondary"}
              className={classes.form__raceContainer__addBtn}
              onClick={handleAddRace}
            />
          </Grid>
          <Grid container spacing={1}>
            <TextFieldFormik
              label="Existencia"
              type="number"
              name="stock"
              onChange={props.handleChange}
              lg={4}
              sm={4}
              xs={12}
            ></TextFieldFormik>
            <TextFieldFormik
              label="Costo unidad"
              type="number"
              name="value"
              endAdornment={
                <InputAdornment position="start">
                  {currentFarm?.currency?.currencyAbbreviation}
                </InputAdornment>
              }
              onChange={props.handleChange}
              lg={4}
              sm={4}
              xs={12}
            ></TextFieldFormik>
            <TextFieldFormik
              name="total"
              label="Total"
              sm={4}
              xs={12}
              lg={4}
              endAdornment={
                <InputAdornment position="start">
                  {currentFarm?.currency?.currencyAbbreviation}
                </InputAdornment>
              }
              disabled
              value={(props.values?.value * props.values?.stock).toFixed(2)}
            />
            <TextFieldFormik
              label="Observación"
              type="text"
              name="observation"
              onChange={props.handleChange}
              multiline
              rows={3}
              xs={12}
            ></TextFieldFormik>
            <CheckboxFormik
              name="active"
              label="Activo"
              onChange={props.handleChange}
            />
          </Grid>

          <Grid
            container
            justifyContent={"flex-end"}
            style={{ gap: "0.5rem" }}
            xs={12}
          >
            {onClickCancelButton && (
              <Grid item xs={2}>
                <ButtonFormik
                  onClick={onClickCancelButton}
                  xs={2}
                  label="Cancelar"
                  type="button"
                />
              </Grid>
            )}
            <Grid item xs={2}>
              <ButtonFormik xs={2} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

GeneticStockForm.propTypes = {
  type: PropTypes.oneOf(["create", "update"]).isRequired,
  geneticType: PropTypes.oneOf(["EMBRYO", "SEMEN"]).isRequired,
  onClickCancelButton: PropTypes.func,
  initValues: PropTypes.object,
};

export default GeneticStockForm;