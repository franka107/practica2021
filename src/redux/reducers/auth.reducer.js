import ACTION_TYPES from "../types";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.AUTH.REGISTER_SUCESS:
      return { ...state, current: payload };
    case ACTION_TYPES.AUTH.REGISTER_FAIL:
      return {
        ...state,
      };
    case ACTION_TYPES.AUTH.LOGIN_SUCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case ACTION_TYPES.AUTH.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case ACTION_TYPES.AUTH.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
}
