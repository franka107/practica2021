import { Grid, Typography, InputAdornment } from "@material-ui/core";
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

const MovementForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
  geneticType,
}) => {
  const dispatch = useDispatch();
  const geneticStockList = useSelector(
    (state) => state.geneticStock.list.filter((e) => e.active),
    shallowEqual
  );
  const currentFarm = useSelector((state) => state.farm.current);
  const validationSchema = () =>
    yup.lazy((values) => {
      return yup.object({
        movementType: yup
          .string("Ingresa el tipo de movimiento")
          .required("Esta campo es requerido."),
        date: yup
          .date("Ingresa una fecha")
          .required("Este campo es requerido."),
        geneticStockId: yup
          .string("Ingresa stock genético")
          .nullable(true)
          .required("Esta campo es requerido."),
        observation: yup.string("Ingresa una observación"),
        quantity: yup
          .number("Ingrese solo números")
          .integer("Solo números enteros")
          .min(1, "La cantidad debe ser mayor o igual a 1")
          .max(
            movementOptions[values.movementType] === movementOptions.SALE
              ? values.geneticStockId
                ? geneticStockList.find((e) => e._id === values.geneticStockId)
                    ?.stock
                : 0
              : Infinity,
            ({ max }) => `La cantidad debe ser menor o igual a ${max}`
          )

          .required("Este campo es requerido"),
        unitValue: yup
          .number("Ingrese solo números")
          .required("Este campo es requerido"),
        saleAccount: yup.string("Ingresa una cuenta"),
        description: yup.string("Ingresa una descripción"),
        toWho: yup.string("Ingresa información"),
      });
    });

  useEffect(() => {
    (!geneticStockList || geneticStockList.length === 0) &&
      dispatch(
        geneticStockActions.listGeneticStockByAgribusiness({
          geneticType,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const transformByMovementType = (values) => {
    if (movementOptions[values.movementType] === movementOptions.SALE) {
      values.quantity = values.quantity * -1;
    }
    return values;
  };

  const onSubmit = async (values, actions) => {
    try {
      const transformedValues = transformByMovementType(values);
      if (type === "create") {
        await dispatch(MovementActions.create(transformedValues, geneticType));
      }
      if (type === "update") {
        await dispatch(MovementActions.update(transformedValues, geneticType));
      }
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
                {type === "create" && "Nuevo movimiento"}
                {type === "update" && "Editar movimiento"}
              </Typography>
            </Grid>
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={4}
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
              sm={4}
            />
            <TextFieldFormik
              name="stock"
              label="Cantidad"
              onChange={props.handleChange}
              xs={12}
              sm={4}
              disabled
              value={
                props.values.geneticStockId
                  ? geneticStockList.find(
                      (e) => e._id === props.values.geneticStockId
                    )?.stock
                  : 0
              }
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
              sm={4}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="unitValue"
              label="Valor unidad"
              endAdornment={
                <InputAdornment position="start">
                  {currentFarm?.currency?.currencyAbbreviation}
                </InputAdornment>
              }
              type="number"
              xs={12}
              sm={4}
            />
            <TextFieldFormik
              name="total"
              label="Total"
              type="number"
              xs={12}
              endAdornment={
                <InputAdornment position="start">
                  {currentFarm?.currency?.currencyAbbreviation}
                </InputAdornment>
              }
              sm={4}
              disabled
              value={props.values.unitValue * props.values.quantity}
            />
            {/* 
            <TextFieldFormik
              onChange={props.handleChange}
              name="saleAccount"
              label="Cta venta embrión"
              xs={12}
              sm={6}
            />
            */}
            <TextFieldFormik
              onChange={props.handleChange}
              name="description"
              label="Descripción"
              xs={12}
              sm={12}
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
