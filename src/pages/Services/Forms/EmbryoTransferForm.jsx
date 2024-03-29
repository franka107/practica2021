import { Grid, Typography } from "@material-ui/core";
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
  embryoQuality: 0,
  quantity: 0,
  embryoGender: "",
  ovaryRight: "",
  ovaryLeft: "",
  userId: null,
  observation: "",
};

const EmbryoTransferForm = ({
  initValues = defaultInitValues,
  type = "create",
  hideAnimal = false,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const femaleAnimals = useSelector(
    (state) =>
      state.animal.list.filter(
        (e) =>
          e.gender === "FEMALE" &&
          e.reproductiveStatus !== "PREGNANT" &&
          !e.isServed
      ),
    shallowEqual
  );
  const { current: currentAgribusiness } = useSelector(
    (state) => state.agribusiness
  );
  const listEmbryo = useSelector(
    (state) =>
      state.geneticStock.list.filter(
        (e) => e.active && e.geneticType === "EMBRYO"
      ),
    shallowEqual
  );
  const listCollaborator = useSelector((state) => state.collaborator.list);

  const validationSchema = () =>
    yup.lazy((values) =>
      yup.object({
        animalId: yup
          .string("Ingresa el tipo de movimiento")
          .required("Esta campo es requerido."),
        serviceDate: yup
          .date("Ingresa una fecha")
          .required("Este campo es requerido"),
        serviceType: yup
          .string("Ingresa el tipo de servicio")
          .required("Esta campo es requerido."),
        quantity: yup
          .number("Ingrese solo números")
          .integer("Solo números enteros")
          .min(1, "La cantidad debe ser mayor o igual a 1")
          .max(
            listEmbryo.find((e) => e._id === values.geneticStockId)?.stock || 1,
            ({ max }) => `La cantidad debe ser menor o igual a ${max}`
          ),
      })
    );

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
                  options={femaleAnimals}
                  name="animalId"
                  label="Identificación de hembra"
                  onChange={props.handleChange}
                  defaultValue={type === "create" ? null : props.values.animal}
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
            <DatePickerFieldFormik
              label="Fecha"
              onChange={props.handleChange}
              name="serviceDate"
              xs={12}
              sm={6}
            />
            <TimePickerFormik
              label="Fecha"
              onChange={props.handleChange}
              name="serviceTime"
              xs={12}
              sm={6}
            />
            <Grid item xs={12}>
              <Typography variant="subtitle2">Embrión</Typography>
            </Grid>
            <AutocompleteFieldFormik
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
              onChange={props.handleChange}
              xs={12}
              sm={6}
              name="embryoType"
              label="Tip. embrión"
              options={typeEmbryonOptions}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={6}
              name="embryoCondition"
              label="Condición"
              options={conditionOptions}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={4}
              name="embryoPhase"
              label="Estadio"
              options={estadiosOptions}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={2}
              name="embryoQuality"
              label="Calidad"
              options={qualityEmbryoOptions}
              disabled={type === "create" ? false : true}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="quantity"
              label="Cantidad"
              type="number"
              disabled={type === "create" ? false : true}
              xs={12}
              sm={2}
            />
            <SelectFieldFormik
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
  );
};

EmbryoTransferForm.propTypes = {
  type: PropTypes.oneOf(["create", "update"]).isRequired,
  onClickCancelButton: PropTypes.func,
  initValues: PropTypes.object,
};

export default EmbryoTransferForm;
