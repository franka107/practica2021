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
// import { regionActions } from "../../../redux/actions/region.actions";
// import { districtActions } from "../../../redux/actions/district.actions";
import {
  unitAreaOptions,
  unitCapacityOptions,
  unitWeightOptions,
} from "../../../constants";
import { farmActions } from "../../../redux/actions/farm.actions";
import currencyActions from "../../../redux/actions/currency.actions";
import { useState } from "react";
import IdeasCloudApi from "../../../helpers/ideascloudApi";
import { regionConstants } from "../../../redux/types/region.constants";
import { districtConstants } from "../../../redux/types/district.constants";

const defaultInitValues = {
  name: "",
  landLord: "",
  nit: "",
  countryId: "",
  regionId: "",
  districtId: "",
  address: "",
  phoneNumber: "",
  currencyId: "",
  weightUnit: "",
  areaUnit: "",
  capacityUnit: "",
};

const RegisterFarmForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
  setRegisterStep,
}) => {
  const [currencyListParsed, setCurrencyListParsed] = useState([]);

  const validationSchema = yup.object({
    name: yup
      .string("Ingresa el nombre de la hacienda")
      .required("El nombre de la hacienda es requerido"),
    landLord: yup
      .string("Ingresa el nombre del propietario")
      .required("El nombre del propietario es requerido"),
    nit: yup.string("Ingresa RUC/DNI/RUT"),
    countryId: yup.string("Ingrese el país").required("El país es requerido"),
    regionId: yup
      .string("Ingrese la región")
      .required("La región es requerida"),
    districtId: yup
      .string("Ingrese el distrito")
      .required("La distrito es requerido"),
    address: yup.string("Ingrese la dirección"),
    phoneNumber: yup.string("Ingrese el número"),
    areaUnit: yup
      .string("Ingrese la unidad de área")
      .required("La unidad de área es requerida"),
    weightUnit: yup
      .string("Ingrese la unidad de peso")
      .required("La unidad de peso es requerida"),
    capacityUnit: yup
      .string("Ingrese la unidad de volumen")
      .required("La unidad de volumen es requerida"),
    currencyId: yup
      .string("Ingrese el tipo de moneda")
      .required("El tipo de moneda es requerido"),
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const countries = useSelector((state) =>
    state.country.list.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })
  );
  const regionList = useSelector((state) =>
    state.region.list.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })
  );
  const districtList = useSelector((state) =>
    state.district.list.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })
  );
  const { user } = useSelector((state) => state.auth);
  const currencyList = useSelector((state) =>
    state.currency.list.sort((a, b) =>
      a.currencyAbbreviation > b.currencyAbbreviation
        ? 1
        : a.currencyAbbreviation < b.currencyAbbreviation
        ? -1
        : 0
    )
  );

  useEffect(() => {
    const parsedList = currencyList.map((e) => ({
      _id: e._id,
      name: `${e.currencyAbbreviation} - ${e.name} `,
      icon: e.icon || "",
    }));
    setCurrencyListParsed(parsedList);
  }, [currencyList]);

  useEffect(() => {
    dispatch(countryActions.retrieveCountries());
    //dispatch(regionActions.retrieveRegions());
    //dispatch(districtActions.retrieveDistricts());
    dispatch(currencyActions.retrieveCurrencies());
  }, [dispatch]);

  const handleSubmit = (values, actions) => {
    try {
      if (type === "create") {
        dispatch(farmActions.create({ ownerId: user._id, ...values }));
        setRegisterStep(1);
      }
      if (type === "update") {
        dispatch(farmActions.update(values));
      }
      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={classes.modal}>
      <Typography variant={"subtitle1"} gutterBottom>
        Configure su hacienda
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
          {function Form(props) {
            useEffect(() => {
              IdeasCloudApi.fetch("regionListByCountry", {
                countryId: props.values.countryId,
              }).then((payload) => {
                dispatch({
                  type: regionConstants.GETALL_SUCCESS,
                  payload,
                });
              });
            }, [props.values.countryId]);

            useEffect(() => {
              IdeasCloudApi.fetch("districtListByRegion", {
                regionId: props.values.regionId,
              }).then((payload) => {
                dispatch({
                  type: districtConstants.GETALL_SUCCESS,
                  payload,
                });
              });
            }, [props.values.regionId]);
            return (
              <form onSubmit={props.handleSubmit}>
                <Grid container spacing={1}>
                  <TextFieldFormik
                    label="Nombre de la hacienda"
                    name="name"
                    onChange={props.handleChange}
                  />
                  <TextFieldFormik
                    label="Nombre del propietario"
                    name="landLord"
                    onChange={props.handleChange}
                    lg={9}
                    sm={6}
                    xs={12}
                  />
                  <TextFieldFormik
                    label="RUC/DNI/NIT"
                    name="nit"
                    onChange={props.handleChange}
                    lg={3}
                    sm={6}
                    xs={12}
                  />
                  <SelectFieldFormik
                    xs={4}
                    label="Pais"
                    name="countryId"
                    options={countries}
                  />
                  <SelectFieldFormik
                    xs={4}
                    label="Estado"
                    name="regionId"
                    options={regionList}
                  />
                  <SelectFieldFormik
                    xs={4}
                    label="Cuidad"
                    name="districtId"
                    options={districtList}
                  />
                  <TextFieldFormik
                    label="Dirección"
                    name="address"
                    onChange={props.handleChange}
                    xs={9}
                  />
                  <PhoneNumberFieldFormik
                    xs={3}
                    name="phoneNumber"
                    onChange={props.handleChange}
                  />
                  <Grid item xs={12}>
                    <Typography
                      variant={"subtitle2"}
                      className={classes.subtitle2}
                    >
                      Unidades de medida
                    </Typography>
                  </Grid>
                  <SelectFieldFormik
                    sm={3}
                    label="Unidad de areá"
                    name="areaUnit"
                    options={unitAreaOptions}
                  />
                  <SelectFieldFormik
                    sm={3}
                    label="Unidad de peso"
                    name="weightUnit"
                    options={unitWeightOptions}
                  />
                  <SelectFieldFormik
                    sm={3}
                    label="Unidad de volumen"
                    name="capacityUnit"
                    options={unitCapacityOptions}
                  />
                  <SelectFieldFormik
                    sm={3}
                    label="Moneda"
                    name="currencyId"
                    options={currencyListParsed}
                  />
                  {type === "create" && (
                    <Grid item container xs={12} justifyContent="flex-end">
                      <Grid item xs={5}>
                        <ButtonFormik xs={12} label="Siguiente" type="submit" />
                      </Grid>
                    </Grid>
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
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Grid>
    </div>
  );
};

export default RegisterFarmForm;
