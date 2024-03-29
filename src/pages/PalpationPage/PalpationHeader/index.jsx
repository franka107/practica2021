import React, { useEffect, useState } from "react";
import { Chip, Grid, Typography, Dialog, Divider } from "@material-ui/core";
import clsx from "clsx";
import { Close } from "@material-ui/icons";
import { menuList } from "../../../layouts/DashboardLayout/constants";
import { useStyles } from "./styles";
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../components/Inputs/SelectFieldFormik";

function PalpationHeader({ handleChange }) {
  const classes = useStyles();
  const [activeTab] = useState("inicio");
  const [open, setOpen] = useState(0);
  const validationSchema = yup.object({});
  const initValues = {
    touchDate: "",
    state: "",
    pregnancyDate: "",
    responsable: "",
    finding: "",
    diagnosis: "",
    condCorp: "",
    weight: "",
    daysOpen: "",
    paddock: "",
    group: "",
    lot: "",
  };

  useEffect(() => {}, []);

  const handleSubmit = (values, actions) => {};

  return (
    <Grid item container xs={12}>
      <Typography variant={"h6"}>Palpaciones</Typography>
      <Grid container spacing={2} className={classes.optionContainer}>
        {menuList[2].submenu[1].submenu.map((menu, index) => (
          <Grid item key={`option-${menu.id}`}>
            <Chip
              label={menu.title}
              onClick={() => {
                setOpen(true);
              }}
              className={clsx(
                classes.option,
                activeTab === menu.id && classes.active
              )}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={Boolean(open)}
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        maxWidth="md"
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close className={classes.closeBtn} onClick={() => setOpen(false)} />
        <Grid className={classes.modal}>
          <Typography variant={"subtitle1"} gutterBottom>
            Palpación
          </Typography>
          <Divider />
          <Formik
            initialValues={initValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit} className={classes.formStyle}>
                <Grid container spacing={1}>
                  <DatePickerFieldFormik
                    label="Fecha de Tacto"
                    name="touchDate"
                    onChange={props.handleChange}
                    lg={3}
                    sm={6}
                    xs={12}
                  ></DatePickerFieldFormik>
                </Grid>
                <Grid container spacing={1} className={classes.formDivider}>
                  <SelectFieldFormik
                    onChange={props.handleChange}
                    label="Estado"
                    name="state"
                    lg={6}
                    sm={6}
                    xs={12}
                  ></SelectFieldFormik>
                  <DatePickerFieldFormik
                    label="Fecha de Preñez"
                    name="pregnancyDate"
                    onChange={props.handleChange}
                    lg={3}
                    sm={3}
                    xs={12}
                  ></DatePickerFieldFormik>
                  <SelectFieldFormik
                    label="Responsable"
                    name="responsable"
                    onChange={props.handleChange}
                    lg={3}
                    sm={3}
                    xs={12}
                  ></SelectFieldFormik>
                  <TextFieldFormik
                    label="Hallazgo"
                    name="finding"
                    onChange={props.handleChange}
                    lg={6}
                    sm={6}
                    xs={12}
                  ></TextFieldFormik>
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
                    lg={4}
                    sm={4}
                    xs={12}
                  ></TextFieldFormik>
                  <TextFieldFormik
                    label="Peso"
                    name="weight"
                    onChange={props.handleChange}
                    lg={4}
                    sm={4}
                    xs={12}
                  ></TextFieldFormik>
                  <TextFieldFormik
                    label="Dias Abiertos"
                    name="daysOpen"
                    onChange={props.handleChange}
                    lg={4}
                    sm={4}
                    xs={12}
                  ></TextFieldFormik>
                </Grid>
                <Grid container spacing={1} className={classes.formStyle}>
                  <Grid item>
                    <Typography variant={"subtitle2"}>
                      Ubicación Palpación
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <TextFieldFormik
                    label="Potrero"
                    name="paddock"
                    onChange={props.handleChange}
                    lg={4}
                    sm={4}
                    xs={12}
                  ></TextFieldFormik>
                  <TextFieldFormik
                    label="Grupo"
                    name="group"
                    onChange={props.handleChange}
                    lg={4}
                    sm={4}
                    xs={12}
                  ></TextFieldFormik>
                  <TextFieldFormik
                    label="Lote"
                    name="lot"
                    onChange={props.handleChange}
                    lg={4}
                    sm={4}
                    xs={12}
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
        </Grid>
      </Dialog>
    </Grid>
  );
}

export default PalpationHeader;
