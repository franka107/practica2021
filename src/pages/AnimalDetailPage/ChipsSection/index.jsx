import { Grid, Typography, Chip } from "@material-ui/core";
import clsx from "clsx";
import { useHistory, useParams } from "react-router-dom";
import { ROUTES_DICT } from "../../../routes/routesDict";
import { useStyles } from "./styles";

export default function ChipsSection() {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
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
            history.push(ROUTES_DICT.pedigree);
          }}
        ></Chip>
      </Grid>
    </Grid>
  );
}
