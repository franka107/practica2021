import { ROUTES_DICT } from "../../routes/routesDict";
import { format } from "date-fns";
import { typeServicesTest, stateOptions } from "../../constants";

export const columnsToMuiTable = [
  {
    label: "Id Vaca",
    name: "animal",
    options: {
      filter: false,
      customBodyRender: (value) => (value ? value.identifier : ""),
    },
  },
  {
    label: "Nombre Vaca",
    name: "animal",
    options: {
      filter: false,
      customBodyRender: (value) => (value ? value.name : "Sin nombre"),
    },
  },
  {
    label: "Estado",
    name: "animal",
    options: {
      filter: false,
      customBodyRender: (value) =>
        value ? stateOptions[value.reproductiveStatus] : "",
    },
  },
  {
    label: "Tipo de Servicio",
    name: "serviceType",
    options: {
      filter: false,
      customBodyRender: (value) => typeServicesTest[value],
    },
  },
  {
    label: "Fecha Registro",
    name: "serviceDate",
    options: {
      filter: false,
      customBodyRender: (value) =>
        value && format(new Date(value), "yyyy-MM-dd"),
    },
  },
  {
    label: "Responsable",
    name: "userId",
    options: {
      filter: false,
      customBodyRender: (value) => (value ? value.name : "Sin responsable"),
    },
  },
];

export const serviceRouteOptions = (location) => [
  {
    key: "Inicio",
    path: ROUTES_DICT.service,
  },
  {
    key: "Agregar I.A / Agregar M.N",
    path: ROUTES_DICT.iamnCreate,
  },
  {
    key: "Agregar Tranferencia de embriones",
    path: ROUTES_DICT.embryoTransferCreate,
  },
  // {
  //   key: "Nuevo movimiento",
  //   path: {
  //     pathname: ROUTES_DICT.movementsCreate.replace(
  //       ":geneticType",
  //       ROUTES_SLUGS.embryo
  //     ),
  //     state: {
  //       from: location.pathname,
  //     },
  //   },
  // },
];
