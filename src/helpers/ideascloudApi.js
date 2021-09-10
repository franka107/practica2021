import uiActions from "../redux/actions/ui.actions";

const IdeasCloudApi = {
  fetch: (serviceName, body = {}, dispatch, successMessage, errorMessage) =>
    new Promise((resolve, reject) => {
      window.icAPI.callService(serviceName, body, (error, response) => {
        if (!error) {
          resolve(response.responseJSON);

          dispatch &&
            dispatch(
              uiActions.showSnackbar(
                successMessage || "Proceso realizado exitosamente"
              )
            );
        } else {
          const rejectBody = {
            message:
              (error.responseJSON && error.responseJSON.body) ||
              "Error desconocido",
          };
          dispatch &&
            dispatch(
              uiActions.showSnackbar(
                errorMessage || rejectBody.message,
                "error"
              )
            );
          reject(rejectBody);
        }
      });
    }),
};

export default IdeasCloudApi;
