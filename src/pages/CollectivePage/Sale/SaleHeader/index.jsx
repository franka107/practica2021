import React, { useState } from "react";
import { Chip, Grid, Typography, Dialog } from "@material-ui/core";
import clsx from "clsx";
import { Close } from "@material-ui/icons";
import { useStyles } from "./styles";

function WeightHeader() {
  const classes = useStyles();
  const [open, setOpen] = useState(0);

  return (
    <Grid item container xs={12}>
      <Typography variant={"h6"}>Colectiva / Ventas</Typography>
      <Grid container spacing={2} className={classes.optionContainer}>
        <Grid item>
          <Chip
            label={"Agregar traslado  y/o venta"}
            onClick={() => {
              setOpen(true);
            }}
            className={clsx(classes.option)}
          />
        </Grid>
      </Grid>
      <Dialog
        open={Boolean(open)}
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        maxWidth="xs"
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close className={classes.closeBtn} onClick={() => setOpen(false)} />
        <Grid className={classes.modal}>
          <Typography variant={"subtitle1"} gutterBottom>
            Agregar traslado y/o venta
          </Typography>
        </Grid>
      </Dialog>
    </Grid>
  );
}

export default WeightHeader;
