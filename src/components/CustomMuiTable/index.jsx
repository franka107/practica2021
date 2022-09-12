// import { alpha, createTheme } from "@material-ui/core";
// import { useTheme } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

/**
 * @param {MaterialTableProps} props
 *
 */
function CustomMuiTable({ options, ...props }) {
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
    <div>
      <MUIDataTable options={{ ...baseOptions, ...options }} {...props} />
    </div>
  );
}

export default CustomMuiTable;
