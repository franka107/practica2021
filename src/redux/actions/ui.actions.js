class UiActions {
  clearSnackbar = () => {
    return (dispatch) => {
      dispatch({ type: "SNACKBAR_CLEAR" });
    };
  };

  showSnackbar = (message, severity = "success", duration = 4000) => {
    return (dispatch) => {
      dispatch({ type: "SNACKBAR_SHOW", message, severity, duration });
    };
  };
}

export default new UiActions();
