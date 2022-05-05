import { format, isAfter, isBefore } from "date-fns";
import {
  categoryOptionsTest,
  sexDictionary,
  stateOptions,
} from "../../../constants";
import { getAgeInYears } from "../../../helpers/convertDate";
import { DatePicker } from "@material-ui/pickers";
import { Grid } from "@material-ui/core";

export const columns = [
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
        value ? getAgeInYears(new Date(value), new Date()) + " años" : null,
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
    name: "status",
    options: {
      customBodyRender: (value) => value.esLabel,
    },
  },
  // {
  //   label: "Categoría",
  //   name: "category",
  //   options: {
  //     filter: true,
  //     customBodyRender: (value) => categoryOptionsTest[value],
  //     //filterType: "checkbox",
  //     //filterOptions: {
  //     //  names: ["Reproductor", "No Reproductor"],
  //     //},
  //     //searchable: false,
  //     //customBodyRender: (value) =>
  //     //  value ? "Reproductor" : typeof value === "boolean" && "No Reproductor",
  //   },
  // },
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
