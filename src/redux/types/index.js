const ACTION_TYPES = {
  AUTH: {
    REGISTER_SUCESS: "auth/REGISTER_SUCESS",
    REGISTER_FAIL: "auth/REGISTER_FAIL",
    LOGIN_SUCESS: "auth/LOGIN_SUCCESS",
    LOGIN_FAIL: "auth/LOGIN_FAIL",
    LOGOUT: "auth/LOGIN_LOGOUT",
  },
  UI: {
    SNACKBAR_SHOW: "ui/SNACKBAR_SHOW",
  },
  API: {
    REQUEST: "api/REQUEST",
    START: "api/START",
    END: "api/END",
    DENIED: "api/DENIED",
    ERROR: "api/ERROR",
  },
};

export default ACTION_TYPES;
