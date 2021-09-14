import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { farmActions } from "../redux/actions/farm.actions";

/**
 * @returns {Component}
 * @description Wrapper de autentificacion que solicita datos globales de prioridad (Farm actual y Agronegocio actual)
 * @author Frank Cary Viveros <frank.cary@tecsup.edu.pe>
 */
const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const currentFarm = useSelector((state) => state.farm.current);

  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log("Auth wrapper reload");
    if (!currentFarm) {
      dispatch(farmActions.findFarmByOwnerId(user?._id));
    }
  }, [dispatch, currentFarm, currentAgribusiness, user]);
  return <>{children}</>;
};

export default AuthWrapper;
