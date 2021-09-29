import { Button, CircularProgress, Typography } from "@material-ui/core";
import { useStyles } from "../../../styles";

const AnimalBulkForm = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant={"subtitle1"}>Registro masivo</Typography>
      <Typography variant={"subtitle2"}>
        Para registro masivo de animales, descargar el siguiente documento.
      </Typography>
      <div className={classes.alignBtn}>
        <div className={classes.root}>
          <input
            accept="xlsx/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              className={classes.btn}
              endIcon={<CircularProgress size={20} />}
            >
              Registro masivo.xlsx
            </Button>
          </label>
          <input
            accept="xlsx/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
        </div>
      </div>
    </>
  );
};

export default AnimalBulkForm;
