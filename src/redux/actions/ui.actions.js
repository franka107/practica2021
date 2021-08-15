const clearSnackbar = () => {
  return (dispatch) => {
    dispatch({ type: "SNACKBAR_CLEAR" });
  };
};

const showSnackbar = (message, severity = "success", duration = 4000) => {
  return (dispatch) => {
    dispatch({ type: "SNACKBAR_SHOW", message, severity, duration });
  };
};

export const uiActions = {
  clearSnackbar,
  showSnackbar,
};
