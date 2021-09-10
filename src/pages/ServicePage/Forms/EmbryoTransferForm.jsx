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
import { typeServices } from "../../../constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import serviceActions from "../../../redux/actions/service.actions";
import {
  getFemaleAnimals,
  getMaleAnimals,
} from "../../../redux/selectors/animal.selector";
import {
  sexOptions,
  estadiosOptions,
  qualityEmbryoOptions,
  conditionOptions,
  typeEmbryonOptions,
} from "../../../constants";
import ACTION_TYPES from "../../../redux/types";

// const defaultInitValues = {
//   agribusinessId: "",
//   animalId: "",
//   name: "",
//   serviceDate: new Date(),
//   serviceTime: "",
//   serviceType: "",
//   reproductorAnimalId: null,
//   geneticStockId: null,
//   userId: null,
//   strawQuantity: 0,
//   strawGender: "",
//   isIatf: false,
//   observation: "",
// };

const validationSchema = yup.object({
  animalId: yup
    .string("Ingresa el tipo de movimiento")
    .required("Esta campo es requerido."),
  serviceDate: yup
    .date("Ingresa una fecha")
    .required("Este campo es requerido"),
  serviceType: yup
    .string("Ingresa el tipo de servicio")
    .required("Esta campo es requerido."),
});

const EmbryoTransferForm = ({
  initValues,
  type = "create",
  onClickCancelButton,
}) => {
  const dispatch = useDispatch();
  const femaleAnimals = useSelector(getFemaleAnimals());
  const maleAnimals = useSelector(getMaleAnimals());
  const { current: currentAgribusiness } = useSelector(
    (state) => state.agribusiness
  );
  const { list: listSemen } = useSelector((state) => state.geneticStock);

  useEffect(() => {
    dispatch(serviceActions.listByAgribusiness());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onSubmitCreate = (values, actions) => {
    values.agribusinessId = currentAgribusiness._id;
    dispatch(serviceActions.create(values));
    onClickCancelButton();
  };
  const onSubmitUpdate = (values, actions) => {
    dispatch(serviceActions.update(values));
    onClickCancelButton();
  };

  const onCancel = () => {
    onClickCancelButton();
    dispatch({
      type: ACTION_TYPES.SERVICE.UPDATE_CURRENT,
      payload: null,
    });
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={type === "create" ? onSubmitCreate : onSubmitUpdate}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          {/* <Grid container spacing={1} className={classes.formStyle}>
            <Grid item>
              <Typography variant={"subtitle2"}>Embrión</Typography>
            </Grid>
          </Grid> */}
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
            <AutocompleteFieldFormik
              options={femaleAnimals}
              name="animalId"
              label="Identificación de hembra"
              onChange={props.handleChange}
              defaultValue={type === "create" ? null : props.values.animal}
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
            />
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
              name="serviceDate"
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
              sm={3}
              name="geneticStockId"
              label="Cód."
              options={listSemen}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="name"
              label="Nom. embrión"
              disabled
              xs={12}
              sm={3}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={3}
              name="serviceType"
              label="Tip. embrión"
              options={typeEmbryonOptions}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={3}
              name="serviceType"
              label="Condición"
              options={conditionOptions}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={4}
              name="serviceType"
              label="Estadio"
              options={estadiosOptions}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={2}
              name="serviceType"
              label="Calidad"
              options={qualityEmbryoOptions}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="name"
              label="Cantidad"
              xs={12}
              sm={2}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={4}
              name="serviceType"
              label="Sexo embrión"
              options={sexOptions}
            />
            <Grid item xs={12}>
              <Typography variant="subtitle2">Hallazgo en ovarios</Typography>
            </Grid>
            <TextFieldFormik
              onChange={props.handleChange}
              name="name"
              label="Ovario derecho"
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="name"
              label="Ovario izquierdo"
              xs={12}
              sm={4}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={4}
              name="serviceType"
              label="Inseminador"
              options={typeServices}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="observation"
              multiline
              rows={3}
              label="Comentario"
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
                  onClick={onCancel}
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
