import { userConstants } from "../constants/user.constants";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.USER_REGISTER_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };

    case userConstants.LOGOUT:
      return {};

    default:
      return state;
  }
}
