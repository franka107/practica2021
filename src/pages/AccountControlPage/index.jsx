import React, { useState } from "react";
import { Dialog, Grid, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
// import { useHistory } from "react-router-dom";
import { useStyles } from "./styles";
import FormAccount from "./FormAccount";

function AccountControlPage() {
  const classes = useStyles();
  // const history = useHistory();
  // const { location = {} } = history;
  const [open, setOpen] = useState(false);

  return (
    <Grid container xs={12}>
      <Typography variant={"h6"} gutterBottom>
        Configuración Usuarios
      </Typography>
      <Grid item xs={12}>
        <Grid item xs={12} sm={6}>
          <FormAccount setOpen={setOpen} />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close className={classes.closeBtn} onClick={() => setOpen(false)} />

        <FormAccount setOpen={setOpen} />
      </Dialog>
    </Grid>
  );
}

export default AccountControlPage;
