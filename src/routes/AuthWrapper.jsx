import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { farmActions } from "../redux/actions/farm.actions";
import { useStyles } from "../styles";

/**
 * @returns {Component}
 * @description Wrapper de autentificacion que solicita datos globales de prioridad (Farm actual y Agronegocio actual)
 * @author Frank Cary Viveros <frank.cary@tecsup.edu.pe>
 */
const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const currentFarm = useSelector((state) => state.farm.current);
  const classes = useStyles();

  const { current: currentAgribusiness } = useSelector(
    (state) => state.agribusiness
  );

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!currentFarm || !currentAgribusiness) {
      dispatch(farmActions.findFarmByOwnerId(user?._id));
    }
  }, [dispatch, currentFarm, currentAgribusiness, user]);
  return (
    <>
      {!currentAgribusiness && isLoggedIn ? (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default AuthWrapper;
