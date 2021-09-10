import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import PropTypes from "prop-types";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import AutocompleteFieldFormik from "../../../components/Inputs/AutocompleteFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import CheckboxFormik from "../../../components/Inputs/CheckboxFormik";
import { typeServices } from "../../../constants";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import serviceActions from "../../../redux/actions/service.actions";
import {
  getFemaleAnimals,
  getMaleAnimals,
} from "../../../redux/selectors/animal.selector";
import { sexOptions } from "../../../constants";
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

const IAMNForm = ({ initValues, type = "create", onClickCancelButton }) => {
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
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {type === "create" && "Registrar servicio"}
                {type === "update" && "Editar servicio"}
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
            <TextFieldFormik
              onChange={props.handleChange}
              name="serviceTime"
              label="Hora"
              xs={12}
              sm={6}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={6}
              name="serviceType"
              label="Tipo de servicio"
              options={typeServices}
              // options={Object.keys(movementOptions).map((key) => ({
              //   _id: key,
              //   name: movementOptions[key],
              // }))}
            />
            {props.values.serviceType !== typeServices[1]._id ? (
              <AutocompleteFieldFormik
                defaultValue={
                  type === "create" ? null : props.values.geneticStock
                }
                onChange={props.handleChange}
                xs={12}
                sm={6}
                name="geneticStockId"
                label="Semen"
                options={listSemen}
              />
            ) : (
              <AutocompleteFieldFormik
                defaultValue={
                  type === "create" ? null : props.values.reproductor
                }
                onChange={props.handleChange}
                xs={12}
                sm={6}
                name="reproductorAnimalId"
                label="Reproductor"
                options={maleAnimals}
              />
            )}
            {props.values.serviceType !== typeServices[1]._id && (
              <AutocompleteFieldFormik
                // defaultValue={
                //   type === "create" ? null : props.values.reproductor
                // }
                onChange={props.handleChange}
                xs={12}
                sm={6}
                name="userId"
                label="Inseminador"
                options={[]}
              />
            )}
            {props.values.serviceType !== typeServices[1]._id && (
              <TextFieldFormik
                onChange={props.handleChange}
                name="strawQuantity"
                label="Nro de pajillas"
                type="number"
                xs={12}
                sm={6}
              />
            )}
            {props.values.serviceType !== typeServices[1]._id && (
              <SelectFieldFormik
                onChange={props.handleChange}
                xs={12}
                sm={6}
                name="strawGender"
                label="Genero de pajilla"
                options={sexOptions}
                // options={Object.keys(movementOptions).map((key) => ({
                //   _id: key,
                //   name: movementOptions[key],
                // }))}
              />
            )}
            <Grid sm={6} xs={12} item alignContent="center" alignItems="center">
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

IAMNForm.propTypes = {
  type: PropTypes.oneOf(["create", "update"]).isRequired,
  onClickCancelButton: PropTypes.func,
  initValues: PropTypes.object,
};

export default IAMNForm;
