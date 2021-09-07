const IdeasCloudApi = {
  fetch: (serviceName, body = {}) =>
    new Promise((resolve, reject) => {
      window.icAPI.callService(serviceName, body, (error, response) => {
        if (!error) {
          resolve(response.responseJSON);
        } else {
          const rejectBody = {
            message:
              (error.responseJSON && error.responseJSON.body) ||
              "Error desconocido",
          };
          reject(rejectBody);
        }
      });
    }),
};

export default IdeasCloudApi;
