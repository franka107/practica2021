const animalList = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("animalList", data, function (error, response) {
      if (!error) {
        resolve(response.responseJSON);
      } else {
        reject(response);
      }
    });
  });
};

const animalGetById = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("animalGetById", data, function (error, response) {
      if (!error) {
        resolve(response.responseJSON);
      } else {
        reject(response);
      }
    });
  });
};

const animalDelete = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("animalDelete", data, function (error, response) {
      if (!error) {
        resolve(response.responseJSON);
      } else {
        reject(response);
      }
    });
  });
};

const AnimalService = {
  animalList,
  animalGetById,
  animalDelete,
};

export default AnimalService;
