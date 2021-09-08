import { Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import PropTypes from "prop-types";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import CheckboxFormik from "../../../components/Inputs/CheckboxFormik";
import { typeServices } from "../../../constants";
import { useEffect } from "react";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import serviceIAMNActions from "../../../redux/actions/serviceIAMN.actions";

const defaultInitValues = {
  animalId: "",
  name: "",
  serviceDate: new Date(),
  hour: "",
  typeService: "",
  reproductor: "",
  semen: "",
  inseminator: "",
  nroStraws: "",
  genderStraw: "",
  iatf: false,
  observation: "",
};

const validationSchema = yup.object({
  // animalId: yup
  //   .string("Ingresa el tipo de movimiento")
  //   .required("Esta campo es requerido."),
  // date: yup.date("Ingresa una fecha").required("Este campo es requerido"),
  // typeService: yup
  //   .string("Ingresa el tipo de servicio")
  //   .required("Esta campo es requerido."),
});

const IAMNForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(serviceIAMNActions.listByAgribusiness());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onSubmitCreate = (values, actions) => {
    dispatch(serviceIAMNActions.create(values));
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
                {type === "create" && "Registrar servicio"}
                {type === "update" && "Editar servicio"}
              </Typography>
            </Grid>
            <TextFieldFormik
              onChange={props.handleChange}
              name="animalId"
              label="Identificación de hembra"
              xs={12}
              sm={6}
            />
            <TextFieldFormik
              onChange={props.handleChange}
              name="name"
              label="Nombre"
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
              name="hour"
              label="Hora"
              xs={12}
              sm={6}
            />
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={6}
              name="typeService"
              label="Tipo de servicio"
              options={typeServices}
              // options={Object.keys(movementOptions).map((key) => ({
              //   _id: key,
              //   name: movementOptions[key],
              // }))}
            />
            {props.values.typeService !== "I.A" ? (
              <SelectFieldFormik
                onChange={props.handleChange}
                xs={12}
                sm={6}
                name="reproductor"
                label="Reproductor"
                options={[]}
              />
            ) : (
              <SelectFieldFormik
                onChange={props.handleChange}
                xs={12}
                sm={6}
                name="semen"
                label="Semen"
                options={[]}
              />
            )}
            <SelectFieldFormik
              onChange={props.handleChange}
              xs={12}
              sm={6}
              name="inseminator"
              label="Inseminador"
              options={[]}
            />
            {props.values.typeService !== "M.N" && (
              <SelectFieldFormik
                onChange={props.handleChange}
                xs={12}
                sm={6}
                name="nroStraws"
                label="Nro de pajillas"
                options={[]}
                // options={Object.keys(movementOptions).map((key) => ({
                //   _id: key,
                //   name: movementOptions[key],
                // }))}
              />
            )}
            {props.values.typeService !== "M.N" && (
              <SelectFieldFormik
                onChange={props.handleChange}
                xs={12}
                sm={6}
                name="genderStraw"
                label="Genero de pajilla"
                options={[]}
                // options={Object.keys(movementOptions).map((key) => ({
                //   _id: key,
                //   name: movementOptions[key],
                // }))}
              />
            )}
            {props.values.typeService !== "M.N" && (
              <Grid
                sm={6}
                xs={12}
                item
                alignContent="center"
                alignItems="center"
              >
                <CheckboxFormik
                  label="I.A.T.F"
                  name="iatf"
                  onChange={props.handleChange}
                  // checked={values.isReproductive}
                ></CheckboxFormik>
              </Grid>
            )}
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

IAMNForm.propTypes = {
  type: PropTypes.oneOf(["create", "update"]).isRequired,
  onClickCancelButton: PropTypes.func,
  initValues: PropTypes.object,
};

export default IAMNForm;
