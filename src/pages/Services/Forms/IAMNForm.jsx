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
import CheckboxFormik from "../../../components/Inputs/CheckboxFormik";
import { typeServices, typeServicesTest } from "../../../constants";
import { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import serviceActions from "../../../redux/actions/service.actions";
import AnimalActions from "../../../redux/actions/animal.actions";
import GeneticStockActions from "../../../redux/actions/geneticStock.actions";
import { sexOptions } from "../../../constants";
import _ from "lodash";
import CollaboratorActions from "../../../redux/actions/collaborator.actions";
import { useParams } from "react-router";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import MovementActions from "../../../redux/actions/movement.actions";
import { differenceInMonths, format, isAfter } from "date-fns";
import CustomInfoIcon from "../../../components/CustomInfoIcon";
import CustomModal, { customModal } from "../../../components/Modal";

const defaultInitValues = {
  agribusinessId: "",
  animalId: "",
  name: "",
  serviceDate: new Date(),
  serviceTime: new Date(),
  serviceType: "",
  reproductorAnimalId: null,
  geneticStockId: null,
  userId: null,
  quantity: 1,
  strawGender: "",
  isIatf: false,
  observation: "",
};

const validationSchema = (semenList, animalList) =>
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
              "La fecha del servicio debe ser mayor a la fecha de entrada de hato del animal."
            ),
        }),
      serviceType: yup.string().required("Esta campo es requerido."),
      geneticStockId: yup
        .string()
        .typeError("Debes ingresar un semen")
        .nullable(true)
        .when("serviceType", {
          is: (value) => value === "AR_IN",
          then: (rule) =>
            rule.nullable(false).required("Este campo es requerido"),
        }),
      userId: yup
        .string()
        .typeError("Debes ingresar un inseminador")
        .nullable(true)
        .when("serviceType", {
          is: (value) => value === "AR_IN",
          then: (rule) =>
            rule.nullable(false).required("Este campo es requerido"),
        }),
      strawGender: yup
        .string()
        .typeError("Debes seleccionar un sexo")
        .nullable(true)
        .when("serviceType", {
          is: (value) => value === "AR_IN",
          then: (rule) =>
            rule.nullable(false).required("Este campo es requerido"),
        }),
      quantity: yup
        .number()
        .integer("Solo números enteros")
        .typeError("Debes ingresar una cantidad")
        .nullable(true)
        .when("serviceType", {
          is: (value) => value === "AR_IN",
          then: (rule) =>
            rule
              .min(1, "La cantidad debe ser mayor a 1")
              .max(
                semenList.find((e) => e._id === values.geneticStockId)?.stock ||
                  1,
                ({ max }) => `La cantidad debe ser menor o igual a ${max}`
              )
              .nullable(false)
              .required("Este campo es requerido"),
        }),
      reproductorAnimalId: yup
        .string()
        .typeError("Debes ingresar un reproductor")
        .nullable(true)
        .when("serviceType", {
          is: (value) => value === "NA_MO",
          then: (rule) =>
            rule.nullable(false).required("Este campo es requerido"),
        }),
    })
  );

