import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import uiActions from "../../../redux/actions/ui.actions";
import { useStyles } from "../../../styles";

const AnimalBulkForm = () => {
  const classes = useStyles();
  const [csvFile, setCsvFile] = useState();
  const dispatch = useDispatch();

  const fileData = (csvFile) => {
    if (csvFile) {
      return (
        <div style={{ paddingLeft: "0.5rem" }}>
          <p>File Name: {csvFile.name}</p>
        </div>
      );
    } else {
      return (
        <div style={{ paddingLeft: "0.5rem" }}>
          <h4>Elija antes de presionar el botón Cargar</h4>
        </div>
      );
    }
  };
  return (
    <>
      <Typography variant={"subtitle1"}>Registro masivo</Typography>
      <Typography variant={"subtitle2"}>
        Para registro masivo de animales, <a href="#">descargue</a> el siguiente
        documento.
      </Typography>
      <Grid container spacing={1}>
        <Button
          component="label"
          className={classes.baseBtn}
          endIcon={false && <CircularProgress size={20} />}
          variant="contained"
        >
          Subir CSV
          <input
            accept=".csv"
            hidden
            name="csvFile"
            className={classes.fileInput}
            onChange={(e) => {
              if (e.currentTarget.files[0].type === "text/csv") {
                setCsvFile(e.currentTarget.files[0]);
              } else {
                dispatch(
                  uiActions.showSnackbar(
                    "El formato del archivo no es compatible",
                    "error",
                    4000
                  )
                );
              }
            }}
            type="file"
          />
        </Button>
        {fileData(csvFile)}
      </Grid>
    </>
  );
};

export default AnimalBulkForm;
