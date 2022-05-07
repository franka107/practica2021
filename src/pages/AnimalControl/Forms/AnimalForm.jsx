import React, { useEffect } from "react";
import { Grid, Typography, InputAdornment } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStyles } from "../styles";
import * as yup from "yup";
import { FieldArray, Formik } from "formik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import CheckboxFormik from "../../../components/Inputs/CheckboxFormik";
import { useDispatch, useSelector } from "react-redux";
import AnimalActions from "../../../redux/actions/animal.actions";
import { categoryOptions, sexOptions } from "../../../constants";
import raceActions from "../../../redux/actions/race.actions";
// import CustomInfoIcon from "../../../components/CustomInfoIcon";

/**
 * @component
 * @description Componente, formulario para crear o editar animales
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const defaultInitValues = {
  identifier: "",
  name: "",
  birthDate: new Date(),
  herdDate: new Date(),
  registerNumber: "",
  gender: "MALE",
  category: null,
  motherRef: "",
  fatherRef: "",
  pregnantDate: null,
  racialType: "",
  images: [],
  races: [{ raceId: "", percentage: null }],
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
  const dispatch = useDispatch();
  const listRaces = useSelector((state) =>
    state.race.list.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );
  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );

  const validationSchema = yup.object().shape({
    identifier: yup
      .string("Ingresa la identificacion del animal.")
      .required("Este campo es requerido."),
    name: yup.string("Ingresa el nombre del animal."),
    birthDate: yup
      .date("Ingresa una fecha correcta.")
      .max(new Date(), "No puedes poner una fecha futura")
      .required("La fecha de nacimiento es necesaria")
      .nullable(),
    herdDate: yup
      .date("Ingresa una fecha correcta.")
      .required("Este campo es requerido.")
      .nullable(),
    gender: yup
      .string("Ingresa el genero del animal")
      .required("Este campo es requerido."),
    races: yup
      .array()
      .of(
        yup.object().shape({
          raceId: yup
            .string()
            .typeError("Selecciona una raza")
            .required("Campo requerido"), // these constraints take precedence
          percentage: yup
            .number()
            .typeError("Ingrese un porcentaje")
            .min(0, "El mínimo número a ingresar es 0")
            .max(100, "El máximo número a ingresar es 100")
            .required("Campo requerido"), // these constraints take precedence
        })
      )
      .test(
        "races",
        "La suma de las razas tiene que ser 100%",
        (values) =>
          values.reduce((acc, curr) => acc + curr.percentage, 0) === 100
      ),
  });

  useEffect(() => {
    if (!listRaces || listRaces.length === 0) {
      dispatch(raceActions.listRace());
    }
    if (type === "update") {
      initValues.races = initValues.entity.races;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateRacialType = (races) => {
    const types = races.map(
      (race) => listRaces.find((e) => e._id === race.raceId)?.racialType
    );
    if (types.every((type) => type === "BOS TAURUS")) {
      return "TAURINO";
    } else if (types.every((type) => type === "BOS INDICUS")) {
      return "CEUBINO";
    } else {
      return "MEDIA SANGRE";
    }
  };

  const onSubmit = (values, actions) => {
    values.agribusinessId = currentAgribusiness._id;

    if (type === "create") {
      dispatch(AnimalActions.create(values))
        .then((r) => {
          onClickCancelButton();
        })
        .catch((e) => {});
    }
    if (type === "update") {
      dispatch(AnimalActions.update(values))
        .then((r) => {
          onClickCancelButton();
        })
        .catch((e) => {});
    }
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
            <Grid item container xs={12} lg={6} sm={6}>
              <TextFieldFormik
                label="Nro de registro"
                name="registerNumber"
                type="text"
                onChange={props.handleChange}
                xs={12}
              ></TextFieldFormik>
              {/* <CustomInfoIcon title={"Falta información"} /> */}
            </Grid>
            <SelectFieldFormik
              onChange={props.handleChange}
              options={sexOptions.slice(1)}
              label="Sexo"
              name="gender"
              lg={6}
              sm={6}
              xs={12}
            ></SelectFieldFormik>
            {props.values.gender === "MALE" && (
              <>
                <Grid
                  lg={6}
                  sm={6}
                  xs={12}
                  item
                  container
                  alignContent="center"
                  alignItems="center"
                ></Grid>
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
              </>
            )}
            <TextFieldFormik
              label="Padre"
              type="text"
              name="fatherRef"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
            ></TextFieldFormik>

            <TextFieldFormik
              label="Madre"
              type="text"
              name="motherRef"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
            ></TextFieldFormik>
          </Grid>
          <Grid container spacing={1} className={classes.formStyle}>
            <Grid item xs={12}>
              <Typography variant={"subtitle2"}>Raza</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} container className={classes.border}>
            <FieldArray
              name="races"
              render={(arrayHelpers) => (
                <>
                  {props.values.races &&
                    props.values.races.map((race, index) => (
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
                            {`Raza ${letters[index]}`}
                          </Typography>
                        </Grid>
                        <Grid item container sm={8} xs={12}>
                          <SelectFieldFormik
                            name={`races.${index}.raceId`}
                            label="Raza"
                            options={listRaces}
                            disabled={type === "create" ? false : true}
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
                              name={`races.${index}.percentage`}
                              endAdornment={
                                <InputAdornment position="start">
                                  %
                                </InputAdornment>
                              }
                              type="number"
                              disabled={type === "create" ? false : true}
                              label="Porcentaje"
                              style={{ textAlign: "end" }}
                              // type="number"
                              onChange={props.handleChange}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            {Boolean(index) && (
                              <DeleteIcon
                                color={"error"}
                                disabled={type === "create" ? false : true}
                                className={classes.deleteIcon}
                                onClick={() => arrayHelpers.remove(index)}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  <Grid item xs={12} className={classes.errorMessage}>
                    <Typography variant={"caption"} gutterBottom>
                      {props.errors.races &&
                      typeof props.errors.races === "string"
                        ? props.errors.races
                        : ""}
                    </Typography>
                  </Grid>
                  {type === "create" &&
                    props.values.races &&
                    props.values.races.length <= 3 && (
                      <AddCircle
                        color={"secondary"}
                        disabled={type === "create" ? false : true}
                        className={classes.addBtn}
                        onClick={() => {
                          console.log(props.errors);
                          arrayHelpers.push({ raceId: "", percentage: null });
                        }}
                      />
                    )}
                </>
              )}
            />
          </Grid>
          <Grid container spacing={1}>
            <TextFieldFormik
              label="Tipo Racial"
              name="racialType"
              disabled
              onChange={props.handleChange}
              xs={6}
              value={
                props.values.races && calculateRacialType(props.values.races)
              }
            />
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