const IAMNForm = ({
  initValues = defaultInitValues,
  type = "create",
  hideAnimal = false,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const isBreeding = useSelector(
    (state) => state.agribusiness.current.isBreeding
  );
  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );
  const femaleAnimals = useSelector(
    (state) =>
      state.animal.list.filter(
        (e) => e.gender === "FEMALE" && !e.isPregnant && !e.isServed
      ),
    shallowEqual
  );

  const maleAnimals = useSelector(
    (state) =>
      state.animal.list.filter(
        (e) => e.gender === "MALE" && e.isReproductor === true
      ),
    shallowEqual
  );

  const listSemen = useSelector(
    (state) =>
      state.geneticStock.list.filter(
        (e) => e.active && e.geneticType === "SEMEN",
        shallowEqual
      ),
    shallowEqual
  );
  const listCollaborator = useSelector((state) => state.collaborator.list);

  useEffect(() => {
    if (!listCollaborator || listCollaborator.length === 0) {
      dispatch(CollaboratorActions.list());
    }

    if (
      !femaleAnimals ||
      femaleAnimals.length === 0 ||
      !maleAnimals ||
      maleAnimals.length === 0
    ) {
      dispatch(AnimalActions.list());
    }
    if (!listSemen || listSemen.length === 0) {
      dispatch(
        GeneticStockActions.listGeneticStockByAgribusiness({
          geneticType: "SEMEN",
        })
      );
    }
    if (hideAnimal) {
      initValues.animalId = params._id;
    }
    if (type === "create") {
      if (
        currentAgribusiness.reproductiveManagement &&
        currentAgribusiness.reproductiveManagement === "ARTIFICIAL_INSEMINATION"
      ) {
        initValues.serviceType = "AR_IN";
      } else if (
        currentAgribusiness.reproductiveManagement &&
        currentAgribusiness.reproductiveManagement === "DIRECT_MOUNT"
      ) {
        initValues.serviceType = "NA_MO";
      }
    }
    if (type === "update") {
      initValues.quantity = initValues.strawQuantity;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      if (values.serviceType === "AR_IN") {
        if (!listSemen.some((e) => e._id === values.geneticStockId)) {
          customModal({
            title: "Advertencia",
            message: "El semen que ingreso no existe.",
            textOk: null,
            textCancel: "OK",
            onSubmit: () => {},
          });
          return;
        }

        if (!listCollaborator.some((e) => e._id === values.userId)) {
          customModal({
            title: "Advertencia",
            message: "El inseminador ingreso no existe.",
            textOk: null,
            textCancel: "OK",
            onSubmit: () => {},
          });
          return;
        }
      }
      if (values.serviceType === "NA_MO") {
        if (!maleAnimals.some((e) => e._id === values.reproductorAnimalId)) {
          customModal({
            title: "Advertencia",
            message:
              "El identificador del macho reproductor que ingreso no existe.",
            textOk: null,
            textCancel: "OK",
            onSubmit: () => {},
          });
          return;
        }
      }

      if (
        values.serviceType === "NA_MO" &&
        isAfter(
          new Date(
            maleAnimals.find(
              (e) => e._id === values.reproductorAnimalId
            )?.herdDate
          ),
          new Date(values.serviceDate)
        )
      ) {
        customModal({
          title: "Advertencia",
          message:
            "La entrada de hato del animal reproductor debe ser menor a la fecha del servicio.",
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
        if (values.serviceType === "AR_IN") {
          await dispatch(
            serviceActions.create(
              _.omit(
                {
                  ...values,
                  strawQuantity: values.quantity,
                  quantity: -1 * values.quantity,
                },
                "reproductorAnimalId"
              )
            )
          );
        } else {
          await dispatch(
            serviceActions.create(
              _.omit(
                values,
                "quantity",
                "genetickStockId",
                "strawGender",
                "userId"
              )
            )
          );
        }
      }
      if (type === "update") {
        if (values.serviceType === "AR_IN") {
          await dispatch(
            serviceActions.update(_.omit(values, "reproductorAnimalId"))
          );
        } else {
          await dispatch(
            serviceActions.update(
              _.omit(
                values,
                "quantity",
                "genetickStockId",
                "strawGender",
                "userId"
              )
            )
          );
        }
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
        validationSchema={validationSchema(listSemen, femaleAnimals)}
        onSubmit={preSubmit}
        enableReinitialize
      >
        {(props) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            console.log(props.errors);
          }, [props]);

          return (
            <form onSubmit={props.handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    {type === "create" && "Registrar servicio"}
                    {type === "update" && "Editar servicio"}
                  </Typography>
                </Grid>
                {!hideAnimal && (
                  <>
                    <AutocompleteFieldFormik
                      required={true}
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
                      value={
                        props.values.animalId
                          ? femaleAnimals.find(
                              (e) => e._id === props.values.animalId
                            )?.name
                          : ""
                      }
                      xs={12}
                      sm={6}
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
                <SelectFieldFormik
                  required
                  onChange={props.handleChange}
                  xs={12}
                  sm={props.values.serviceType !== typeServices[1]._id ? 4 : 6}
                  name="serviceType"
                  label="Tipo de servicio"
                  disabled={type === "update"}
                  // options={typeServices}
                  options={Object.keys(typeServicesTest)
                    .filter((key) =>
                      currentAgribusiness &&
                      currentAgribusiness.reproductiveManagement &&
                      currentAgribusiness.reproductiveManagement ===
                        "ARTIFICIAL_INSEMINATION"
                        ? key === "AR_IN"
                        : currentAgribusiness.reproductiveManagement ===
                          "DIRECT_MOUNT"
                        ? key === "NA_MO"
                        : key === "AR_IN" || key === "NA_MO"
                    )
                    .map((key) => ({
                      _id: key,
                      name: typeServicesTest[key],
                    }))}
                  // options={Object.keys(movementOptions).map((key) => ({
                  //   _id: key,
                  //   name: movementOptions[key],
                  // }))}
                />
                {props.values.serviceType !== typeServices[1]._id ? (
                  <AutocompleteFieldFormik
                    required
                    defaultValue={
                      type === "create" ? null : props.values.geneticStock
                    }
                    onChange={props.handleChange}
                    xs={12}
                    sm={4}
                    name="geneticStockId"
                    label="Semen"
                    options={listSemen}
                    disabled={type === "create" ? false : true}
                  />
                ) : (
                  <AutocompleteFieldFormik
                    required
                    defaultValue={
                      type === "create" ? null : props.values.reproductor
                    }
                    onChange={props.handleChange}
                    xs={12}
                    sm={6}
                    name="reproductorAnimalId"
                    label="Reproductor"
                    options={maleAnimals}
                    disabled={type === "create" ? false : true}
                  />
                )}
                {props.values.serviceType !== typeServices[1]._id && (
                  <TextFieldFormik
                    name="availableStock"
                    disabled
                    label="Stock disponible"
                    value={
                      listSemen.find(
                        (e) => e._id === props.values.geneticStockId
                      )?.stock || 0
                    }
                    type="number"
                    xs={12}
                    sm={4}
                  />
                )}
                {props.values.serviceType !== typeServices[1]._id && (
                  <TextFieldFormik
                    required
                    onChange={props.handleChange}
                    name="quantity"
                    label="Nro de pajillas"
                    type="number"
                    xs={12}
                    sm={6}
                    disabled={type === "create" ? false : true}
                  />
                )}
                {props.values.serviceType !== typeServices[1]._id && (
                  <SelectFieldFormik
                    required
                    onChange={props.handleChange}
                    xs={12}
                    sm={6}
                    name="strawGender"
                    label="Sexo pajilla"
                    options={sexOptions}
                    // options={Object.keys(movementOptions).map((key) => ({
                    //   _id: key,
                    //   name: movementOptions[key],
                    // }))}
                  />
                )}
                {props.values.serviceType !== typeServices[1]._id && (
                  <SelectFieldFormik
                    required
                    onChange={props.handleChange}
                    xs={12}
                    sm={6}
                    name="userId"
                    label="Inseminador"
                    options={listCollaborator}
                  />
                )}
                <Grid
                  sm={6}
                  xs={12}
                  item
                  alignContent="center"
                  alignItems="center"
                >
                  <CheckboxFormik
                    label="I.A.T.F"
                    name="isIatf"
                    onChange={props.handleChange}
                    // checked={values.isReproductive}
                  ></CheckboxFormik>
                </Grid>
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
          );
        }}
      </Formik>
      <CustomModal />
    </>
  );
};

IAMNForm.propTypes = {
  type: PropTypes.oneOf(["create", "update"]).isRequired,
  onClickCancelButton: PropTypes.func,
  initValues: PropTypes.object,
};

export default IAMNForm;
