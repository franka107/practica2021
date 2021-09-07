import { IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

const actionColumn = {
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
            onClick={() => {}}
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
};

export const columns = [
  {
    label: "Movimiento",
    name: "movementType",
    options: {
      filter: false,
    },
  },
  {
    label: "Fecha de transacción",
    name: "date",
    options: {
      filter: false,
    },
  },
  {
    label: "Cantidad",
    name: "quantity",
    options: {
      filter: false,
    },
  },
  {
    label: "Valor unitario",
    name: "unitValue",
    options: {
      filter: false,
    },
  },
  {
    label: "A quien",
    name: "toWho",
    options: {
      filter: false,
    },
  },
  actionColumn,
];
