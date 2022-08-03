import { Grid, Typography, InputAdornment } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import PropTypes from "prop-types";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import { movementOptions, operationOptions } from "../../../constants";
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
  agribusinessIdTransfer: null,
  observation: "",
  quantity: 1,
  unitValue: 0,
  saleAccount: "",
  description: "",
  toWho: "",
};

/**
 * @component
 * @description Componente, formulario para crear o editar el registro del movimientos que tiene relacion con stock genetico
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const validationSchema = (geneticStockList) =>
  yup.lazy((values) => {
    return yup.object({
      movementType: yup.string().required("Esta campo es requerido."),
      date: yup.date().required("Este campo es requerido."),
      geneticStockId: yup
        .string()
        .nullable(true)
        .required("Esta campo es requerido."),
      observation: yup.string(),
      quantity: yup
        .number()
        .typeError("Debes de ingresar valores numericos")
        .integer("Solo números enteros")
        .min(1, "La cantidad debe ser mayor 0")
        .max(
          movementOptions[values.movementType] === movementOptions.MOVING ||
            movementOptions[values.movementType] === movementOptions.SALE ||
            (movementOptions[values.movementType] === movementOptions.OTHER &&
              operationOptions[values.movementOperationType] ===
                operationOptions.SUBSTRACTION)
            ? values.geneticStockId
              ? geneticStockList.find((e) => e._id === values.geneticStockId)
                  ?.stock
              : 0
            : Infinity,
          ({ max }) => `La cantidad debe ser menor o igual a ${max}`
        )
        .required("Este campo es requerido"),
      unitValue: yup
        .number()
        .typeError("Debes de ingresar valores numericos")
        .when("movementType", {
          is: (value) => value !== "MOVING",
          then: (rule) => rule.required("Este campo es requerido"),
        })
        .when("movementType", {
          is: (value) => value === "MOVING",
          then: (rule) => rule.nullable(true),
        }),
      agribusinessIdTransfer: yup
        .string()
        .typeError("Debes ingresar un agronegocio")
        .nullable(true)
        .when("movementType", {
          is: (value) => value === "MOVING",
          then: (rule) =>
            rule.nullable(false).required("Este campo es requerido"),
        }),
      saleAccount: yup.string(),
      description: yup.string(),
      toWho: yup.string(),
    });
  });

const MovementForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
  geneticType,
}) => {
  const dispatch = useDispatch();
  const listAgribusiness = useSelector((state) => state.agribusiness.list);
  const geneticStockList = useSelector(
    (state) =>
      state.geneticStock.list.filter(
        (e) => e.active && e.geneticType === geneticType
      ),
    shallowEqual
  );
  const currentFarm = useSelector((state) => state.farm.current);

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
    if (
      movementOptions[values.movementType] === movementOptions.SALE ||
      operationOptions[values.movementOperationType] ===
        operationOptions.SUBSTRACTION
    ) {
      values.quantity = values.quantity * -1;
    }
    return values;
  };

  const onSubmit = async (values, actions) => {
    try {
      const transformedValues = transformByMovementType(values);
      if (values.movementType === "MOVING") {
        await dispatch(
          MovementActions.transfer(
            {
              ...values,
              quanityAdd: values.quantity * 1,
              quanityReduce: values.quantity * -1,
            },
            geneticType
          )
        );
      } else {
        if (type === "create") {
          await dispatch(
            MovementActions.create(transformedValues, geneticType)
          );
        }
        if (type === "update") {
          await dispatch(
            MovementActions.update(transformedValues, geneticType)
          );
        }
      }
      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema(geneticStockList)}
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
              required
              onChange={props.handleChange}
              xs={12}
              sm={props.values.movementType === "OTHER" ? 2 : 5}
              name="movementType"
              label="Movimiento"
              options={Object.keys(movementOptions)
                .filter(
                  (key) =>
                    key === "SALE" ||
                    key === "PURCHASE" ||
                    key === "OTHER" ||
                    key === "MOVING"
                )
                .map((key) => ({
                  _id: key,
                  name: movementOptions[key],
                }))}
            />
            {props.values.movementType === "OTHER" && (
              <SelectFieldFormik
                required
                onChange={props.handleChange}
                xs={12}
                sm={3}
                name="movementOperationType"
                label="Tipo de operacion"
                options={Object.keys(operationOptions).map((key) => ({
                  _id: key,
                  name: operationOptions[key],
                }))}
              />
            )}
            <AutocompleteFieldFormik
              required
              options={geneticStockList}
              name="geneticStockId"
              label="Stock genético"
              onChange={props.handleChange}
              xs={12}
              sm={5}
            />
            <TextFieldFormik
              name="stock"
              label="Stock"
              onChange={props.handleChange}
              xs={12}
              sm={2}
              disabled
              value={
                props.values.geneticStockId
                  ? geneticStockList.find(
                      (e) => e._id === props.values.geneticStockId
                    )?.stock
                  : 0
              }
            />

            {props.values.movementType === "MOVING" ? (
              <DatePickerFieldFormik
                required
                label="Fecha"
                onChange={props.handleChange}
                name="date"
                xs={12}
                sm={12}
              />
            ) : (
              <>
                <DatePickerFieldFormik
                  required
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
              </>
            )}
            <TextFieldFormik
              required
              onChange={props.handleChange}
              name="quantity"
              label="Cantidad"
              type="number"
              xs={12}
              sm={props.values.movementType === "MOVING" ? 6 : 4}
            />

            {props.values.movementType === "MOVING" ? (
              <>
                <AutocompleteFieldFormik
                  required
                  displayName={false}
                  showName="name"
                  options={listAgribusiness}
                  name="agribusinessIdTransfer"
                  label="Agronegocio de Traslado"
                  onChange={props.handleChange}
                  xs={12}
                  sm={6}
                  defaultValue={
                    type === "create"
                      ? null
                      : listAgribusiness.find(
                          (e) => e._id === props.values.agribusinessIdTransfer
                        )
                  }
                  disabled={type === "create" ? false : true}
                />
                <TextFieldFormik
                  onChange={props.handleChange}
                  name="observation"
                  label="Observación"
                />
              </>
            ) : (
              <>
                <TextFieldFormik
                  required
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
                  xs={12}
                  endAdornment={
                    <InputAdornment position="start">
                      {currentFarm?.currency?.currencyAbbreviation}
                    </InputAdornment>
                  }
                  sm={4}
                  disabled
                  value={(
                    props.values.unitValue * props.values.quantity
                  ).toFixed(2)}
                />
                <TextFieldFormik
                  onChange={props.handleChange}
                  name="description"
                  label="Descripción"
                  xs={12}
                  sm={12}
                />
              </>
            )}
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
