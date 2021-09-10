import { ROUTES_DICT } from "../../routes/routesDict";

export const columnsToMuiTable = [
  {
    label: "Id Vaca",
    name: "animalId",
    options: {
      filter: false,
    },
  },
  {
    label: "Nombre Vaca",
    name: "name",
    options: {
      filter: false,
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
    },
  },
  {
    label: "Fecha Registro",
    name: "serviceDate",
    options: {
      filter: false,
    },
  },
  {
    label: "Responsable",
    name: "responsable",
    options: {
      filter: false,
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
    path: ROUTES_DICT.service,
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
