import {
  Grid,
  Typography,
  InputAdornment,
  Button,
  IconButton,
} from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import PropTypes from "prop-types";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import raceActions from "../../../redux/actions/race.actions";
import CheckboxFormik from "../../../components/Inputs/CheckboxFormik";
import { useStyles } from "../../../styles";
import { AddCircle, Close } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IdeasCloudApi from "../../../helpers/ideascloudApi";
import CustomPaper from "../../../components/CustomPaper";
import _ from "lodash";

const defaultInitValues = {
  identifier: "",
  name: "",
  active: true,
  value: 0,
  stock: 0,
  //geneticType: "EMBRYO",
  observation: "",
  //race1Id: racesList ? racesList[0]._id : "",
  race1Id: "",
  percentageRace1: 100,
  race2Id: "",
  percentageRace2: 0,
  race3Id: "",
  percentageRace3: 0,
  race4Id: "",
  percentageRace4: 0,
  images: null,
};
const GeneticStockForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  geneticType = "EMBRYO",
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const racesList = useSelector((state) =>
    state.race.list.sort((a, b) =>
      a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    )
  );
  const currentFarm = useSelector((state) => state.farm.current);
  const classes = useStyles();
  const [animalRace, setAnimalRace] = useState({
    A: { type: "1", percentage: "100%" },
  });
  const [errorPercentage, setErrorPercentage] = useState("");
  const letters = ["A", "B", "C", "D"];

  //const currentFarm = useSelector((state) => state.farm.current);
  const validationSchema = () =>
    yup.lazy((values) => {
      return yup.object({
        identifier: yup
          .string("Este campo no puedo ir vacio")
          .required("Este campo es requerido."),
        stock: yup
          .number("Ingrese solo números")
          .integer("Solo números enteros"),
        race1Id: yup
          .string("Ingresa raza.")
          .nullable(true)
          .required("Esta campo es requerido."),
      });
    });

  useEffect(() => {
    (!racesList || racesList.length === 0) && dispatch(raceActions.listRace());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        const arrayImages = [];
        console.log("ANTES");
        if (values.imageURL && values.imageURL.length !== 0) {
          for (let index = 0; index <= values.imageURL.length - 1; index++) {
            const response = await IdeasCloudApi.fetch("uploadImage", {
              farmId: currentFarm._id,
            });
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", values.imageURL[`${index}`].type);
            const requestOptions = {
              method: "PUT",
              headers: myHeaders,
              body: values.imageURL[`${index}`],
              redirect: "follow",
            };

            const iO = response.url.indexOf("?X");
            const newURL = response.url.substring(0, iO);

            await fetch(response.url, requestOptions).then((response) => {
              arrayImages.push(newURL);
            });
          }
        }
        await dispatch(
          geneticStockActions.createGenticStock({
            ...values,
            geneticType,
            images: arrayImages,
          })
        );
      }
      if (type === "update") {
        let finalArray = [];
        const arrayImages = [];

        if (values.imageURL && values.imageURL.length !== 0) {
          for (let index = 0; index <= values.imageURL.length - 1; index++) {
            const response = await IdeasCloudApi.fetch("uploadImage", {
              farmId: currentFarm._id,
            });
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", values.imageURL[`${index}`].type);
            const requestOptions = {
              method: "PUT",
              headers: myHeaders,
              body: values.imageURL[`${index}`],
              redirect: "follow",
            };

            const iO = response.url.indexOf("?X");
            const newURL = response.url.substring(0, iO);

            await fetch(response.url, requestOptions).then((response) => {
              arrayImages.push(newURL);
            });
          }
        }

        if (values.images && values.images.length !== 0) {
          finalArray = _.concat(values.images, arrayImages);
        } else {
          finalArray = arrayImages;
        }

        await dispatch(
          geneticStockActions.updateGeneticStock({
            ...values,
            geneticType,
            images: finalArray,
          })
        );
      }
      onCompleteSubmit();
    } catch {
      console.log("mal");
      actions.setSubmitting(false);
    }
  };

  const verifyPercentage = (index, val, values) => {
    let tot = 0;
    const p1 = index === 1 ? val : values.percentageRace1;
    const p2 = index === 2 ? val : values.percentageRace2;
    const p3 = index === 3 ? val : values.percentageRace3;
    const p4 = index === 4 ? val : values.percentageRace4;

    tot = parseFloat(p1) + parseFloat(p2) + parseFloat(p3) + parseFloat(p4);

    if (tot !== 100) {
      setErrorPercentage(
        "El porcentaje total debe ser 100%. Porfavor ajuste sus cantidades"
      );
    } else {
      setErrorPercentage("");
    }
  };

  const handleAddRace = () => {
    const races = { ...animalRace };
    if (letters[Object.keys(races).length]) {
      races[letters[Object.keys(races).length]] = {
        type: "1",
        percentage: "0%",
      };

      setAnimalRace(races);
    }
  };

  const handleRemoveRace = (id, index, values) => {
    const races = { ...animalRace };
    delete races[id];
    values[`percentageRace${index + 1}`] = 0;
    values[`race${index + 1}Id`] = "";
    setAnimalRace(races);
  };

  const fileData = (values) => {
    if (values.imageURL) {
      return (
        <Grid container justifyContent="center" item xs={8}>
          <h4>{values.imageURL.length} archivos seleccionados.</h4>
        </Grid>
      );
    } else {
      return (
        <Grid container justifyContent="center" item xs={8}>
          <h4> 0 archivos seleccionados.</h4>
        </Grid>
      );
    }
  };

  const deleteImage = (values = [], index, setField = () => {}) => {
    values.splice(index, 1);
    setField("images", values);
    // console.log(values[index]);
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {type === "create" && "Nuevo stock genético"}
                {type === "update" && "Editar stock genético"}
              </Typography>
            </Grid>
            <TextFieldFormik
              label="Cod. animal"
              name="identifier"
              disabled={type === "update"}
              onChange={props.handleChange}
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              label="Nombre"
              name="name"
              onChange={props.handleChange}
              xs={12}
              sm={8}
            />
          </Grid>
          <Grid container className={classes.form__border}>
            {Object.keys(animalRace).map((raceItem, index) => (
              <Grid
                item
                xs={12}
                container
                key={`race-option-${raceItem}`}
                spacing={1}
                className={classes.form__raceContainer}
              >
                <Grid item xs={12}>
                  <Typography
                    variant={"body2"}
                    gutterBottom
                    className={classes.subtitle}
                  >
                    {`Raza ${raceItem}`}
                  </Typography>
                </Grid>
                <Grid item container sm={8} xs={12}>
                  <SelectFieldFormik
                    name={`race${index + 1}Id`}
                    label="Raza"
                    options={racesList}
                    onChange={props.handleChange}
                  />
                </Grid>
                <Grid
                  item
                  container
                  sm={4}
                  xs={12}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Grid item xs={11}>
                    {/* <TextFieldFormik
                    xs={12}
                    name={`percentageRace${index + 1}`}
                    endAdornment={
                      <InputAdornment position="start">%</InputAdornment>
                    }
                    type="number"
                    label="Porcentaje"
                    style={{ textAlign: "end" }}
                    // type="number"
                    onChange={handleChange}
                  /> */}
                    <TextFieldFormik
                      xs={12}
                      name={`percentageRace${index + 1}`}
                      endAdornment={
                        <InputAdornment position="start">%</InputAdornment>
                      }
                      type="text"
                      label="Porcentaje"
                      style={{ textAlign: "end" }}
                      // type="number"
                      // onChange={handleChange}
                      onChange={(e) => {
                        const regex = /^\d+(.\d{0,2})?$/;
                        // let newValue = ''
                        const i = index;
                        // setFieldValue("percentageRace1", i + 1);
                        if (regex.test(e.target.value)) {
                          props.setFieldValue(
                            `percentageRace${i + 1}`,
                            e.target.value
                          );
                        }
                        verifyPercentage(i + 1, e.target.value, props.values);
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    {Boolean(index) && (
                      <DeleteIcon
                        color={"secondary"}
                        className={classes.form__raceContainer__deleteIcon}
                        onClick={() =>
                          handleRemoveRace(raceItem, index, props.values)
                        }
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid
              item
              xs={12}
              className={classes.form__raceContainer__errorMessage}
            >
              <Typography variant={"caption"} gutterBottom>
                {errorPercentage}
              </Typography>
            </Grid>
            <AddCircle
              color={"secondary"}
              className={classes.form__raceContainer__addBtn}
              onClick={handleAddRace}
            />
          </Grid>
          <Grid container spacing={1}>
            <TextFieldFormik
              label="Existencia"
              type="number"
              name="stock"
              disabled={type === "update"}
              onChange={props.handleChange}
              lg={4}
              sm={4}
              xs={12}
            ></TextFieldFormik>
            <TextFieldFormik
              label="Costo unidad"
              type="number"
              disabled={type === "update"}
              name="value"
              endAdornment={
                <InputAdornment position="start">
                  {currentFarm?.currency?.currencyAbbreviation}
                </InputAdornment>
              }
              onChange={props.handleChange}
              lg={4}
              sm={4}
              xs={12}
            ></TextFieldFormik>
            <TextFieldFormik
              name="total"
              label="Total"
              sm={4}
              xs={12}
              lg={4}
              endAdornment={
                <InputAdornment position="start">
                  {currentFarm?.currency?.currencyAbbreviation}
                </InputAdornment>
              }
              disabled
              value={(props.values?.value * props.values?.stock).toFixed(2)}
            />
            <TextFieldFormik
              label="Observación"
              type="text"
              name="observation"
              onChange={props.handleChange}
              multiline
              rows={3}
              xs={12}
            ></TextFieldFormik>
            <CheckboxFormik
              name="active"
              label="Activo"
              onChange={props.handleChange}
            />
            {type === "update" && (
              <Grid item container xs={12} spacing={1}>
                {props.values.images &&
                  props.values.images.length !== 0 &&
                  props.values.images.map((image, i) => (
                    <CustomPaper xs={4} key={i}>
                      <Grid container justifyContent="flex-end">
                        <Grid item xs={1}>
                          <IconButton
                            size="small"
                            onClick={() => {
                              deleteImage(
                                props.values.images,
                                i,
                                props.setFieldValue
                              );
                            }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <img
                        src={image}
                        alt={`img${i}`}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "150px",
                          display: "block",
                          left: "0",
                          right: "0",
                          top: "0",
                          bottom: "0",
                          margin: "auto",
                        }}
                        border="0"
                      />
                    </CustomPaper>
                  ))}
              </Grid>
            )}
            <Grid item xs={12} container>
              <Grid item xs={4} container alignItems="center">
                <Button
                  variant="contained"
                  component="label"
                  style={{ boxShadow: "none" }}
                >
                  Cargar Imagen
                  <input
                    type="file"
                    hidden
                    multiple
                    name="imageURL"
                    onChange={(event) => {
                      props.setFieldValue(
                        "imageURL",
                        event.currentTarget.files
                      );
                    }}
                  />
                </Button>
              </Grid>
              {fileData(props.values)}
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent={"flex-end"}
            style={{ gap: "0.5rem" }}
            xs={12}
          >
            {onClickCancelButton && (
              <Grid item xs={2}>
                <ButtonFormik
                  onClick={onClickCancelButton}
                  xs={2}
                  label="Cancelar"
                  type="button"
                />
              </Grid>
            )}
            <Grid item xs={2}>
              <ButtonFormik xs={2} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

GeneticStockForm.propTypes = {
  type: PropTypes.oneOf(["create", "update"]).isRequired,
  geneticType: PropTypes.oneOf(["EMBRYO", "SEMEN"]).isRequired,
  onClickCancelButton: PropTypes.func,
  initValues: PropTypes.object,
};

export default GeneticStockForm;
