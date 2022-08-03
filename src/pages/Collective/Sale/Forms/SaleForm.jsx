import React from "react";
import { Grid, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import AutocompleteFieldFormik from "../../../../components/Inputs/AutocompleteFieldFormik";
import { useDispatch, useSelector } from "react-redux";
import AnimalActions from "../../../../redux/actions/animal.actions";
import { useEffect } from "react";
import SaleActions from "../../../../redux/actions/sale.actions";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";
import { saleTranferOptions } from "../../../../constants";
import { format } from "date-fns";
import _ from "lodash";

const defaultInitValues = {
  typeAction: "SALE",
  animalId: "",
  controlDate: new Date(),
  weight: "",
  valueForUnitWeight: "",
  observation: "",
  agribusinessIdTransfer: "",
  who: "",
};

/**
 * @component
 * @description Componente, formulario para crear o editar ventas o traslados de animales
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const validationSchema = (animalList) =>
  yup.lazy((values) =>
    yup.object({
      animalId: yup
        .string()
        .typeError("Ingrese un animal")
        .required("Este campo es requerido."),
      weight: yup
        .number()
        .typeError("Ingresa solo numeros")
        .required("Este campo es requerido."),
      valueForUnitWeight: yup
        .number()
        .typeError("Ingresa solo numeros")
        .required("Este campo es requerido."),
      controlDate: yup
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
              "La fecha de control peso debe ser mayor a la fecha de entrada de hato."
            ),
        }),
      who: yup
        .string()
        .typeError("Este campo es requerido")
        .nullable(true)
        .when("typeAction", {
          is: (value) => value === "SALE",
          then: (rule) =>
            rule.nullable(false).required("Este campo es requerido"),
        }),
      agribusinessIdTransfer: yup
        .string()
        .typeError("Debes ingresar un agronegocio")
        .nullable(true)
        .when("typeAction", {
          is: (value) => value === "TRANSFER",
          then: (rule) =>
            rule.nullable(false).required("Este campo es requerido"),
        }),
    })
  );

const SaleForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();

  const listAgribusiness = useSelector((state) => state.agribusiness.list);

  const listAnimal = useSelector((state) => state.animal.list);

  useEffect(() => {
    if (!listAnimal || listAnimal.length === 0) {
      dispatch(AnimalActions.list());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values, actions) => {
    const dataValidation =
      values.typeAction === "SALE"
        ? _.omit(values, "agribusinessIdTransfer")
        : _.omit(values, "who");

    try {
      if (type === "create") {
        await dispatch(SaleActions.create(dataValidation));
      }
      if (type === "update") {
        await dispatch(SaleActions.update(values));
      }

      onCompleteSubmit();
    } catch {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema(listAnimal)}
      enableReinitialize
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Grid container spacing={1}>
            <Typography variant={"subtitle1"} gutterBottom>
              {type === "create" ? "Agregar Venta" : "Editar Venta"}
            </Typography>
          </Grid>
          <Grid container spacing={1}>
            <SelectFieldFormik
              required
              onChange={props.handleChange}
              options={Object.keys(saleTranferOptions).map((key) => ({
                _id: key,
                name: saleTranferOptions[key],
              }))}
              label="Tipo de Acción"
              name="typeAction"
              xs={12}
              disabled={type === "create" ? false : true}
            />
            <AutocompleteFieldFormik
              required
              options={listAnimal}
              name="animalId"
              label="Identificación del animal"
              onChange={props.handleChange}
              defaultValue={type === "create" ? null : props.values.animal}
              xs={12}
              disabled={type === "create" ? false : true}
            />
            <TextFieldFormik
              label="Nombre"
              name="name"
              disabled
              onChange={props.handleChange}
              xs={12}
              value={
                type === "create"
                  ? props.values.animalId
                    ? listAnimal.find((e) => e._id === props.values.animalId)
                        ?.name
                    : " "
                  : initValues.animal.name
              }
            />
            <DatePickerFieldFormik
              required
              label="Fecha"
              name="date"
              onChange={props.handleChange}
              xs={12}
            />
            {props.values.typeAction === "SALE" && (
              <TextFieldFormik
                required
                label="A quien"
                name="who"
                onChange={props.handleChange}
                xs={12}
              />
            )}
            {props.values.typeAction === "TRANSFER" && (
              <AutocompleteFieldFormik
                required
                displayName={false}
                showName="name"
                options={listAgribusiness}
                name="agribusinessIdTransfer"
                label="Agronegocio de Traslado"
                onChange={props.handleChange}
                xs={12}
                defaultValue={
                  type === "create"
                    ? null
                    : listAgribusiness.find(
                        (e) => e._id === props.values.agribusinessIdTransfer
                      )
                }
                disabled={type === "create" ? false : true}
              />
            )}
            <TextFieldFormik
              required
              label="Peso"
              name="weight"
              type="number"
              onChange={props.handleChange}
              xs={12}
            />
            <TextFieldFormik
              required
              label="Valor por Lb./Kg"
              name="valueForUnitWeight"
              type="number"
              onChange={props.handleChange}
              xs={12}
            />
            <TextFieldFormik
              label="Obervaciones"
              name="observation"
              onChange={props.handleChange}
              multiline
              rows={4}
              xs={12}
            />
          </Grid>
          <Grid item container xs={12} justifyContent="space-between">
            <Grid item xs={5}>
              <ButtonFormik
                xs={12}
                label="Cancelar"
                type="cancel"
                onClick={onClickCancelButton}
              />
            </Grid>
            <Grid item xs={5}>
              <ButtonFormik xs={12} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default SaleForm;
