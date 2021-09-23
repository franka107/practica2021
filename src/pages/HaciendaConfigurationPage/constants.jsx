import { ROUTES_DICT } from "../../routes/routesDict";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";

export const columnsTable = [
  {
    label: "Cod. registro",
    name: "cod",
    options: {
      filter: false,
    },
  },
  {
    label: "Nombres y Apellidos",
    name: "fullname",
    options: {
      filter: false,
    },
  },
  {
    label: "Fecha de Ingreso",
    name: "date",
    options: {
      filter: false,
    },
  },
  {
    label: "Cargo",
    name: "carge",
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
];

export const exampleTable = [
  {
    cod: 1,
    fullname: "Sara",
    date: "12-02-2021",
    carge: "Administrador",
    state: "Activo",
    actions: (
      <>
        <IconButton aria-label="edit">
          <Edit />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
  {
    cod: 2,
    fullname: "Pepe",
    date: "12-02-2022",
    carge: "Veterinario",
    state: "Inactivo",
    actions: (
      <>
        <IconButton aria-label="edit">
          <Edit />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </>
    ),
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
