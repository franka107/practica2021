import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit, Star, StarBorder } from "@material-ui/icons";

export const columns = [
  {
    label: "Cód Animal",
    name: "animalId",
    options: {
      filter: false,
    },
  },
  {
    label: "Nombre",
    name: "name",
    options: {
      filter: false,
    },
  },
  {
    label: "Existencia",
    name: "stock",
    options: {
      filter: false,
    },
  },
  {
    label: "Valor unidad",
    name: "value",
    options: {
      filter: false,
    },
  },
  {
    label: "Valor total",
    name: "totalValue",
    options: {
      filter: false,
    },
  },
];
export const columns2 = [
  {
    label: "Reproductor",
    name: "reproductor",
    options: {
      filter: false,
    },
  },
  {
    label: "Fecha",
    name: "name",
    options: {
      filter: false,
    },
  },
  {
    label: "Cantidad",
    name: "exist",
    options: {
      filter: false,
    },
  },
  {
    label: "Nro hembra",
    name: "unitValue",
    options: {
      filter: false,
    },
  },
  {
    label: "Valor unidad",
    name: "totalValue",
    options: {
      filter: false,
    },
  },
  {
    label: "Valor total",
    name: "father",
    options: {
      filter: false,
    },
  },
  {
    label: "A quién",
    name: "mother",
    options: {
      filter: false,
    },
  },
  {
    label: "Movimiento",
    name: "mother",
    options: {
      filter: false,
    },
  },
  {
    label: "Nombre de la vaca",
    name: "mother",
    options: {
      filter: false,
    },
  },
];

export const exampleTable = [
  {
    id: 1,
    name: "Sara",
    exist: 0,
    unitValue: 120.0,
    totalValue: 0.0,
    father: "HD05 Edmundo",
    mother: "001 Vanesa",
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
    dest: (
      <>
        <IconButton aria-label="delete">
          <Star />
        </IconButton>
      </>
    ),
  },
  {
    id: 2,
    name: "Sara",
    exist: 0,
    unitValue: 120.0,
    totalValue: 0.0,
    father: "HD05 Edmundo",
    mother: "001 Vanesa",
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
    dest: (
      <>
        <IconButton aria-label="delete">
          <StarBorder />
        </IconButton>
      </>
    ),
  },
];
