import { ROUTES_DICT } from "../../routes/routesDict";
import { positionOptions } from "../../constants";
import { format } from "date-fns";

export const columnsTable = [
  {
    label: "Nombres",
    name: "name",
    options: {
      filter: false,
    },
  },
  {
    label: "Apellidos",
    name: "lastName",
    options: {
      filter: false,
    },
  },
  {
    label: "Fecha de Ingreso",
    name: "dateAdmission",
    options: {
      filter: false,
      customBodyRender: (value) => {
        return value ? format(new Date(value), "yyyy-MM-dd") : "-";
      },
    },
  },
  {
    label: "Cargo",
    name: "position",
    options: {
      filter: false,
      customBodyRender: (value) => positionOptions[value],
    },
  },
];

export const haciendaRouteOptions = (location) => [
  {
    key: "Agregar agronegocio",
    path: {
      pathname: ROUTES_DICT.hacienda.agribusiness.create,
      state: {
        background: location,
      },
    },
  },
];
