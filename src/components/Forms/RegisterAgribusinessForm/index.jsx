import { Grid } from "@material-ui/core";
import { Formik } from "formik";
import PhoneNumberFieldFormik from "../../Inputs/PhoneNumberFieldFormik";
import SelectFieldFormik from "../../Inputs/SelectFieldFormik";
import TextFieldFormik from "../../Inputs/TextFieldFormik";
import * as yup from "yup";
import { Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import ButtonFormik from "../../Inputs/ButtonFormik";
import { useEffect } from "react";
import { countryActions } from "../../../redux/actions/country.actions";
import { useDispatch, useSelector } from "react-redux";
import { regionActions } from "../../../redux/actions/region.actions";
import { districtActions } from "../../../redux/actions/district.actions";
import { unitCapacityOptions } from "../../../constants";

import MultipleCheckboxFormik from "../../Inputs/MultipleCheckboxFormik";
import { useHistory } from "react-router-dom";
import { ROUTES_DICT } from "../../../routes/routesDict";
import {
  milkingOptions,
  numberOptions,
  objectiveFarmOptions,
  productionOptions,
  targetSystemOptions,
} from "../../../constants";
import AgribusinessActions from "../../../redux/actions/agribusiness.actions";
import clsx from "clsx";
import currencyActions from "../../../redux/actions/currency.actions";
import ACTION_TYPES from "../../../redux/types";

const defaultInitValues = {
  countryId: "", // *
  districtId: "", //*
  regionId: "", //*
  address: "", //*
  averageRainfall: "", //String
  //ConfigureAnimals ----
  isBreeding: 7, //Number *
  isHeifer: 15, //Number *
  meatCost: 0, //Number *
  meatPrice: 0, //Number *
  meatUnit: "KILOGRAMS", //String *
  milkCost: 0, //Number *
  milkPrice: 0, //Number *
  milkUnit: "LITERS", //String *
  //------
  milkingNumber: 0, //Number *
  milkingType: "", //String *
  name: "", //*
  phoneNumber: "", //*
  reproductiveManagement: "", //*
  system: "", //*
  objectiveFarmOptions: "",
};

const RegisterAgribusinessForm = ({
  initValues = defaultInitValues,
  type = "none",
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const validationSchema = yup.object({
    countryId: yup.string("Ingrese el país").required("El país es requerido"),
    regionId: yup
      .string("Ingrese la región")
      .required("La región es requerida"),
    districtId: yup
      .string("Ingrese el distrito")
      .required("La distrito es requerido"),
    phoneNumber: yup.string("Ingrese el número"),
    address: yup.string("Ingrese la dirección"),
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const { list: countries } = useSelector((state) => state.country);
  const { list: regions } = useSelector((state) => state.region);
  const { list: districts } = useSelector((state) => state.district);
  const { current: currentFarm } = useSelector((state) => state.farm);
  const { current: currentAgribusiness } = useSelector(
    (state) => state.agribusiness
  );
  const { current: currentCurrency } = useSelector((state) => state.currency);

  const history = useHistory();

  useEffect(() => {
    dispatch(countryActions.retrieveCountries());
    dispatch(regionActions.retrieveRegions());
    dispatch(districtActions.retrieveDistricts());
  }, [dispatch]);

  useEffect(() => {
    currentFarm &&
      dispatch(currencyActions.findCurrencyById(currentFarm.currencyId));
  }, [currentFarm, dispatch]);

  const handleSubmit = (values, actions) => {
    try {
      if (type === "none") {
        dispatch(AgribusinessActions.create(values)).then(() => {
          history.push(ROUTES_DICT.animal.list);
        });
      }
      if (type === "create") {
        dispatch(AgribusinessActions.create(values));
      }
      if (type === "update") {
        dispatch(AgribusinessActions.update(values));
        if (currentAgribusiness._id === values._id) {
          dispatch({
            type: ACTION_TYPES.AGRIBUSINESS.UPDATE_CURRENT,
            payload: values,
          });
          localStorage.setItem(
            "reproductiveManagement",
            values.reproductiveManagement
          );
        }
      }

      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
  };
  return (
    <div className={classes.modal}>
      <Typography variant={"subtitle1"} gutterBottom>
        Configure su agronegocio o establo
      </Typography>
      <Grid container spacing={1}>
        <Typography variant={"subtitle2"} sm={3} xs={12}>
          Información básica y de contacto
        </Typography>
        <Formik
          initialValues={initValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Grid container spacing={1}>
                <TextFieldFormik
                  label="Nombre del establo o agronegocio"
                  name="name"
                  onChange={props.handleChange}
                ></TextFieldFormik>
                <SelectFieldFormik
                  xs={4}
                  label="Pais"
                  name="countryId"
                  options={countries}
                ></SelectFieldFormik>
                <SelectFieldFormik
                  xs={4}
                  label="Región"
                  name="regionId"
                  options={regions}
                ></SelectFieldFormik>
                <SelectFieldFormik
                  xs={4}
                  label="Distrito"
                  name="districtId"
                  options={districts}
                ></SelectFieldFormik>
                <TextFieldFormik
                  label="Dirección"
                  name="address"
                  onChange={props.handleChange}
                  xs={9}
                ></TextFieldFormik>
                <PhoneNumberFieldFormik
                  xs={3}
                  name="phoneNumber"
                  onChange={props.handleChange}
                />
                <Grid container className={clsx(classes.submodal)}>
                  <Grid item>
                    <Typography variant={"subtitle1"} gutterBottom>
                      Configure sus animales
                    </Typography>
                  </Grid>
                  <Grid item container spacing={1}>
                    <Grid item xs={12} container>
                      <Grid item container>
                        <Typography
                          variant={"body2"}
                          gutterBottom
                          className={classes.subtitle}
                        >
                          Categorizar
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={12}
                        className={classes.containerCategory}
                        spacing={2}
                      >
                        <Grid
                          container
                          item
                          sm={6}
                          xs={12}
                          alignItems={"flex-end"}
                          className={classes.animalItem}
                        >
                          <Grid item sm={6} xs={12}>
                            <Typography
                              variant={"body2"}
                              gutterBottom
                              className={classes.animalTitleBold}
                            >
                              Definir cria:
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            item
                            sm={6}
                            xs={12}
                            justify={"flex-end"}
                            alignItems={"flex-end"}
                          >
                            <Typography
                              variant={"body2"}
                              gutterBottom
                              className={classes.animalTitle}
                            >
                              Hasta
                            </Typography>
                            <div className={classes.numberInputText}>
                              <TextFieldFormik
                                name="isBreeding"
                                label={null}
                                type="number"
                              />
                            </div>
                            <Typography
                              variant={"body2"}
                              gutterBottom
                              className={classes.animalTitle}
                            >
                              meses
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          item
                          sm={6}
                          xs={12}
                          alignItems={"flex-end"}
                          className={classes.animalItem}
                        >
                          <Grid item sm={6} xs={12}>
                            <Typography
                              variant={"body2"}
                              gutterBottom
                              className={classes.animalTitleBold}
                            >
                              Definir novilla:
                            </Typography>
                          </Grid>
                          <Grid
                            container
                            item
                            sm={6}
                            xs={12}
                            justify={"flex-end"}
                            alignItems={"flex-end"}
                          >
                            <Typography
                              variant={"body2"}
                              gutterBottom
                              className={classes.animalTitle}
                            >
                              Hasta
                            </Typography>
                            <div className={classes.numberInputText}>
                              <TextFieldFormik
                                name="isHeifer"
                                label={null}
                                type="number"
                              />
                            </div>
                            <Typography
                              variant={"body2"}
                              gutterBottom
                              className={classes.animalTitle}
                            >
                              meses
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      className={classes.costContainer}
                    >
                      <Typography
                        variant={"body2"}
                        gutterBottom
                        className={classes.subtitle}
                      >
                        Costos y precios
                      </Typography>
                      <Grid item container className={classes.container}>
                        <Grid
                          container
                          item
                          xs={12}
                          alignItems={"flex-end"}
                          justify={"space-between"}
                          className={classes.animalItem}
                        >
                          <div className={classes.numberInput}>
                            <SelectFieldFormik
                              name="milkUnit"
                              label="Unidad"
                              options={unitCapacityOptions}
                            />
                          </div>
                          <Typography
                            variant={"body2"}
                            gutterBottom
                            className={classes.animalTitle}
                          >
                            de leche.
                          </Typography>
                          <div className={classes.input}>
                            <TextFieldFormik
                              name="milkCost"
                              label="Precio de costo"
                            />
                          </div>
                          <div className={classes.input}>
                            <TextFieldFormik
                              name="milkPrice"
                              label="Precio de venta"
                            />
                            {/* 
                              <Controls.Input
                                name={"costEstimed"}
                                label={"Costo estimado"}
                                type={"input"}
                                defaultValue={""}
                                value={cost[unit.id]}
                                onBlur={() => {
                                  setCost({
                                    ...cost,
                                    [unit.id]: parseFloat(
                                      cost[unit.id]
                                    ).toFixed(2),
                                  });
                                }}
                                onChange={({ target: { value } }) => {
                                  const regex = /^\d+(.\d{0,2})?$/;

                                  if (regex.test(value)) {
                                    setCost({ ...cost, [unit.id]: value });
                                    handleChange();
                                  }
                                }}
                                customInputClasses={classes.rightText}
                              />
                          */}
                          </div>
                          <Typography
                            variant={"body2"}
                            gutterBottom
                            className={classes.animalTitle}
                          >
                            {currentCurrency &&
                              currentCurrency.currencyAbbreviation}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          item
                          xs={12}
                          alignItems={"flex-end"}
                          justify={"space-between"}
                          className={classes.animalItem}
                        >
                          <div className={classes.numberInput}>
                            <SelectFieldFormik
                              name="meatUnit"
                              label="Unidad"
                              options={unitCapacityOptions}
                            />
                          </div>
                          <Typography
                            variant={"body2"}
                            gutterBottom
                            className={classes.animalTitle}
                          >
                            de carne.
                          </Typography>
                          <div className={classes.input}>
                            <TextFieldFormik
                              name="meatCost"
                              label="Precio de costo"
                            />
                          </div>
                          <div className={classes.input}>
                            <TextFieldFormik
                              name="meatPrice"
                              label="Precio de venta"
                            />
                          </div>
                          <Typography
                            variant={"body2"}
                            gutterBottom
                            className={classes.animalTitle}
                          >
                            {currentCurrency &&
                              currentCurrency.currencyAbbreviation}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Typography variant={"subtitle2"} sm={12} xs={12}>
                  Objetivo
                </Typography>
                <Grid
                  lg={12}
                  sm={12}
                  xs={12}
                  container
                  justifyContent="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <MultipleCheckboxFormik
                    name="objectiveFarmOptions"
                    options={objectiveFarmOptions}
                    onChange={props.handleChange}
                  ></MultipleCheckboxFormik>
                </Grid>
                <Grid xs={12}>
                  <Typography variant={"subtitle2"} sm={12} xs={12}>
                    Lecheria
                  </Typography>
                </Grid>
                <SelectFieldFormik
                  xs={6}
                  label="Tipo de ordeño"
                  name="milkingType"
                  options={milkingOptions}
                ></SelectFieldFormik>
                <SelectFieldFormik
                  xs={6}
                  label="Número de ordeños"
                  name="milkingNumber"
                  options={numberOptions}
                ></SelectFieldFormik>
                <Grid xs={12}>
                  <Typography variant={"subtitle2"} sm={12} xs={12}>
                    Producción
                  </Typography>
                </Grid>
                <SelectFieldFormik
                  xs={6}
                  label="Sistema"
                  name="system"
                  options={targetSystemOptions}
                ></SelectFieldFormik>
                <TextFieldFormik
                  label="Promedio de lluvias por año"
                  name="rainsPerYear"
                  onChange={props.handleChange}
                  xs={6}
                ></TextFieldFormik>
                <Grid xs={12}>
                  <Typography variant={"subtitle2"} sm={12} xs={12}>
                    Reproducción
                  </Typography>
                </Grid>
                <SelectFieldFormik
                  xs={12}
                  label="Manejo reproductivo"
                  name="reproductiveManagement"
                  options={productionOptions}
                ></SelectFieldFormik>
                {type === "none" && (
                  <ButtonFormik type={"submit"} xs={3} label="Siguiente" />
                )}
                {type === "update" && (
                  <Grid item container xs={12} justifyContent="space-between">
                    <Grid item xs={5}>
                      <ButtonFormik
                        xs={12}
                        label="Cancelar"
                        type="cancel"
                        onClick={onClickCancelButton}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <ButtonFormik xs={12} label="Guardar" type="submit" />
                    </Grid>
                  </Grid>
                )}
                {type === "create" && (
                  <Grid item container xs={12} justifyContent="space-between">
                    <Grid item xs={5}>
                      <ButtonFormik
                        xs={12}
                        label="Cancelar"
                        type="cancel"
                        onClick={onClickCancelButton}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <ButtonFormik xs={12} label="Guardar" type="submit" />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </div>
  );
};

export default RegisterAgribusinessForm;
