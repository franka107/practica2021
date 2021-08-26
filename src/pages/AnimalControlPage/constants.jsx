import {
  format,
  formatISO,
  isAfter,
  isBefore,
  parse,
  parseISO,
} from "date-fns";
import { format as formatFns, utcToZonedTime } from "date-fns-tz";

import { sexDictionary, stateDictionary } from "../../constants";
import { getAgeInYears } from "../../helpers/convertDate";
import { DatePicker } from "@material-ui/pickers";
import { Grid } from "@material-ui/core";

export const columns = [
  {
    id: 1,
    title: "Identificación del animal",
    key: "identifier",
    color: true,
  },
  {
    id: 2,
    title: "Nombre",
    key: "name",
    color: true,
  },
  {
    id: 3,
    title: "Fecha de nacimiento",
    color: true,
    key: "birthDate",
  },
  {
    id: 4,
    title: "Sexo",
    color: true,
    key: "gender",
  },
  {
    id: 5,
    title: "Estado",
    color: false,
    key: "reproductiveStatus",
  },
  {
    id: 6,
    title: "Estadísticas",
    key: "isReproductive",
  },
  {
    id: 7,
    title: "Fecha registro",
    color: true,
    key: "herdDate",
  },
];

export const cowsDataExample = [
  {
    id: "1",
    identifier: "ARE01",
    birthDate: "2021-07-08",
    name: "Lola",
    gender: "FE",
    isReproductive: false,
    reproductiveStatus: "VAC",
    herdDate: "2021-07-15",
    __typename: "AnimalType",
    outstanding: false,
  },
  {
    id: "2",
    identifier: "ARE02",
    birthDate: "2021-07-08",
    name: "Lola",
    gender: "FE",
    isReproductive: false,
    reproductiveStatus: "VAC",
    herdDate: "2021-07-15",
    __typename: "AnimalType",
    outstanding: true,
  },
];

export const columnsToCustomMaterialTable = [
  {
    id: 1,
    title: "Identificación del animal",
    field: "identifier",
    color: true,
  },
  {
    id: 2,
    title: "Nombre",
    field: "name",
    color: true,
  },
  {
    id: 3,
    title: "Edad",
    color: true,
    field: "birthDate",
  },
  {
    id: 4,
    title: "Sexo",
    color: true,
    field: "gender",
  },
  {
    id: 5,
    title: "Estado",
    color: false,
    field: "reproductiveStatus",
  },
  {
    id: 6,
    title: "Estadísticas",
    field: "isReproductive",
  },
  {
    id: 7,
    title: "Fecha registro",
    color: true,
    field: "herdDate",
  },
];

export const columnsToMuiTable = [
  {
    label: "ID. del animal",
    name: "identifier",
    options: {
      filter: false,
    },
  },
  {
    label: "Nombre",
    name: "name",
    customBodyRender: (value) => value,
    options: {
      filter: false,
    },
  },
  {
    label: "Edad",
    name: "birthDate",
    options: {
      searchable: false,
      filter: false,
      customBodyRender: (value) =>
        getAgeInYears(new Date(value), new Date()) + " años",
    },
  },
  {
    label: "Sexo",
    name: "gender",
    options: {
      searchable: false,
      filterOptions: {
        names: ["Hembra", "Macho"],
      },
      customBodyRender: (value) => sexDictionary[value],
    },
  },
  {
    label: "Estado",
    name: "reproductiveStatus",
    options: {
      filterOptions: {
        names: ["Preñada", "Vacía"],
      },
      searchable: false,
      customBodyRender: (value) => stateDictionary[value],
    },
  },
  {
    label: "Categoría",
    name: "isReproductive",
    options: {
      filter: true,
      filterType: "checkbox",
      filterOptions: {
        names: ["Reproductor", "No Reproductor"],
      },
      searchable: false,
      customBodyRender: (value) =>
        value ? "Reproductor" : typeof value === "boolean" && "No Reproductor",
    },
  },
  {
    label: "Entrada hato",
    name: "herdDate",
    options: {
      searchable: false,
      customBodyRender: (value) => {
        // console.log(`value ${value}`);
        // console.log(`format-value ${format(new Date(value), "yyyy-MM-dd")}`);
        // console.log(
        //   `format-value with formatISO ${formatISO(new Date(value), {
        //     representation: "date",
        //   })}`
        // );
        // const peruDate = utcToZonedTime(value, "America/Lima");
        // console.log(
        //   `date-fns-tz ${formatFns(new Date(value), "yyyy-MM-dd", {
        //     timeZone: "America/Lima",
        //   })}`
        // );
        return value ? format(new Date(value), "yyyy-MM-dd") : "-";
      },
      filterType: "custom",
      customFilterListOptions: {
        render: (v) => {
          if (v[0] && v[1]) {
            return `Desde: ${format(v[0], "yyyy-MM-dd")}, Hasta ${format(
              v[1],
              "yyyy-MM-dd"
            )}`;
          } else if (v[0]) {
            return `Desde: ${format(v[0], "yyyy-MM-dd")}`;
          } else if (v[1]) {
            return `Hast: ${format(v[1], "yyyy-MM-dd")}`;
          }
        },
        update: (filterList, filterPos, index) => {
          if (filterPos === 0) {
            filterList[index].splice(filterPos, 1, "");
          } else if (filterPos === 1) {
            filterList[index].splice(filterPos, 1);
          } else if (filterPos === -1) {
            filterList[index] = [];
          }
          return filterList;
        },
      },
      filterOptions: {
        names: [],
        logic(herdDate, filters) {
          if (filters[0] && filters[1]) {
            return (
              isBefore(new Date(herdDate), new Date(filters[0])) ||
              isAfter(new Date(herdDate), new Date(filters[1]))
            );
          } else if (filters[0]) {
            return isBefore(new Date(herdDate), new Date(filters[0]));
          } else if (filters[1]) {
            return isAfter(new Date(herdDate), new Date(filters[1]));
          }
          return false;
        },
        display: (filterList, onChange, index, column) => {
          return (
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <DatePicker
                  value={filterList[index][0]}
                  onChange={(date) => {
                    filterList[index][0] = date;
                    onChange(filterList[index], index, column);
                  }}
                  label="Desde"
                  clearable
                  format="yyyy-MM-dd"
                  clearLabel="LIMPIAR"
                  cancelLabel="CANCELAR"
                />
              </Grid>
              {/* */}
              <Grid item xs={6}>
                <DatePicker
                  value={filterList[index][1]}
                  onChange={(date) => {
                    filterList[index][1] = date;
                    onChange(filterList[index], index, column);
                  }}
                  label="Hasta"
                  clearable
                  format="yyyy-MM-dd"
                  clearLabel="LIMPIAR"
                  cancelLabel="CANCELAR"
                />
              </Grid>
            </Grid>
          );
        },
      },
    },
  },
];
