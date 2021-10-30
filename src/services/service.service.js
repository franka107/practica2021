const serviceCreate = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("serviceCreate", data, function (error, response) {
      if (!error) {
        resolve(response.responseJSON);
      } else {
        reject(response);
      }
    });
  });
};

const serviceListByAgribusiness = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "serviceListByAgribusiness",
      data,
      function (error, response) {
        if (!error) {
          resolve(response.responseJSON);
        } else {
          reject(response);
        }
      }
    );
  });
};

const serviceGetById = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "serviceGetById",
      data,
      function (error, response) {
        if (!error) {
          resolve(response.responseJSON);
        } else {
          reject(response);
        }
      }
    );
  });
};

const serviceUpdate = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("serviceUpdate", data, function (error, response) {
      if (!error) {
        resolve(response.responseJSON);
      } else {
        reject(response);
      }
    });
  });
};

const serviceDelete = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("serviceDelete", data, function (error, response) {
      if (!error) {
        resolve(response.responseJSON);
      } else {
        reject(response);
      }
    });
  });
};

const ServiceService = {
  serviceListByAgribusiness,
  serviceGetById,
  serviceCreate,
  serviceUpdate,
  serviceDelete,
};

export default ServiceService;
