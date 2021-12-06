import { Chip, Grid } from "@material-ui/core";
import clsx from "clsx";
import { useLocation, useHistory } from "react-router";
import { useStyles } from "../../styles";
import PropTypes from "prop-types";
import { Home, Add, ArtTrack, Delete } from "@material-ui/icons";

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

  const HomeIcon = (route) => {
    return (
      <Home
        className={clsx(
          classes.iconList__chip,
          location.pathname === route.path &&
            `${classes.iconList__chip}--active`
        )}
      />
    );
  };

  const AddIcon = (route) => {
    return (
      <Add
        className={clsx(
          classes.iconList__chip,
          location.pathname === route.path &&
            `${classes.iconList__chip}--active`
        )}
      />
    );
  };

  const AddBulkIcon = (route) => {
    return (
      <ArtTrack
        className={clsx(
          classes.iconList__chip,
          location.pathname === route.path &&
            `${classes.iconList__chip}--active`
        )}
      />
    );
  };

  const DeleteIcon = (route) => {
    return (
      <Delete
        className={clsx(
          classes.iconList__chip,
          location.pathname === route.path &&
            `${classes.iconList__chip}--active`
        )}
      />
    );
  };

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
              icon={
                route.icon === "home"
                  ? HomeIcon(route)
                  : route.icon === "add"
                  ? AddIcon(route)
                  : route.icon === "delete"
                  ? DeleteIcon(route)
                  : AddBulkIcon(route)
              }
              className={clsx(
                classes.chipList__chip,
                location.pathname === route.path &&
                  `${classes.chipList__chip}--active`
              )}
              onClick={() => {
                if (route.onClick) {
                  route.onClick();
                } else {
                  if (typeof route.path === "object") history.push(route.path);
                  if (typeof route.path === "string")
                    history.push(route.path, {
                      background: location,
                    });
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
