import { Chip, Grid } from "@material-ui/core";
import clsx from "clsx";
import { useLocation, useHistory } from "react-router";
import { useStyles } from "../../styles";
import PropTypes from "prop-types";

/**
 * @component
 * @description Renderiza una lista de chips con rutas, componente util para mayoria de vistas,
 *  el diseño del chip cambiara a activo si la ruta actual coincide con la del chip
 * @author Frank Cary Viveros <frank.cary@tecsup.edu.pe>
 */
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

ChipList.propTypes = {
  /**
   * Array con rutas
   */
  routes: PropTypes.array,
};

export default ChipList;
