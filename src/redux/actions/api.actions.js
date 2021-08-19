import ACTION_TYPES from "../types";

class ApiActions {
  apiStart(label) {
    return {
      type: ACTION_TYPES.API.START,
      payload: label,
    };
  }

  apiEnd(label) {
    return {
      type: ACTION_TYPES.API.END,
      payload: label,
    };
  }

  accessDenied(url) {
    return {
      type: ACTION_TYPES.API.DENIED,
      payload: {
        url,
      },
    };
  }

  apiError(error) {
    return {
      type: ACTION_TYPES.API.ERROR,
      error,
    };
  }

  apiAction({
    serviceName = "",
    data = {},
    onSuccess = () => {},
    onFailure = () => {},
    label = "",
    key = null,
  }) {
    return {
      type: ACTION_TYPES.API.REQUEST,
      payload: {
        serviceName,
        data,
        onSuccess,
        onFailure,
        label,
        key,
      },
    };
  }
}

export default new ApiActions();
