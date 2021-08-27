import { useState } from "react";
import { Grid, Chip, Dialog, Typography, Button } from "@material-ui/core";
import clsx from "clsx";
import { useHistory, useParams } from "react-router-dom";
import { ROUTES_DICT } from "../../../routes/routesDict";
import { useStyles } from "./styles";
import { Close } from "@material-ui/icons";

export default function ChipsSection() {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const [open, setOpen] = useState(false);

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
          <Typography variant={"body1"} gutterBottom>
            ¿Estas seguro de eliminar este registro?
          </Typography>
          <br />
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
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
}
