import { ROUTES_DICT } from "../../routes/routesDict";
import { format } from "date-fns";
import { typeServicesTest, stateOptions } from "../../constants";
import { values } from "lodash-es";

export const columnsToMuiTable = [
  {
    label: "Id Vaca",
    name: "animal",
    options: {
      customBodyRender: (value) => (value ? value.identifier : ""),
      filterType: "textField",
      searchable: true,
    },
  },
  {
    label: "Nombre Vaca",
    name: "animal",
    options: {
      filter: false,
      customBodyRender: (value) => (value ? value.name : "Sin nombre"),
      searchable: true,
    },
  },
  {
    label: "Tipo de Servicio",
    name: "serviceType",
    options: {
      searchable: false,
      customBodyRender: (value) => typeServicesTest[value],
    },
  },
  {
    label: "Fecha del Servicio",
    name: "serviceDate",
    options: {
      searchable: false,
      filter: false,
      customBodyRender: (value) =>
        value && format(new Date(value), "yyyy-MM-dd"),
    },
  },
  {
    label: "Responsable",
    name: "user",
    options: {
      searchable: false,
      customBodyRender: (value) =>
        value ? `${value.name} ${value.lastName} ` : "Sin responsable",
    },
  },
];

export const serviceRouteOptions = () => {
  const validator = localStorage.getItem("reproductiveManagement");
  if (validator !== "DM_&_AI_&_ET") {
    list.splice(2, 1);
    return list;
  } else {
    const newObject = {
      key: "Agregar Tranferencia de embriones",
      path: ROUTES_DICT.service.createET,
    };
    list.splice(2, 1, newObject);
    return list;
  }
};

export const list = [
  {
    key: "Inicio",
    path: ROUTES_DICT.service.list,
  },
  {
    key: "Agregar I.A / Agregar M.N",
    path: ROUTES_DICT.service.createIAMN,
  },
  {
    key: "Agregar Tranferencia de embriones",
    path: ROUTES_DICT.service.createET,
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
