import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { Check, Error } from "@material-ui/icons";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import AnimalActions from "../../../redux/actions/animal.actions";
import raceActions from "../../../redux/actions/race.actions";
import uiActions from "../../../redux/actions/ui.actions";
import WeightActions from "../../../redux/actions/weight.actions";
import { useStyles } from "../../../styles";
import * as XLSX from "xlsx";

/**
 * @component
 * @description Componente, formulario para subida de datos masivos
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const LinearProgressWithLabel = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

const AnimalBulkForm = ({ onClickCancelButton }) => {
  const classes = useStyles();
  const [csvFile, setCsvFile] = useState();
  const dispatch = useDispatch();
  const raceList = useSelector((state) => state.race.list);
  const [animalListUploadInfo, setAnimalListUploadInfo] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [csvListLength, setCsvListLength] = useState(0);
  const [animalSucess, setAnimalSucess] = useState(0);
  const [animalError, setAnimalError] = useState(0);
  useEffect(() => {
    if (!raceList || raceList.length === 0) {
      dispatch(raceActions.listRace());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDate = (dateString) => {
    const dateParts = dateString.split("/");
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject;
  };

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

  const handleSubmit = () => {
    if (csvFile) {
      setAnimalListUploadInfo([]);
      setIsUploading(true);
      setAnimalSucess(0);
      setAnimalError(0);
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = (e) => {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
        let worksheets = {};
        for (const sheetName of wb.SheetNames) {
          worksheets[sheetName] = XLSX.utils.sheet_to_json(
            wb.Sheets[sheetName]
          );
        }
        setCsvListLength(worksheets["Worksheet"].length);
        // console.log("porfin", worksheets["Worksheet"].length);
        let count = 1;
        let errorUpload = 0;
        let successUpload = 0;
        worksheets["Worksheet"].map(async (e) => {
          let raceArray = [];
          for (let index = 1; index <= 4; index++) {
            const race =
              e[`race/${index}/name`] && e[`race/${index}/percentage`]
                ? {
                    raceId: getRaceId(e[`race/${index}/name`]),
                    percentage: e[`race/${index}/percentage`],
                  }
                : "";
            if (typeof race === "object") {
              raceArray.push(race);
            }
          }

          const animal = {
            ...e,
            identifier: `${e.identifier}`,
            fatherRef: e.fatherRef ? e.fatherRef : "",
            birthDate: getDate(e.birthDate),
            herdDate: getDate(e.herdDate),
            motherRef: e.motherRef ? e.motherRef : "",
            registerNumber: e.registerNumber
              ? e.ButtonFormikregisterNumber
              : "",
            pregnantDate: null,
            color: e.color ? e.color : "",
            images: [],
            races: raceArray,
          };

          try {
            const animalCreated = await dispatch(AnimalActions.create(animal));
            console.log(count, "animalCreated", animalCreated);
            setAnimalListUploadInfo((oldArray) => [...oldArray, animalCreated]);
            /**
             * Creacion de registro de pesos si hay informacion
             */
            successUpload = successUpload + 1;
            setAnimalSucess(successUpload);
          } catch (e) {
            setAnimalListUploadInfo((oldArray) => [...oldArray, animal]);
            errorUpload = errorUpload + 1;
            setAnimalError(errorUpload);
            console.log("error", animalListUploadInfo, errorUpload, e);
          }
        });
      };

      if (rABS) reader.readAsBinaryString(csvFile);
      else reader.readAsArrayBuffer(csvFile);
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
        <>
          {/* <div style={{ paddingLeft: "0.5rem" }}>
            <h4>Elija antes de presionar el botón Cargar</h4>
          </div> */}
          <div style={{ paddingLeft: "0.5rem" }}>
            <h4>Elija antes de presionar el botón Cargar</h4>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <Typography variant={"subtitle1"}>Registro masivo</Typography>
      {/* <Typography variant={"subtitle2"}>
        Para registro masivo de animales,{" "}
        <a href="https://contigo-files.s3.amazonaws.com/static/ExampleData+-+Sheet1.csv">
          descargue
        </a>{" "}
        el siguiente documento.
      </Typography> */}
      <Typography variant={"subtitle2"}>
        Para descargar el modelo de carga masiva presione{" "}
        <a href="https://contigo-animal-bulk.s3.us-east-2.amazonaws.com/Bulk+Upload+Example.xlsx">
          <strong>AQUI</strong>
        </a>
      </Typography>
      {/* <Typography variant={"subtitle2"}>
        Recuerda que el el formato del archivo debe de ser .CSV
      </Typography> */}
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
              console.log(e.currentTarget.files[0]);
              if (
                e.currentTarget.files[0]?.type === "text/csv" ||
                e.currentTarget.files[0]?.type === "application/vnd.ms-excel" ||
                e.currentTarget.files[0]?.type ===
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              ) {
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
      <Grid container item xs={12} spacing={1}>
        {isUploading && (
          <>
            <Grid item xs={12}>
              <LinearProgressWithLabel
                value={(animalListUploadInfo.length / csvListLength) * 100}
              />
              {`${animalSucess}/${csvListLength} registros subidos`}
            </Grid>

            <Grid
              container
              item
              xs={12}
              spacing={1}
              style={{ marginTop: "0.5rem" }}
            >
              <Typography variant={"subtitle2"}>
                {animalError} registros no subidos
              </Typography>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                className={classes.chipContainer}
              >
                {animalListUploadInfo.map((animal, index) => (
                  <Grid item xs={12} key={index}>
                    {!animal?._id && (
                      <Chip
                        icon={
                          animal?._id ? (
                            <Check className={`${classes.largeChip}__icon`} />
                          ) : (
                            <Error className={`${classes.largeChip}__icon`} />
                          )
                        }
                        className={clsx(
                          classes.largeChip,
                          animal?._id
                            ? `${classes.largeChip}--success`
                            : `${classes.largeChip}--danger`
                        )}
                        label={
                          animal?._id
                            ? `${animal.identifier}: Exitoso`
                            : `${animal.identifier}: Error al momento de subir`
                        }
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </>
        )}
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
            label={!isUploading ? "Cancelar" : "Cerrar"}
            type="button"
          />
        </Grid>
        {!isUploading && (
          <Grid item xs={2}>
            <ButtonFormik
              onClick={handleSubmit}
              xs={2}
              label="Guardar"
              type="submit"
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AnimalBulkForm;
