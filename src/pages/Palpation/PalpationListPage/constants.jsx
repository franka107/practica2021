import { format } from "date-fns";
import { stateOptions } from "../../../constants";
// import { getAgeInYears } from "../../../helpers/convertDate";

export const columns = [
  {
    label: "Identificación de animal",
    name: "animal",
    options: {
      customBodyRender: (value) => (value ? value.identifier : ""),
      filterType: "textField",
      searchable: true,
    },
  },
  {
    label: "Nombre",
    name: "animal",
    options: {
      filter: false,
      customBodyRender: (value) => (value ? value.name : "Sin nombre"),
      searchable: false,
    },
  },
  {
    label: "Estado",
    name: "state",
    options: {
      filter: false,
      customBodyRender: (value) => (value ? stateOptions[value] : ""),
      searchable: false,
    },
  },
  {
    label: "Fecha de Palapación",
    name: "touchDate",
    options: {
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
