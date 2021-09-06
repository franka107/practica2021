import { Chip, Grid } from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "../../styles";

const ChipList = ({ routes }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      spacing={2}
      xs={12}
      className={classes.chipList__container}
    >
      {routes.map((route, i) => (
        <Grid item>
          <Chip
            label={"Inventario"}
            className={clsx(
              classes.chipList__chip,
              `${classes.chipList__chip}--active`
            )}
            onClick={() => {}}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ChipList;
