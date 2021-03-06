import { birthDifficulyOptions, birthTypeOptions } from "../../../constants";
import { format } from "date-fns";

export const columns = (location) => [
  {
    label: "Identificador de Animal",
    name: "animal",
    options: {
      customBodyRender: (value) => value && value.identifier,
      searchable: true,
      filter: true,
    },
  },
  {
    label: "Nombre del animal",
    name: "animal",
    options: {
      customBodyRender: (value) => value && value.name,
      searchable: true,
      filter: false,
    },
  },
  {
    label: "Tipo",
    name: "birthType",
    options: {
      customBodyRender: (value) => value && birthTypeOptions[value],
      searchable: false,
      filter: true,
    },
  },
  {
    label: "Dificultad",
    name: "difficulty",
    options: {
      customBodyRender: (value) => value && birthDifficulyOptions[value],
      searchable: false,
      filter: true,
    },
  },
  {
    label: "Fecha",
    name: "birthDate",
    options: {
      customBodyRender: (value) =>
        value && format(new Date(value), "yyyy-MM-dd"),

      searchable: false,
      filter: false,
    },
  },
];
