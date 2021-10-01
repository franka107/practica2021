import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";
import ACTION_TYPES from "../types";
import { farmActions } from "./farm.actions";
import UiActions from "./ui.actions";

class AuthActions {
  register(data) {
    return (dispatch) => {
      return AuthService.register(data).then(
        (response) => {
          dispatch({
            type: ACTION_TYPES.AUTH.REGISTER_SUCESS,
            payload: response,
          });

          return Promise.resolve();
        },
        (error) => {
          dispatch({ type: ACTION_TYPES.AUTH.REGISTER_FAIL });
          dispatch(UiActions.showSnackbar(error.message, "error"));
          return Promise.reject();
        }
      );
    };
  }

  setType(data) {
    return (dispatch) => {
      return UserService.userUpdate(data).then(
        (response) => {
          return Promise.resolve();
        },
        (error) => {
          dispatch(UiActions.showSnackbar(error.message, "error"));
          return Promise.reject();
        }
      );
    };
  }

  login(data) {
    return (dispatch) => {
      return AuthService.login(data).then(
        async (response) => {
          localStorage.setItem("user", JSON.stringify(response));
          const farm = await dispatch(
            farmActions.findFarmByOwnerId(response._id)
          );
          dispatch({
            type: ACTION_TYPES.AUTH.LOGIN_SUCESS,
            payload: response,
          });
          return Promise.resolve(farm);
        },
        (error) => {
          dispatch({ type: ACTION_TYPES.AUTH.LOGIN_FAIL, error: error });
          dispatch(UiActions.showSnackbar(error.message, "error"));
          return Promise.reject();
        }
      );
    };
  }

  logout() {
    return (dispatch) => {
      localStorage.clear();
      dispatch(farmActions.clearAll());
      dispatch({ type: ACTION_TYPES.AUTH.LOGOUT });
    };
  }
}

export default new AuthActions();
