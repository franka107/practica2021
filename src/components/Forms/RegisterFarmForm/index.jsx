import { Grid } from "@material-ui/core";
import { Formik } from "formik";
import PhoneNumberFieldFormik from "../../Inputs/PhoneNumberFieldFormik";
import SelectFieldFormik from "../../Inputs/SelectFieldFormik";
import TextFieldFormik from "../../Inputs/TextFieldFormik";
import * as yup from "yup";
import { Typography } from "@material-ui/core";
import { useStyles } from "./styles";
import ButtonFormik from "../../Inputs/ButtonFormik";

export default function RegisterFarmForm() {
  const handleSubmit = () => {};
  const validationSchema = yup.object({});
  const initValues = {
    name: "",
    landLord: "",
    nit: "",
    country: "",
    region: "",
    district: "",
    address: "",
    phoneNumber: "",
  };
  const classes = useStyles();
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
            <>
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
                name="country"
              ></SelectFieldFormik>
              <SelectFieldFormik
                xs={4}
                label="Región"
                name="region"
              ></SelectFieldFormik>
              <SelectFieldFormik
                xs={4}
                label="Distrito"
                name="district"
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
                <Typography variant={"subtitle2"} className={classes.subtitle2}>
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
              <ButtonFormik label="Siguiente" />
            </>
          )}
        </Formik>
      </Grid>
    </>
  );
}
