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

const update = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("farmUpdate", data, function (error, response) {
      if (!error) {
        localStorage.setItem("farm", JSON.stringify(response.responseJSON));
        resolve(response.responseJSON);
      } else {
        reject(response);
      }
    });
  });
};

function findByOwnerId(ownerId) {
  return new Promise((resolve, reject) => {
    //window.icAPI.callService(
    //  "farmGetByOwnerId",
    //  { ownerId },
    window.icAPI.callService(
      "userGetById",
      { _id: ownerId },
      (error, response) => {
        if (!error) {
          resolve(response.responseJSON?.farm);
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
}

const FarmService = {
  farmCreate,
  findByOwnerId,
  update,
};

export default FarmService;
