import { ROUTES_DICT } from "../../routes/routesDict";
import { format } from "date-fns";
import { typeServicesTest } from "../../constants";

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
    name: "state",
    options: {
      filter: false,
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
    path: {
      pathname: ROUTES_DICT.iamnCreate,
      state: {
        from: location.pathname,
      },
    },
  },
  {
    key: "Agregar Tranferencia de embriones",
    path: {
      pathname: ROUTES_DICT.embryoTransferCreate,
      state: {
        from: location.pathname,
      },
    },
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
