const serviceIAMNCreate = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "serviceIAMNCreate",
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

const serviceIAMNListByAgribusiness = () => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "serviceIAMNListByAgribusiness",
      {},
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

const serviceIAMNGetById = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "serviceIAMNGetById",
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

const serviceIAMNUpdate = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "serviceIAMNUpdate",
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

const serviceIAMNDelete = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "serviceIAMNDelete",
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

const ServiceIAMNService = {
  serviceIAMNListByAgribusiness,
  serviceIAMNGetById,
  serviceIAMNCreate,
  serviceIAMNUpdate,
  serviceIAMNDelete,
};

export default ServiceIAMNService;
