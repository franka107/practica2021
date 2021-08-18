const farmCreate = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("farmCreate", data, function (error, response) {
      if (!error) {
        localStorage.setItem("farm", JSON.stringify(response.responseJSON));
        resolve(response.responseJSON);
      } else {
        reject(response);
      }
    });
  });
};

const FarmService = {
  farmCreate,
};

export default FarmService;
