import { useState } from "react";
import { Grid, Chip, Dialog, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useHistory, useParams } from "react-router-dom";
import { ROUTES_DICT } from "../../../routes/routesDict";
import { useStyles } from "./styles";
import { Close } from "@material-ui/icons";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import { animalActions } from "../../../redux/actions/animal.actions";
import { deleteOptions } from "../../../constants";
import { useDispatch } from "react-redux";

export default function ChipsSection() {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [initValues] = useState({
    _id: params.animalId,
    motive: "",
    activeUpdatedOn: new Date(),
    motiveDetail: "",
  });
  const handleSubmit = (values) => {
    console.log(values);
    dispatch(animalActions.deleteElement(values)).then(
      (data) => {
        history.push(ROUTES_DICT.animalControl);
      },
      (error) => {}
    );
  };
  const validationSchema = yup.object({});

  return (
    <Grid container spacing={2} className={classes.optionContainer}>
      <Grid item>
        <Chip
          className={clsx(classes.option)}
          onClick={() => {
            history.push(ROUTES_DICT.animalControl);
          }}
          label="Inicio"
        ></Chip>
      </Grid>
      <Grid item>
        <Chip
          className={clsx(classes.option, classes.active)}
          label="Información General"
          onClick={() => {
            history.push(ROUTES_DICT.animalDetail + `/${params.animalId}`);
          }}
        ></Chip>
      </Grid>
      <Grid item>
        <Chip
          className={clsx(classes.option)}
          onClick={() => {
            history.push(ROUTES_DICT.pedigree);
          }}
          label="Pedigree"
        ></Chip>
      </Grid>
      <Grid item>
        <Chip
          className={clsx(classes.option, classes.optionDelete)}
          label="Eliminar animal"
          onClick={() => {
            setOpen(true);
          }}
        ></Chip>
      </Grid>

      <Dialog
        open={Boolean(open)}
        fullWidth
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        maxWidth="xs"
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close
          className={classes.closeBtn}
          onClick={() => {
            setOpen(false);
          }}
        />
        <Grid className={classes.modal}>
          <Typography variant={"subtitle1"} gutterBottom>
            Eliminar Registro
          </Typography>
          {/* <Typography variant={"body1"} gutterBottom>
            ¿Estas seguro de eliminar este registro?
          </Typography> */}
          <Formik
            initialValues={initValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <Grid container spacing={1}>
                  <SelectFieldFormik
                    label="Motivo"
                    name="motive"
                    onChange={props.handleChange}
                    options={deleteOptions}
                    xs={6}
                  />
                  <DatePickerFieldFormik
                    label="Fecha"
                    name="activeUpdatedOn"
                    onChange={props.handleChange}
                    xs={6}
                  />
                  <TextFieldFormik
                    label="Detalles"
                    name="motiveDetail"
                    type="text"
                    multiline
                    rows={3}
                    onChange={props.handleChange}
                    xs={12}
                  ></TextFieldFormik>
                </Grid>
                <Grid item container justifyContent={"flex-end"} xs={12}>
                  <Grid item xs={4} className={classes.paddingButton}>
                    <ButtonFormik xs={4} label="Cancelar" type="cancel" />
                  </Grid>
                  <Grid item xs={4}>
                    <ButtonFormik xs={4} label="Confirmar" type="submit" />
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
          {/* <br />
          <Grid container justifyContent="flex-end">
            <Button
              variant="contained"
              className={classes.btnCancel}
              style={{ boxShadow: "none" }}
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              style={{ boxShadow: "none" }}
              onClick={() => {
                setOpen(false);
              }}
            >
              Confirmar
            </Button>
          </Grid> */}
        </Grid>
      </Dialog>
    </Grid>
  );
}
