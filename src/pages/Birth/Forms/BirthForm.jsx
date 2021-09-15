import { Divider, Grid, Typography } from "@material-ui/core";
import { Formik } from "formik";
import PropTypes from "prop-types";
import * as yup from "yup";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import MultipleCheckboxFormik from "../../../components/Inputs/MultipleCheckboxFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import { categoryOptions } from "../../../constants";
import { useStyles } from "../../../styles";
const defaultInitValues = {};

const BirthForm = ({
  initValues = defaultInitValues,
  type = "create",
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const validationSchema = () => yup.lazy((values) => yup.object({}));
  const classes = useStyles();

  const onSubmit = async (values, actions) => {
    try {
      if (type === "create") {
        //await dispatch(MovementActions.create(transformedValues, geneticType));
      }
      if (type === "update") {
        //await dispatch(MovementActions.update(transformedValues, geneticType));
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
        <form onSubmit={props.handleSubmit} className={classes.formStyle}>
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant={"subtitle2"}>Datos Generales</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <TextFieldFormik
              label="Diagnóstico"
              name="diagnosis"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
            ></TextFieldFormik>
            <TextFieldFormik
              label="Cond. Corp"
              name="condCorp"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
            ></TextFieldFormik>
            <DatePickerFieldFormik
              label="Fecha de Preñez"
              name="pregnancyDate"
              onChange={props.handleChange}
              lg={4}
              sm={4}
              xs={12}
            ></DatePickerFieldFormik>
            <SelectFieldFormik
              onChange={props.handleChange}
              label="Estado"
              name="state"
              lg={4}
              sm={4}
              xs={12}
            ></SelectFieldFormik>
            <SelectFieldFormik
              onChange={props.handleChange}
              label="Estado"
              name="state"
              lg={4}
              sm={4}
              xs={12}
            ></SelectFieldFormik>
            <TextFieldFormik
              label="Cond. Corp"
              name="condCorp"
              onChange={props.handleChange}
              rows={2}
              multiline
              xs={12}
            ></TextFieldFormik>
            <DatePickerFieldFormik
              label="Fecha de Preñez"
              name="pregnancyDate"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
            ></DatePickerFieldFormik>
            <DatePickerFieldFormik
              label="Fecha de Preñez"
              name="pregnancyDate"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
            ></DatePickerFieldFormik>
            <Grid
              lg={6}
              sm={6}
              xs={12}
              container
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <MultipleCheckboxFormik
                name="finding"
                options={[]}
                onChange={props.handleChange}
              ></MultipleCheckboxFormik>
            </Grid>
            <TextFieldFormik
              label="Diagnóstico"
              name="diagnosis"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
              disabled
            ></TextFieldFormik>
          </Grid>
          <Grid container spacing={1} className={classes.formStyle}>
            <Grid item>
              <Typography variant={"subtitle2"}>Nacimientos</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} className={classes.borderBirth}>
            <TextFieldFormik
              label="Cond. Corp"
              name="condCorp"
              onChange={props.handleChange}
              lg={3}
              sm={3}
              xs={12}
            ></TextFieldFormik>
            <TextFieldFormik
              label="Peso"
              name="weight"
              onChange={props.handleChange}
              lg={3}
              sm={3}
              xs={12}
            ></TextFieldFormik>
            <TextFieldFormik
              label="Dias Abiertos"
              name="daysOpen"
              onChange={props.handleChange}
              lg={3}
              sm={3}
              xs={12}
            ></TextFieldFormik>
            <TextFieldFormik
              label="Dias Abiertos"
              name="daysOpen"
              onChange={props.handleChange}
              lg={3}
              sm={3}
              xs={12}
            ></TextFieldFormik>
          </Grid>
          <br />
          <Divider />
          <br />
          <Grid container spacing={1}>
            <TextFieldFormik
              label="Potrero"
              name="paddock"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
              disabled
            ></TextFieldFormik>
            <TextFieldFormik
              label="Grupo"
              name="group"
              onChange={props.handleChange}
              lg={6}
              sm={6}
              xs={12}
              disabled
            ></TextFieldFormik>
          </Grid>
          <Grid item container justifyContent={"flex-end"} xs={12}>
            <Grid item xs={3} className={classes.paddingButton}>
              <ButtonFormik xs={3} label="Cancelar" type="cancel" />
            </Grid>
            <Grid item xs={3}>
              <ButtonFormik xs={3} label="Siguiente" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

BirthForm.propTypes = {
  initValues: PropTypes.object,
  type: PropTypes.string,
  onCompleteSubmit: PropTypes.func,
  onClickCancelButton: PropTypes.func,
};

export default BirthForm;
