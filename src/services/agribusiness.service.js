const agribusinesCreate = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "agribusinessCreate",
      data,
      function (error, response) {
        if (!error) {
          localStorage.setItem(
            "agribusiness",
            JSON.stringify(response.responseJSON)
          );
          resolve(response.responseJSON);
        } else {
          reject(response);
        }
      }
    );
  });
};

const AgribusinessService = {
  agribusinesCreate,
};

export default AgribusinessService;
