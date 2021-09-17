import { format } from "date-fns";
import { stateOptions } from "../../../constants";
import { getAgeInYears } from "../../../helpers/convertDate";

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
    label: "Edad",
    name: "animal",
    options: {
      filter: false,
      customBodyRender: (value) =>
        value.birthDate
          ? getAgeInYears(new Date(value.birthDate), new Date()) + " años"
          : null,
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
    label: "Produción lechera",
    name: "milkProduction",
    options: {
      filter: false,
    },
  },
  {
    label: "Fecha registro",
    name: "touchDate",
    options: {
      filter: false,
      customBodyRender: (value) =>
        value && format(new Date(value), "yyyy-MM-dd"),
    },
  },
];
