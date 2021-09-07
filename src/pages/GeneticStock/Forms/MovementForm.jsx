import { Formik } from "formik";
import * as yup from "yup";

const defaultInitValues = {
  geneticStockId: "",
  movementType: "",
  date: new Date(),
  observation: "",
  quantity: 0,
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
  observation: yup.string("Ingresa una observación"),
  quantity: yup
    .number("Ingrese solo números")
    .required("Este campo es requerido"),
  unitValue: yup
    .number("Ingrese solo números")
    .required("Este campo es requerido"),
  saleAccount: yup.string("Ingresa una cuenta"),
  description: yup.string("Ingresa una descripción"),
  toWho: yup.string("Ingresa información"),
});

const MovementForm = ({ initValues = defaultInitValues }) => {
  const onSubmit = (values, actions) => {};
  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    ></Formik>
  );
};

export default MovementForm;
