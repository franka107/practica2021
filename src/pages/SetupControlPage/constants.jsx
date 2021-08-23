import { ReactComponent as ARS } from "../../assets/flags/argentina.svg";
import { ReactComponent as BRL } from "../../assets/flags/brazil.svg";
import { ReactComponent as CAD } from "../../assets/flags/canada.svg";
import { ReactComponent as CHF } from "../../assets/flags/chile.svg";
import { ReactComponent as COP } from "../../assets/flags/colombia.svg";
import { ReactComponent as CUP } from "../../assets/flags/ecuador.svg";
import { ReactComponent as EUR } from "../../assets/flags/european-union.svg";
import { ReactComponent as JPY } from "../../assets/flags/japan.svg";
import { ReactComponent as MXN } from "../../assets/flags/mexico.svg";
import { ReactComponent as PEN } from "../../assets/flags/peru.svg";
import { ReactComponent as UYU } from "../../assets/flags/uruguay.svg";
import { ReactComponent as USD } from "../../assets/flags/united-states-of-america.svg";

export const targetOptions = [
  { id: "1", name: "Leche" },
  { id: "2", name: "Doble propósito" },
  { id: "3", name: "Carne" },
];

export const targetSystemOptions = [
  { id: "1", name: "Extensivo" },
  { id: "2", name: "Intensivo" },
  { id: "3", name: "Semi-intensivo" },
];

export const unitAreaOptions = [
  { id: "HEC", name: "Hectáreas" },
  { id: "ACR", name: "Acres" },
];

export const unitWeightOptions = [
  { id: "POU", name: "Libras" },
  { id: "KIL", name: "Kilogramos" },
];

export const unitCapacityOptions = [
  { id: "LIT", name: "Litros" },
  { id: "KIL", name: "Kilos" },
];

export const coinOptions = [
  { id: 1, name: "PEN", icon: PEN },
  { id: 2, name: "COL", icon: COP },
  { id: 3, name: "ARS", icon: ARS },
  { id: 4, name: "CLP", icon: CHF },
  { id: 5, name: "USD", icon: USD },
  { id: 6, name: "BRL", icon: BRL },
  { id: 7, name: "CAD", icon: CAD },
  { id: 8, name: "CUP", icon: CUP },
  { id: 9, name: "EUR", icon: EUR },
  { id: 10, name: "JPY", icon: JPY },
  { id: 11, name: "MXN", icon: MXN },
  { id: 12, name: "UYU", icon: UYU },
];

export const personalForm = (
  countryOptions = [],
  stateOptions = [],
  cityOptions = [],
  values = {}
) => {
  return [
    {
      name: "country",
      label: "País",
      type: "select",
      required: true,
      defaultValue: values.country ? values.country.id : "",
      options: countryOptions,
      size: { sm: 4, xs: 12 },
    },
    {
      name: "region",
      label: "Región",
      type: "select",
      required: true,
      defaultValue: values.region ? values.region.id : "",
      options: stateOptions,
      size: { sm: 4, xs: 12 },
    },
    {
      name: "district",
      label: "Distrito/Localidad",
      type: "select",
      required: true,
      defaultValue: values.district ? values.district.id : "",
      options: cityOptions,
      size: { sm: 4, xs: 12 },
    },
    {
      name: "address",
      label: "Dirección",
      type: "input",
      required: true,
      defaultValue: values.address,
      size: { sm: 8, xs: 12 },
    },
    {
      name: "phoneNumber",
      label: "Teléfono",
      type: "phoneNumber",
      defaultValue: values.phoneNumber,
      required: false,
      rules: (value) => {
        if (value) {
          const regex = /^\+?\d{9,20}$/;
          return regex.test(value);
        }
        return true;
      },
      errorText: "Ingrese mínimo 9 dígitos.",
      size: { sm: 4, xs: 12 },
    },
  ];
};

export const contactForm = (
  countryOptions = [],
  stateOptions = [],
  cityOptions = [],
  values = {}
) => [
  {
    name: "name",
    label: "Nombre de la Hacienda",
    type: "input",
    required: true,
    defaultValue: values.name,
    size: { xs: 12 },
  },
  {
    name: "owner",
    label: "Propietario",
    type: "input",
    required: true,
    defaultValue: values.landLord,
    size: { md: 8, sm: 6, xs: 12 },
  },
  {
    name: "ruc",
    label: "RUC/DNI/NIT",
    type: "input",
    required: true,
    defaultValue: values.nit,
    size: { md: 4, sm: 6, xs: 12 },
  },
  ...personalForm(countryOptions, stateOptions, cityOptions, values),
];

export const unitForm = (values = {}, currencyList = []) => [
  {
    name: "areaUnit",
    label: "Unidad de área",
    type: "select",
    options: unitAreaOptions,
    defaultValue: values.areaUnit,
    required: true,
    size: { sm: 3, xs: 12 },
  },
  {
    name: "weightUnit",
    label: "Unidad de peso",
    type: "select",
    options: unitWeightOptions,
    defaultValue: values.weightUnit,
    required: true,
    size: { sm: 3, xs: 12 },
  },
  {
    name: "capacityUnit",
    label: "Volumen",
    type: "select",
    options: unitCapacityOptions,
    defaultValue: values.capacityUnit,
    required: true,
    size: { sm: 3, xs: 12 },
  },
  {
    name: "coin",
    label: "Moneda",
    type: "select",
    required: true,
    defaultValue: values.currency ? values.currency.id : "1",
    options: currencyList,
    size: { sm: 3, xs: 12 },
  },
];

export const barnForm = (
  countryOptions = [],
  stateOptions = [],
  cityOptions = [],
  values = {}
) => [
  {
    name: "name",
    label: "Nombre del agronegocio o establo",
    type: "input",
    required: true,
    size: { xs: 12 },
  },
  ...personalForm(countryOptions, stateOptions, cityOptions, values),
];

export const firstStep = (
  countriesList = [],
  regionsList = [],
  districtsList = [],
  currenciesList = [],
  defaultValues = {}
) => [
  {
    title: "Información básica y de contacto*",
    form: contactForm(countriesList, regionsList, districtsList, defaultValues),
  },
  {
    title: "Unidades de medida",
    form: unitForm(defaultValues, currenciesList),
  },
];

export const secondStep = (
  countriesList = [],
  regionsList = [],
  districtsList = [],
  targetOptions = [],
  defaultValues = {}
) => [
  [
    {
      title: "Información básica y de contacto",
      form: barnForm(countriesList, regionsList, districtsList, defaultValues),
    },
  ],
  [],
  [
    {
      title: "Objetivo",
    },
    {
      title: "Lechería",
    },
    {
      title: "Producción",
    },
    {
      title: "Reproducción",
    },
  ],
];
