import { ROUTES_DICT } from "../../routes/routesDict";

export const columns = [
  {
    title: "Clasificación",
    field: "id",
    color: true,
  },
  {
    title: "Total hembras",
    field: "name",
    color: true,
  },
  {
    title: "Total preñadas",
    field: "age",
    color: true,
  },
  {
    title: "Total vacias",
    field: "state",
    color: true,
  },
  {
    title: "% Preñez",
    field: "prodMilk",
    color: true,
  },
  {
    title: "<100 días de gestión",
    field: "registerDate",
    color: true,
  },
  {
    title: "100-200 días de gestión",
    field: "registerDate",
    color: true,
  },
  {
    title: ">200 días de gestión",
    field: "registerDate",
    color: true,
  },
];

export const exampleTable = [{}, {}, {}, {}];

export const categoryOptions = [{ id: "1", name: "Retuvo placenta" }];

export const generalForm = () => [
  {
    name: "id",
    label: "Identificación de hembra",
    type: "input",
    required: true,
    size: { sm: 6, xs: 12 },
  },
  {
    name: "name",
    label: "Nombre",
    type: "input",
    required: true,
    size: { sm: 6, xs: 12 },
  },
  {
    name: "date",
    label: "Fecha",
    type: "date",
    required: true,
    size: { sm: 4, xs: 12 },
  },
  {
    name: "partType",
    label: "Tipo Parto",
    type: "select",
    required: true,
    size: { sm: 4, xs: 12 },
  },
  {
    name: "dificult",
    label: "Dificultad",
    type: "select",
    required: true,
    size: { sm: 4, xs: 12 },
  },
  {
    name: "detail",
    label: "Detalle",
    type: "multiline",
    required: true,
    rows: 3,
    size: { xs: 12 },
  },
  {
    name: "preñez",
    label: "Preñez",
    type: "date",
    required: true,
    disabled: true,
    size: { sm: 6, xs: 12 },
  },
  {
    name: "lastTouch",
    label: "Últ. tacto",
    type: "date",
    required: true,
    size: { sm: 6, xs: 12 },
  },
  {
    name: "retuvo",
    type: "checkbox",
    options: categoryOptions,
    size: { sm: 6, xs: 12 },
  },
  {
    name: "father",
    label: "Padre",
    type: "input",
    disabled: true,
    required: true,
    size: { sm: 6, xs: 12 },
  },
];

export const birthForm = () => [
  {
    name: "id",
    label: "Identificacion",
    type: "input",
    required: true,
    size: { sm: 3, xs: 12 },
  },
  {
    name: "name",
    label: "Nombre",
    type: "input",
    required: true,
    size: { sm: 3, xs: 12 },
  },
  {
    name: "weight",
    label: "Peso",
    type: "input",
    required: true,
    size: { sm: 3, xs: 12 },
  },
  {
    name: "color",
    label: "Color",
    type: "input",
    required: true,
    size: { sm: 3, xs: 12 },
  },
];

export const lastForm = () => [
  {
    name: "lastM",
    label: "Última cria macho",
    type: "input",
    disabled: true,
    required: true,
    size: { sm: 6, xs: 12 },
  },
  {
    name: "lastF",
    label: "Última cria hembra",
    type: "input",
    disabled: true,
    required: true,
    size: { sm: 6, xs: 12 },
  },
];

export const birthChipOptions = (location) => [
  {
    key: "Inicio",
    path: {
      pathname: ROUTES_DICT.birth.list,
      background: location,
    },
  },
  {
    key: "Agregar nacimiento",
    path: {
      pathname: ROUTES_DICT.birth.create,
      background: location,
    },
  },
];
