import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import PropTypes from "prop-types";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import { movementOptions } from "../../../constants";
import { useDispatch } from "react-redux";
import MovementActions from "../../../redux/actions/movement.actions";
import { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import AutocompleteFieldFormik from "../../../components/Inputs/AutocompleteFieldFormik";

const defaultInitValues = {
  geneticStockId: "",
  movementType: "",
  date: new Date(),
  observation: "",
  quantity: 1,
  unitValue: 0,
  saleAccount: "",
  description: "",
  toWho: "",
};

const validationSchema = yup.object({
  movementType: yup
    .string("Ingresa el tipo de movimiento")
    .required("Esta campo es requerido."),
  date: yup.date("Ingresa una fecha").required("Este campo es requerido"),
  geneticStockId: yup
    .string("Ingresa stock genético")
    .required("Esta campo es requerido."),
  observation: yup.string("Ingresa una observación"),
  quantity: yup
    .number("Ingrese solo números")
    .integer("Solo números enteros")
    .min(1, "La cantidad debe ser mayor o igual a 1")
    .required("Este campo es requerido"),
  unitValue: yup
    .number("Ingrese solo números")
    .required("Este campo es requerido"),
  saleAccount: yup.string("Ingresa una cuenta"),
  description: yup.string("Ingresa una descripción"),
  toWho: yup.string("Ingresa información"),
});

const MovementForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  geneticType,
}) => {
  const dispatch = useDispatch();
  const geneticStockList = useSelector(
    (state) => state.geneticStock.list.filter((e) => e.active),
    shallowEqual
  );

  useEffect(() => {
    (!geneticStockList || geneticStockList.length === 0) &&
      dispatch(
        geneticStockActions.listGeneticStockByAgribusiness({
          geneticType,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onSubmitCreate = (values, actions) => {
    dispatch(MovementActions.create(values));
  };
  const onSubmitUpdate = (values, actions) => {
    console.log("submitUpdate");
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
                {type === "create" && "Nuevo movimiento"}
                {type === "update" && "Editar movimiento"}
              </Typography>
            </Grid>
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={6}
              name="movementType"
              label="Movimiento"
              options={Object.keys(movementOptions).map((key) => ({
                _id: key,
                name: movementOptions[key],
              }))}
            />
            <AutocompleteFieldFormik
              options={geneticStockList}
              name="geneticStockId"
              label="Stock genético"
              onChange={props.handleChange}
              xs={12}
              sm={6}
            />

            <DatePickerFieldFormik
              label="Fecha"
              onChange={props.handleChange}
              name="date"
              xs={12}
              sm={6}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="toWho"
              label="A quien"
              xs={12}
              sm={6}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="observation"
              label="Observación"
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="quantity"
              label="Cantidad"
              type="number"
              xs={12}
              sm={6}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="unitValue"
              label="Valor unidad"
              type="number"
              xs={12}
              sm={6}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="saleAccount"
              label="Cta venta embrión"
              xs={12}
              sm={6}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="description"
              label="Descripción"
              xs={12}
              sm={6}
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

MovementForm.propTypes = {
  type: PropTypes.oneOf(["create", "update"]).isRequired,
  onClickCancelButton: PropTypes.func,
  initValues: PropTypes.object,
};

export default MovementForm;
