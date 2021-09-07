import { faHome } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";

export const menuList = {
  id: "gestion-haciendas-establos",
  title: "Establo Reyes",
  img: faHome,
  submenu: [
    {
      id: "0",
      title: "U.A. Pradera",
      // link: routesDictionary.livestockControl,
      open: false,
    },
    {
      id: "1",
      title: "Agregar unidad de agronegocio",
      // link: routesDictionary.livestockControl,
      open: true,
    },
  ],
};

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
