import React from "react";
import { Grid, Typography } from "@material-ui/core";
import ButtonFormik from "../../Inputs/ButtonFormik";

const DeleteForm = ({ onClickCancelButton, onCompleteSubmit = () => {} }) => {
  const onSubmit = () => {
    onCompleteSubmit();
    onClickCancelButton();
  };

  return (
    <Grid>
      <Typography variant={"subtitle1"} gutterBottom>
        Eliminar Registro
      </Typography>
      <Typography variant={"subtitle2"} gutterBottom>
        ¿Estas seguro de eliminar este registro?
      </Typography>

      <Grid item container justifyContent={"flex-end"} xs={12}>
        {/* <Grid item xs={4} className={classes.paddingButton}> */}
        <Grid item xs={4} style={{ paddingRight: "1rem" }}>
          <ButtonFormik
            xs={4}
            label="Cancelar"
            type="cancel"
            onClick={onClickCancelButton}
          />
        </Grid>
        <Grid item xs={4}>
          <ButtonFormik
            xs={4}
            label="Confirmar"
            type="submit"
            onClick={onSubmit}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DeleteForm;
