import { IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { format } from "date-fns";
import { movementOptions } from "../../../constants";
import { ROUTES_DICT } from "../../../routes/routesDict";

const actionColumn = (location, history, geneticType, movements) => ({
  label: "Acciones",
  name: "actions",
  options: {
    searchable: false,
    filter: false,
    sort: false,
    customBodyRenderLite: (dataIndex, rowIndex) => {
      return (
        <>
          <IconButton
            style={{ color: "#C25560" }}
            size="small"
            aria-label="edit"
            onClick={() =>
              history.push({
                pathname: ROUTES_DICT.movementsUpdate
                  .replace(":geneticType", geneticType)
                  .replace(":_id", movements[dataIndex]._id),
                background: location,
              })
            }
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            style={{ color: "#C25560" }}
            size="small"
            aria-label="delete"
            onClick={() => {}}
          >
            <Delete fontSize="small" />
          </IconButton>
        </>
      );
    },
  },
});

export const columns = (location, history, geneticType, movements) => [
  {
    label: "Stock genético",
    name: "geneticStock",
    options: {
      customBodyRender: (value) => value.identifier,
    },
  },
  {
    label: "Movimiento",
    name: "movementType",
    options: {
      customBodyRender: (value) => movementOptions[value],
      searchable: false,
    },
  },
  {
    label: "Fecha de transacción",
    name: "date",
    options: {
      filter: false,
      searchable: false,
      customBodyRender: (value) =>
        value && format(new Date(value), "yyyy-MM-dd"),
    },
  },
  {
    label: "Cantidad",
    name: "quantity",
    options: {
      searchable: false,
      filter: false,
    },
  },
  {
    label: "Valor unitario",
    name: "unitValue",
    options: {
      searchable: false,
      filter: false,
      customBodyRender: (value) => value && value.toFixed(2),
    },
  },
  {
    label: "Total",
    name: "total",
    options: {
      filter: false,
      searchable: false,
      customBodyRender: (value) => value && value.toFixed(2),
    },
  },
  {
    label: "A quien",
    name: "toWho",
    options: {
      filter: true,
      filterType: "textField",
    },
  },
  //actionColumn(location, history, geneticType, movements),
];
