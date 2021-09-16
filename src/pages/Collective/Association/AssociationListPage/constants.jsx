import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { Edit } from "@material-ui/icons";

export const columns = [
  {
    title: "Nro Registro",
    field: "id",
    color: true,
  },
  {
    title: "Nombre",
    field: "name",
    color: true,
  },
  {
    title: "Edad",
    field: "age",
    color: true,
  },
  {
    title: "Estado",
    field: "state",
    color: true,
  },
  {
    title: "Peso",
    field: "weight",
    color: true,
  },
  {
    title: "Valor",
    field: "value",
    color: true,
  },
  {
    title: "Acciones",
    field: "actions",
    color: true,
  },
];

export const exampleTable = [
  {
    id: "0123",
    name: "Larizza",
    age: "51 meses",
    state: "Vaca seca",
    weight: "1410 lbs.",
    value: "5000",
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
    id: "0124",
    name: "-",
    age: "51 meses",
    state: "Vaca seca",
    weight: "1410 lbs.",
    value: "5000",
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
