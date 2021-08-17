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

export default function RegisterFarmForm() {
  const validationSchema = yup.object({});
  const initValues = {
    name: "",
    landLord: "",
    nit: "",
    countryId: "",
    region: "",
    district: "",
    address: "",
    phoneNumber: "",
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.country);
  const { regions } = useSelector((state) => state.region);
  const { districts } = useSelector((state) => state.district);

  useEffect(() => {
    dispatch(countryActions.listAll());
    dispatch(regionActions.listAll());
    dispatch(districtActions.listAll());
  }, []);

  const handleSubmit = (values, actions) => {
    console.log(countries);
    console.log(values);
  };
  return (
    <>
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
                ></SelectFieldFormik>
                <SelectFieldFormik
                  sm={3}
                  label="Unidad de peso"
                  name="weightUnit"
                ></SelectFieldFormik>
                <SelectFieldFormik
                  sm={3}
                  label="Unidad de volumen"
                  name="capacityUnit"
                ></SelectFieldFormik>
                <SelectFieldFormik
                  sm={3}
                  label="Moneda"
                  name="currency"
                ></SelectFieldFormik>
                <ButtonFormik xs={3} label="Siguiente" />
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </>
  );
}
