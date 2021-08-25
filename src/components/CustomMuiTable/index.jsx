import { createTheme, ThemeProvider } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import MUIDataTable, { MUIDAtaTableProps } from "mui-datatables";

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
        fixedHeader: {
          backgroundColor: "rgb(250, 250, 250)",
          color: "rgb(0, 117, 201)",
        },
        data: {
          color: "rgb(0, 117, 201)",
          fontWeight: "normal",
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
  return (
    <ThemeProvider theme={overrideTheme}>
      <MUIDataTable options={{ ...baseOptions, ...options }} {...props} />
    </ThemeProvider>
  );
}

export default CustomMuiTable;
