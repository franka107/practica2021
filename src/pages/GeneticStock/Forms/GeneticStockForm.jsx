import {
  Grid,
  Typography,
  InputAdornment,
  Button,
  IconButton,
} from "@material-ui/core";
import { FieldArray, Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import PropTypes from "prop-types";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import raceActions from "../../../redux/actions/race.actions";
import CheckboxFormik from "../../../components/Inputs/CheckboxFormik";
import { useStyles } from "../../AnimalControl/styles";
import { AddCircle, Close } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IdeasCloudApi from "../../../helpers/ideascloudApi";
import CustomPaper from "../../../components/CustomPaper";
import _ from "lodash";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";

const defaultInitValues = {
  identifier: "",
  name: "",
  active: true,
  date: new Date(),
  value: 0,
  stock: 0,
  //geneticType: "EMBRYO",
  observation: "",
  //race1Id: racesList ? racesList[0]._id : "",
  races: [{ raceId: "", percentage: null }],
  images: [],
};

/**
 * @component
 * @description Componente, formulario para crear o editar el registro del stock genetico
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

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
  const letters = ["A", "B", "C", "D"];

  const validationSchema = yup.object().shape({
    identifier: yup
      .string("Ingresa la identificacion del animal.")
      .required("Este campo es requerido."),
    name: yup.string("Ingresa el nombre del animal."),
    date: yup
      .date()
      .typeError("Ingresar una fecha")
      .max(new Date(), "No puedes ingresar una fecha futura")
      .required("Este campo es requerido."),
    stock: yup
      .number("Ingrese solo números")
      .integer("Solo números enteros")
      .required("Este campo es requerido."),
    value: yup
      .number("Ingrese solo números")
      .integer("Solo números enteros")
      .required("Este campo es requerido."),
    races: yup
      .array()
      .of(
        yup.object().shape({
          raceId: yup
            .string()
            .typeError("Selecciona una raza")
            .required("Campo requerido"), // these constraints take precedence
          percentage: yup
            .number()
            .typeError("Ingrese un porcentaje")
            .min(0, "El mínimo número a ingresar es 0")
            .max(100, "El máximo número a ingresar es 100")
            .required("Campo requerido"), // these constraints take precedence
        })
      )
      .test(
        "races",
        "La suma de las razas tiene que ser 100%",
        (values) =>
          values &&
          values.reduce((acc, curr) => acc + curr.percentage, 0) === 100
      ),
  });

  useEffect(() => {
    (!racesList || racesList.length === 0) && dispatch(raceActions.listRace());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      actions.setSubmitting(false);
    }
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
                {type === "create" &&
                  `Nuevo stock genético - ${
                    geneticType === "EMBRYO" ? "EMBRIÓN" : "SEMEN"
                  }`}
                {type === "update" &&
                  `Editar stock genético - ${
                    geneticType === "EMBRYO" ? "EMBRIÓN" : "SEMEN"
                  }`}
              </Typography>
            </Grid>
            <TextFieldFormik
              required
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
            <DatePickerFieldFormik
              required
              label="Fecha"
              onChange={props.handleChange}
              name="date"
              xs={12}
            />
          </Grid>
          <Grid container spacing={1} className={classes.formStyle}>
            <Grid item xs={12}>
              <Typography variant={"subtitle2"}>Raza</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} container className={classes.border}>
            <FieldArray
              name="races"
              render={(arrayHelpers) => (
                <>
                  {props.values.races &&
                    props.values.races.map((race, index) => (
                      <Grid
                        item
                        xs={12}
                        container
                        key={`race-option-${index}`}
                        spacing={1}
                        className={classes.raceContainer}
                      >
                        <Grid item xs={12}>
                          <Typography
                            variant={"body2"}
                            gutterBottom
                            className={classes.subtitle}
                          >
                            {`Raza ${letters[index]}`}
                          </Typography>
                        </Grid>
                        <Grid item container sm={8} xs={12}>
                          <SelectFieldFormik
                            required
                            name={`races.${index}.raceId`}
                            label="Raza"
                            options={racesList}
                            disabled={type === "create" ? false : true}
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
                            <TextFieldFormik
                              required
                              xs={12}
                              name={`races.${index}.percentage`}
                              endAdornment={
                                <InputAdornment position="start">
                                  %
                                </InputAdornment>
                              }
                              type="number"
                              disabled={type === "create" ? false : true}
                              label="Porcentaje"
                              style={{ textAlign: "end" }}
                              // type="number"
                              onChange={props.handleChange}
                            />
                          </Grid>
                          <Grid item xs={1}>
                            {Boolean(index) && (
                              <DeleteIcon
                                color={"error"}
                                disabled={type === "create" ? false : true}
                                className={classes.deleteIcon}
                                onClick={() => arrayHelpers.remove(index)}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  <Grid item xs={12} className={classes.errorMessage}>
                    <Typography variant={"caption"} gutterBottom>
                      {props.errors.races &&
                      typeof props.errors.races === "string"
                        ? props.errors.races
                        : ""}
                    </Typography>
                  </Grid>
                  {type === "create" &&
                    props.values.races &&
                    props.values.races.length <= 3 && (
                      <AddCircle
                        color={"secondary"}
                        disabled={type === "create" ? false : true}
                        className={classes.addBtn}
                        onClick={() => {
                          console.log(props.errors);
                          arrayHelpers.push({ raceId: "", percentage: null });
                        }}
                      />
                    )}
                </>
              )}
            />
          </Grid>
          <Grid container spacing={1}>
            <TextFieldFormik
              required
              label="Stock"
              type="number"
              name="stock"
              disabled={type === "update"}
              onChange={props.handleChange}
              lg={4}
              sm={4}
              xs={12}
            ></TextFieldFormik>
            <TextFieldFormik
              required
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
