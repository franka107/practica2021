import { getAgeInYears } from "../../../../helpers/convertDate";

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
    label: "Peso",
    name: "weight",
    options: {
      filter: false,
    },
  },
  {
    label: "Valor",
    name: "valueForUnitWeight",
    options: {
      filter: false,
    },
  },
];
