const create = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "agribusinessCreate",
      data,
      function (error, response) {
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
      }
    );
  });
};

const AgribusinessService = {
  create,
};

export default AgribusinessService;
