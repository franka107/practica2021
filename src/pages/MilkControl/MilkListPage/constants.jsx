import { format } from "date-fns";
import { stateOptions } from "../../../constants";
import { getAgeInYears } from "../../../helpers/convertDate";

export const columns = (list) => [
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
        value?.birthDate
          ? getAgeInYears(new Date(value.birthDate), new Date()) + " años"
          : null,
      searchable: false,
    },
  },
  // {
  //   label: "Raza",
  //   name: "animal",
  //   options: {
  //     filter: false,
  //     customBodyRender: (value) =>
  //       value.numberBith
  //         ? getAgeInYears(new Date(value.birthDate), new Date()) + " años"
  //         : 0,
  //     searchable: false,
  //   },
  // },
  {
    label: "Nro. de partos",
    name: "animal",
    options: {
      filter: false,
      customBodyRender: (value) => (value?.numberBirth ? value.numberBirth : 0),
      searchable: false,
    },
  },
  {
    label: "Estado",
    name: "animal",
    options: {
      filter: false,
      customBodyRender: (value) =>
        value ? stateOptions[value.reproductiveStatus] : "",
      searchable: false,
    },
  },
  {
    label: "Dia",
    name: "firstSample",
    options: {
      filter: false,
      customBodyRender: (value) => `${value} L`,
    },
  },
  {
    label: "Tarde",
    name: "secondSample",
    options: {
      filter: false,
      customBodyRender: (value) => `${value} L`,
    },
  },
  {
    label: "Noche",
    name: "thirdSample",
    options: {
      filter: false,
      customBodyRender: (value) => `${value} L`,
    },
  },
  {
    label: "Produción lechera",
    name: "_id",
    options: {
      filter: false,
      customBodyRender: (value) => {
        const r = list.find((e) => e._id === value);
        return (
          parseFloat(r.firstSample + r.secondSample + r.thirdSample).toFixed(
            2
          ) + ""
        );
      },
    },
  },
  {
    label: "Fecha registro",
    name: "controlDate",
    options: {
      filter: false,
      customBodyRender: (value) =>
        value && format(new Date(value), "yyyy-MM-dd"),
    },
  },
];
