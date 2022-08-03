import { Box, Grid, InputAdornment, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import PropTypes from "prop-types";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import TimePickerFormik from "../../../components/Inputs/TimePickerFormik";
import AutocompleteFieldFormik from "../../../components/Inputs/AutocompleteFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch, shallowEqual } from "react-redux";
import serviceActions from "../../../redux/actions/service.actions";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import {
  sexOptions,
  estadiosOptions,
  qualityEmbryoOptions,
  conditionOptions,
  typeEmbryonOptions,
} from "../../../constants";
import AnimalActions from "../../../redux/actions/animal.actions";
import CollaboratorActions from "../../../redux/actions/collaborator.actions";
import { useParams } from "react-router";
import MovementActions from "../../../redux/actions/movement.actions";
import { differenceInMonths, format } from "date-fns";
import CustomModal, { customModal } from "../../../components/Modal";
import CustomInfoIcon from "../../../components/CustomInfoIcon";

const defaultInitValues = {
  agribusinessId: "",
  animalId: "",
  name: "",
  serviceDate: new Date(),
  serviceTime: new Date(),
  serviceType: "EM_TR",
  geneticStockId: null,
  embryoName: "",
  embryoType: "",
  embryoCondition: "",
  embryoPhase: "",
  embryoQuality: null,
  quantity: 1,
  embryoGender: "",
  ovaryRight: "",
  ovaryLeft: "",
  userId: null,
  observation: "",
};

const validationSchema = (embryoList, animalList) =>
  yup.lazy((values) =>
    yup.object({
      animalId: yup
        .string()
        .typeError("Ingresa una vaca")
        .required("Esta campo es requerido."),
      serviceDate: yup
        .date()
        .max(new Date(), "No puedes ingresar una fecha futura")
        .when("animalId", {
          is: (value) => animalList.some((e) => e._id === value),
          then: (rule) =>
            rule.min(
              format(
                new Date(
                  animalList.find((e) => e._id === values.animalId).herdDate
                ),
                "yyyy-MM-dd"
              ),
              "La fecha del servicio debe ser mayor a la fecha de entrada de hato."
            ),
        }),
      serviceType: yup.string().required("Esta campo es requerido."),
      geneticStockId: yup
        .string()
        .typeError("Debes ingresar un embrion")
        .nullable(true)
        .when("serviceType", {
          is: (value) => value === "EM_TR",
          then: (rule) =>
            rule.nullable(false).required("Este campo es requerido"),
        }),
      embryoType: yup
        .string()
        .typeError("Debes ingresar un tipo de embrión")
        .nullable(true)
        .when("serviceType", {
          is: (value) => value === "EM_TR",
          then: (rule) =>
            rule.nullable(false).required("Este campo es requerido"),
        }),
      embryoPhase: yup
        .string()
        .typeError("Debes ingresar un estadío")
        .nullable(true)
        .when("serviceType", {
          is: (value) => value === "EM_TR",
          then: (rule) =>
            rule.nullable(false).required("Este campo es requerido"),
        }),
      embryoCondition: yup
        .string()
        .typeError("Este campo no puedo ir vacio")
        .nullable(true)
        .when("serviceType", {
          is: (value) => value === "EM_TR",
          then: (rule) =>
            rule.nullable(false).required("Este campo es requerido"),
        }),
      embryoGender: yup
        .string()
        .typeError("Debes seleccionar un sexo")
        .nullable(true)
        .when("serviceType", {
          is: (value) => value === "EM_TR",
          then: (rule) =>
            rule.nullable(false).required("Este campo es requerido"),
        }),
      embryoQuality: yup
        .number()
        .typeError("Este campo no puedo ir vacio")
        .required("Este campo es requerido"),
      userId: yup
        .string()
        .typeError("Debes ingresar un transferencista")
        .nullable(true)
        .when("serviceType", {
          is: (value) => value === "EM_TR",
          then: (rule) =>
            rule.nullable(false).required("Este campo es requerido"),
        }),
      quantity: yup
        .number()
        .integer("Solo números enteros")
        .min(1, "La cantidad debe ser mayor a 1")
        .max(
          embryoList.find((e) => e._id === values.geneticStockId)?.stock || 1,
          ({ max }) => `La cantidad debe ser menor o igual a ${max}`
        )
        .required("Este campo es requerido"),
    })
  );

const EmbryoTransferForm = ({
  initValues = defaultInitValues,
  type = "create",
  hideAnimal = false,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const params = useParams();

  const { current: currentAgribusiness } = useSelector(
    (state) => state.agribusiness
  );
  const isBreeding = useSelector(
    (state) => state.agribusiness.current.isBreeding
  );

  const femaleAnimals = useSelector(
    (state) =>
      state.animal.list.filter(
        (e) => e.gender === "FEMALE" && !e.isPregnant && !e.isServed
      ),
    shallowEqual
  );
  const listEmbryo = useSelector(
    (state) =>
      state.geneticStock.list.filter(
        (e) => e.active && e.geneticType === "EMBRYO"
      ),
    shallowEqual
  );
  const listCollaborator = useSelector((state) => state.collaborator.list);

  useEffect(() => {
    if (!listCollaborator || listCollaborator.length === 0) {
      dispatch(CollaboratorActions.list());
    }
    dispatch(serviceActions.listByAgribusiness());

    dispatch(AnimalActions.list());

    dispatch(
      geneticStockActions.listGeneticStockByAgribusiness({
        geneticType: "EMBRYO",
      })
    );
    if (hideAnimal) {
      initValues.animalId = params._id;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const preSubmit = (values, actions) => {
    if (type === "create") {
      if (!femaleAnimals.some((e) => e._id === values.animalId)) {
        customModal({
          title: "Advertencia",
          message: "El identificador de la vaca que ingreso no existe.",
          textOk: null,
          textCancel: "OK",
          onSubmit: () => {},
        });
        return;
      }
      if (!listEmbryo.some((e) => e._id === values.geneticStockId)) {
        customModal({
          title: "Advertencia",
          message: "El embrión que ingreso no existe.",
          textOk: null,
          textCancel: "OK",
          onSubmit: () => {},
        });
        return;
      }
      if (!listCollaborator.some((e) => e._id === values.userId)) {
        customModal({
          title: "Advertencia",
          message: "El transferencista ingreso no existe.",
          textOk: null,
          textCancel: "OK",
          onSubmit: () => {},
        });
        return;
      }
      if (
        differenceInMonths(
          new Date(values.serviceDate),
          new Date(
            femaleAnimals.find((e) => e._id === values.animalId)?.birthDate
          )
        ) < isBreeding
      ) {
        customModal({
          title: "Advertencia",
          message:
            "Se está sirviendo un animal muy joven.\n¿Está seguro de querer continuar?",
          textOk: "OK",
          textCancel: "Cancelar",
          onSubmit: () => onSubmit(values, actions),
        });
        return;
      }
    }
    onSubmit(values, actions);
  };

  const onSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        values.agribusinessId = currentAgribusiness._id;
        await dispatch(serviceActions.create(values));
      }
      if (type === "update") {
        await dispatch(serviceActions.update(values));
      }
      await dispatch(serviceActions.listByAgribusiness());
      if (hideAnimal) {
        await dispatch(AnimalActions.get({ _id: params._id }));
      }
      await dispatch(geneticStockActions.listGeneticStockByAgribusiness());
      await dispatch(MovementActions.list());
      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initValues}
        validationSchema={validationSchema(listEmbryo, femaleAnimals)}
        onSubmit={preSubmit}
        enableReinitialize
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  {type === "create" && "Registrar servicio"}
                  {type === "update" && "Editar servicio"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  Información de Servicio
                </Typography>
              </Grid>
              {!hideAnimal && (
                <>
                  <AutocompleteFieldFormik
                    startAdornment={
                      <InputAdornment position="start" style={{ margin: 0 }}>
                        <CustomInfoIcon
                          title={
                            <>
                              Genero = Hembra <br />
                              Preñada = No <br />
                              Servida = No
                            </>
                          }
                          placement="bottom"
                        />
                        {/* <Info></Info> */}
                      </InputAdornment>
                    }
                    required
                    options={femaleAnimals}
                    name="animalId"
                    label="Identificación de hembra"
                    onChange={props.handleChange}
                    defaultValue={
                      type === "create" ? null : props.values.animal
                    }
                    disabled={type === "create" ? false : true}
                    xs={12}
                    sm={6}
                  />
                  <TextFieldFormik
                    onChange={props.handleChange}
                    name="name"
                    label="Nombre"
                    disabled
                    xs={12}
                    sm={6}
                    value={
                      props.values.animalId && femaleAnimals
                        ? femaleAnimals.find(
                            (e) => e._id === props.values.animalId
                          )?.name
                        : ""
                    }
                  />
                </>
              )}
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      component="div"
                      sx={{
                        display: { xs: "none", sm: "block", md: "block" },
                      }}
                    >
                      <DatePickerFieldFormik
                        validate={false}
                        required
                        label="Fecha"
                        onChange={props.handleChange}
                        name="serviceDate"
                        xs={12}
                      />
                    </Box>
                    <Box
                      component="div"
                      sx={{
                        display: { xs: "block", sm: "none" },
                      }}
                    >
                      <DatePickerFieldFormik
                        required
                        label="Fecha"
                        onChange={props.handleChange}
                        name="serviceDate"
                        xs={12}
                      />
                    </Box>
                  </Grid>
                  <TimePickerFormik
                    label="Hora"
                    onChange={props.handleChange}
                    name="serviceTime"
                    xs={12}
                    sm={6}
                  />
                </Grid>

                {props.errors && props.errors.serviceDate && (
                  <Box
                    component="div"
                    sx={{ display: { xs: "none", sm: "block", md: "block" } }}
                  >
                    <p
                      style={{
                        color: "#f44336",
                        fontSize: "10.8px",
                        marginTop: "3px",
                        marginRight: "14px",
                        marginLeft: "14px",
                        marginBottom: "0px",
                        fontFamily:
                          "Spartan, Century Gothic, Open Sans, Roboto ",
                      }}
                    >
                      {props.errors.serviceDate}
                    </p>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Embrión</Typography>
              </Grid>
              <AutocompleteFieldFormik
                required
                defaultValue={
                  type === "create" ? null : props.values.geneticStock
                }
                onChange={props.handleChange}
                xs={12}
                sm={4}
                name="geneticStockId"
                label="Cód."
                options={listEmbryo}
                disabled={type === "create" ? false : true}
              />
              <TextFieldFormik
                onChange={props.handleChange}
                name="name"
                label="Nom. embrión"
                disabled
                xs={12}
                sm={4}
                value={
                  props.values.geneticStockId
                    ? listEmbryo.find(
                        (e) => e._id === props.values.geneticStockId
                      )?.name
                    : ""
                }
              />
              <TextFieldFormik
                name="availableStock"
                disabled
                label="Stock disponible"
                value={
                  listEmbryo.find((e) => e._id === props.values.geneticStockId)
                    ?.stock || 0
                }
                type="number"
                xs={12}
                sm={4}
              />
              <SelectFieldFormik
                required
                onChange={props.handleChange}
                xs={12}
                sm={6}
                name="embryoType"
                label="Tip. embrión"
                options={typeEmbryonOptions}
              />
              <SelectFieldFormik
                required
                onChange={props.handleChange}
                xs={12}
                sm={6}
                name="embryoCondition"
                label=""
                options={conditionOptions}
              />
              <SelectFieldFormik
                required
                onChange={props.handleChange}
                xs={12}
                sm={4}
                name="embryoPhase"
                label="Estadio"
                options={estadiosOptions}
              />
              <SelectFieldFormik
                required
                onChange={props.handleChange}
                xs={12}
                sm={2}
                name="embryoQuality"
                label="Calidad"
                options={qualityEmbryoOptions}
                disabled={type === "create" ? false : true}
              />
              <TextFieldFormik
                required
                onChange={props.handleChange}
                name="quantity"
                label="Cantidad"
                type="number"
                disabled={type === "create" ? false : true}
                xs={12}
                sm={2}
              />
              <SelectFieldFormik
                required
                onChange={props.handleChange}
                xs={12}
                sm={4}
                name="embryoGender"
                label="Sexo embrión"
                options={sexOptions}
              />
              <Grid item xs={12}>
                <Typography variant="subtitle2">Hallazgo en ovarios</Typography>
              </Grid>
              <TextFieldFormik
                onChange={props.handleChange}
                name="ovaryRight"
                label="Ovario derecho"
                xs={12}
                sm={4}
              />
              <TextFieldFormik
                onChange={props.handleChange}
                name="ovaryLeft"
                label="Ovario izquierdo"
                xs={12}
                sm={4}
              />
              <SelectFieldFormik
                required
                onChange={props.handleChange}
                xs={12}
                sm={4}
                name="userId"
                label="Inseminador"
                options={listCollaborator}
              />
              <TextFieldFormik
                onChange={props.handleChange}
                name="observation"
                multiline
                rows={3}
                label="Observaciones"
                xs={12}
              />
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
      <CustomModal />
    </>
  );
};

EmbryoTransferForm.propTypes = {
  type: PropTypes.oneOf(["create", "update"]).isRequired,
  onClickCancelButton: PropTypes.func,
  initValues: PropTypes.object,
};

export default EmbryoTransferForm;
