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
import ConfigureAnimals from "../../ConfigureAnimals";
import CheckboxFormik from "../../Inputs/CheckboxFormik";
import { useHistory } from "react-router-dom";
import { ROUTES_DICT } from "../../../routes/routesDict";

export default function RegisterAgribusinessForm({ setRegisterStep }) {
  const validationSchema = yup.object({});
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
    finding: "",
    milkingId: "",
    numberId: "",
    systemId: "",
    productionId: "",
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.country);
  const { regions } = useSelector((state) => state.region);
  const { districts } = useSelector((state) => state.district);
  const categoryOptions = [{ id: "1", name: "Objetivo farmero" }];
  const milkingOptions = [
    { _id: "MA", name: "Manual" },
    { _id: "ME", name: "Mecánico" },
    { _id: "AU", name: "Automático" },
  ];

  const numberOptions = [
    { _id: "0", name: 0 },
    { _id: "1", name: 1 },
    { _id: "2", name: 2 },
    { _id: "3", name: 3 },
  ];

  const targetSystemOptions = [
    { _id: "EXT", name: "Extensivo" },
    { _id: "SIT", name: "Intensivo" },
    { _id: "INT", name: "Semi-intensivo" },
  ];

  const productionOptions = [
    { _id: "RDI", name: "Monta Directa" },
    { _id: "AIN", name: "Inseminación Artificial" },
    { _id: "ROA", name: "Monta Directa/Inseminación Artificial" },
    {
      _id: "TRE",
      name: "Inseminación Artificial, Monta Directa/Transferencia de embriones",
    },
  ];
  const history = useHistory();

  useEffect(() => {
    dispatch(countryActions.listAll());
    dispatch(regionActions.listAll());
    dispatch(districtActions.listAll());
  }, []);

  const handleSubmit = (values, actions) => {
    history.push(ROUTES_DICT.dashboard);
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
                <ConfigureAnimals
                  coin={[]}
                  handleNext={() => {}}
                  customClasses={classes.customModal}
                  saveAnimals={() => {}}
                  saveValues={() => {}}
                />
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
                  <CheckboxFormik
                    name="finding"
                    options={categoryOptions}
                    onChange={props.handleChange}
                  ></CheckboxFormik>
                </Grid>
                <Grid xs={12}>
                  <Typography variant={"subtitle2"} sm={12} xs={12}>
                    Lecheria
                  </Typography>
                </Grid>
                <SelectFieldFormik
                  xs={6}
                  label="Tipo de ordeño"
                  name="milkingId"
                  options={milkingOptions}
                ></SelectFieldFormik>
                <SelectFieldFormik
                  xs={6}
                  label="Numero de ordeño"
                  name="numberId"
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
                  name="systemId"
                  options={targetSystemOptions}
                ></SelectFieldFormik>
                <Grid xs={12}>
                  <Typography variant={"subtitle2"} sm={12} xs={12}>
                    Reproducción
                  </Typography>
                </Grid>
                <SelectFieldFormik
                  xs={6}
                  label="Manejo reproductivo"
                  name="productionId"
                  options={productionOptions}
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
