import { alpha, createTheme, ThemeProvider } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

/**
 * @param {MaterialTableProps} props
 *
 */
function CustomMuiTable({ options, ...props }) {
  const theme = useTheme();
  const overrideTheme = createTheme({
    overrides: {
      MuiButton: {
        root: {
          textTransform: "none",
          textAlign: "center",
          fontSize: 15,
          fontWeight: 600,
          "&:hover": {
            webkitBoxShadow: "0 0 0 30px blue inset !important",
            opacity: 0.5,
          },
        },
      },
      MUIDataTableFilter: {
        resetLink: {
          backgroundColor: "rgb(0, 117, 201)",
          color: "white",
          "&:hover": {
            webkitBoxShadow: "0 0 0 30px blue inset !important",
            backgroundColor: "rgb(0, 117, 201)",
            opacity: 0.5,
          },
        },
      },
      MUIDataTableHeadCell: {
        toolButton: {},
      },
      MuiSwitch: {
        root: {
          color: "#00A796",
          "&$checked": {
            color: "#00A796 !important",
          },
          checked: {
            color: "#00A796  !important",
          },
        },
        switchBase: {},
        checked: {
          color: "#00A796  !important",
        },
        colorSecondary: {
          color: "#00A796 !important",
          "&:hover": {
            backgroundColor: alpha(
              "#00A796",
              theme.palette.action.hoverOpacity
            ),
          },
        },

        track: {
          backgroundColor: "#00A796 !important",
        },
      },
    },
    typography: theme.typography,
  });

  const baseOptions = {
    textLabels: {
      pagination: {
        rowsPerPage: "Registros por página:",
        displayRows: "de",
        next: "Anterior página",
        previous: "Siguiente página",
      },
      body: {
        noMatch: "No se encontraron registros",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "LIMPIAR",
      },
    },
  };
  return <MUIDataTable options={{ ...baseOptions, ...options }} {...props} />;
}

export default CustomMuiTable;
