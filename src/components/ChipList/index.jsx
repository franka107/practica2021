import { Chip, Grid } from "@material-ui/core";
import clsx from "clsx";
import { useLocation, useHistory } from "react-router";
import { useStyles } from "../../styles";

const ChipList = ({ routes, options }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  return (
    <Grid
      item
      container
      spacing={2}
      xs={12}
      className={classes.chipList__container}
    >
      {routes &&
        routes.map((route, i) => (
          <Grid item key={i}>
            <Chip
              label={route.key}
              className={clsx(
                classes.chipList__chip,
                location.pathname === route.path &&
                  `${classes.chipList__chip}--active`
              )}
              onClick={() => {
                if (route.onClick) {
                  route.onClick();
                } else {
                  history.push(route.path);
                }
              }}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default ChipList;
