import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import AnimalActions from "../../../redux/actions/animal.actions";
import raceActions from "../../../redux/actions/race.actions";
import uiActions from "../../../redux/actions/ui.actions";
import WeightActions from "../../../redux/actions/weight.actions";
import { useStyles } from "../../../styles";

const AnimalBulkForm = ({ onClickCancelButton }) => {
  const classes = useStyles();
  const [csvFile, setCsvFile] = useState();
  const dispatch = useDispatch();
  const raceList = useSelector((state) => state.race.list);

  useEffect(() => {
    if (!raceList || raceList.length === 0) {
      dispatch(raceActions.listRace());
    }
  }, []);

  const handleSubmit = () => {
    if (csvFile) {
      console.log(csvFile);

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const data = csvToArray(text);
        console.log(data);

        const getRaceId = (raceName) => {
          const raceFinded = raceList.find(
            (raceObject) => raceObject.name === raceName
          );
          if (raceFinded) {
            return raceFinded._id;
          } else {
            return null;
          }
        };
        data.forEach(async (animal) => {
          /**
           * Validacion dinamíca de razas
           */
          if (animal.race1) {
            animal.race1Id = getRaceId(animal.race1);
          }
          if (animal.race2) {
            animal.race2Id = getRaceId(animal.race2);
          }
          if (animal.race3) {
            animal.race3Id = getRaceId(animal.race3);
          }
          if (animal.race4) {
            animal.race4Id = getRaceId(animal.race4);
          }
          const animalCreated = await dispatch(AnimalActions.create(animal));
          console.log(animal);
          /**
           * Creacion de registro de pesos si hay informacion
           */
          if (animal.lastWeight && animal.lastWeightDate) {
            const weightData = {
              animalId: animalCreated._id,
              controlDate: animal.lastWeightDate,
              controlType: "BALANCE",
              weight: animal.lastWeight,
              observation: "",
            };
            dispatch(WeightActions.create(weightData));
          }
        });
      };

      reader.readAsText(csvFile);
    } else {
      dispatch(
        uiActions.showSnackbar("No has subido ningun archivo", "warning")
      );
    }
  };
  const csvToArray = (str, delimiter = ",") => {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
  };

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
              if (e.currentTarget.files[0]?.type === "text/csv") {
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
      <Grid
        container
        justifyContent={"flex-end"}
        style={{ gap: "0.5rem" }}
        xs={12}
      >
        <Grid item xs={2}>
          <ButtonFormik
            onClick={onClickCancelButton}
            xs={2}
            label="Cancelar"
            type="button"
          />
        </Grid>
        <Grid item xs={2}>
          <ButtonFormik
            onClick={handleSubmit}
            xs={2}
            label="Guardar"
            type="submit"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AnimalBulkForm;
