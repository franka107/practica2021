import React from "react";
import { Grid, Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import AutocompleteFieldFormik from "../../../../components/Inputs/AutocompleteFieldFormik";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AnimalActions from "../../../../redux/actions/animal.actions";
import { useEffect } from "react";
import SaleActions from "../../../../redux/actions/sale.actions";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";
import { saleTranferOptions } from "../../../../constants";
import { differenceInMonths } from "date-fns";

const defaultInitValues = {
  animalId: "",
  controlDate: new Date(),
  weight: "",
  valueForUnitWeight: "",
  observation: "",
  typeAction: "SALE",
};

const SaleForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  // const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))

  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );
  // const femaleAnimals = useSelector(
  //   (state) =>
  //     state.animal.list.filter(
  //       (e) => e.gender === "FEMALE"
  //     ),
  //   shallowEqual
  // );
  const listAnimal = useSelector((state) => state.animal.list);
  //   .filter(
  //     (e) =>
  //       differenceInMonths(new Date(), new Date(e?.birthDate)) >=
  //       currentAgribusiness.isHeifer
  //   ),
  // shallowEqual

  useEffect(() => {
    if (!listAnimal || listAnimal.length === 0) {
      dispatch(AnimalActions.list());
      // console.log(differenceInMonths(new Date(), new Date(2021, 3, 1)) === 6);`
      console.log(currentAgribusiness);
      //   .filter(
      //     (e) =>
      //       differenceInMonths(new Date(), new Date(e.birthDate)) ===
      //       currentAgribusiness.isHeifer
      //   ),
      // shallowEqual
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = yup.object({
    animalId: yup
      .string("Ingresa la identificacion del animal.")
      .required("Este campo es requerido."),
    controlDate: yup
      .date("Ingresa una fecha correcta.")
      .max(new Date(), "No puedes poner una fecha futura")
      .nullable(),
  });

  const handleSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        const animal = listAnimal.find((e) => e._id === values.animalId);
        await dispatch(SaleActions.create(values, animal));
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
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
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
              onChange={props.handleChange}
              options={Object.keys(saleTranferOptions).map((key) => ({
                _id: key,
                name: saleTranferOptions[key],
              }))}
              label="Tipo de Acción"
              name="typeAction"
              xs={12}
            ></SelectFieldFormik>
            <AutocompleteFieldFormik
              options={listAnimal}
              name="animalId"
              label="Identificación del animal"
              onChange={props.handleChange}
              defaultValue={type === "create" ? null : props.values.animal}
              xs={12}
            />
            <TextFieldFormik
              label="Nombre"
              name="name"
              disabled
              onChange={props.handleChange}
              xs={12}
              value={
                props.values.animalId
                  ? listAnimal.find((e) => e._id === props.values.animalId)
                      ?.name
                  : ""
              }
            />
            <DatePickerFieldFormik
              label="Fecha"
              name="date"
              onChange={props.handleChange}
              xs={12}
            />
            {props.values.typeAction === "SALE" && (
              <TextFieldFormik
                label="A quien"
                name="client"
                onChange={props.handleChange}
                xs={12}
              />
            )}
            {props.values.typeAction === "TRANSFER" && (
              <AutocompleteFieldFormik
                options={[]}
                name="agribussinesId"
                label="Agronegocio"
                onChange={props.handleChange}
                xs={12}
              />
            )}
            <TextFieldFormik
              label="Peso"
              name="weight"
              type="number"
              onChange={props.handleChange}
              xs={12}
            />
            <TextFieldFormik
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
