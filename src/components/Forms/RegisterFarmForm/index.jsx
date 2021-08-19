import { Grid } from "@material-ui/core";
import { Formik } from "formik";
import PhoneNumberFieldFormik from "../../Inputs/PhoneNumberFieldFormik";
import SelectFieldFormik from "../../Inputs/SelectFieldFormik";
import TextFieldFormik from "../../Inputs/TextFieldFormik";
import * as yup from "yup";
import { Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import ButtonFormik from "../../Inputs/ButtonFormik";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { countryActions } from "../../../redux/actions/country.actions";
import { useDispatch, useSelector } from "react-redux";
import { regionActions } from "../../../redux/actions/region.actions";
import { districtReducer } from "../../../redux/reducers/district.reducer";
import { districtActions } from "../../../redux/actions/district.actions";
import {
  coinOptions,
  unitAreaOptions,
  unitCapacityOptions,
  unitWeightOptions,
} from "./constants";
import { farmActions } from "../../../redux/actions/farm.actions";

export default function RegisterFarmForm({ setRegisterStep }) {
  const validationSchema = yup.object({
    name: yup.string().required(),
  });
  const initValues = {
    name: "",
    landLord: "",
    nit: "",
    countryId: "",
    regionId: "",
    districtId: "",
    address: "",
    phoneNumber: "",
    currency: "",
    weightUnit: "",
    areaUnit: "",
    capacityUnit: "",
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.country);
  const { regions } = useSelector((state) => state.region);
  const { districts } = useSelector((state) => state.district);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(countryActions.listAll());
    dispatch(regionActions.listAll());
    dispatch(districtActions.listAll());
  }, []);

  const handleSubmit = (values, actions) => {
    dispatch(farmActions.create({ ownerId: user._id, ...values }));
    setRegisterStep(1);
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
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Grid container spacing={1}>
                <TextFieldFormik
                  label="Nombre de la hacienda"
                  name="name"
                  onChange={props.handleChange}
                ></TextFieldFormik>
                <TextFieldFormik
                  label="Nombre del propietario"
                  name="landLord"
                  onChange={props.handleChange}
                  lg={9}
                  sm={6}
                  xs={12}
                ></TextFieldFormik>
                <TextFieldFormik
                  label="RUC/DNI/NIT"
                  name="nit"
                  onChange={props.handleChange}
                  lg={3}
                  sm={6}
                  xs={12}
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
                ></SelectFieldFormik>
                <SelectFieldFormik
                  sm={3}
                  label="Unidad de peso"
                  name="weightUnit"
                  options={unitWeightOptions}
                ></SelectFieldFormik>
                <SelectFieldFormik
                  sm={3}
                  label="Unidad de volumen"
                  name="capacityUnit"
                  options={unitCapacityOptions}
                ></SelectFieldFormik>
                <SelectFieldFormik
                  sm={3}
                  label="Moneda"
                  name="currencyId"
                  options={coinOptions}
                ></SelectFieldFormik>
                <ButtonFormik type={"submit"} xs={3} label="Siguiente" />
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </div>
  );
}
