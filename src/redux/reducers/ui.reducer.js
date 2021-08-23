export function uiReducer(state = {}, action) {
  switch (action.type) {
    case "SNACKBAR_SHOW":
      return {
        ...state,
        snackbarOpen: true,
        snackbarMessage: action.message,
        snackbarDuration: action.duration,
        snackbarSeverity: action.severity,
      };
    case "SNACKBAR_CLEAR":
      return {
        ...state,
        snackbarOpen: false,
      };
    default:
      return state;
  }
}
