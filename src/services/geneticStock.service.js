const geneticStockCreate = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "geneticStockCreate",
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

const geneticStockListByAgribusiness = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "geneticStockListByAgribusiness",
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

const geneticStockGetById = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "geneticStockGetById",
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

const geneticStockUpdate = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "geneticStockUpdate",
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

const geneticStockDelete = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "geneticStockDelete",
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

const GeneticStockService = {
  geneticStockCreate,
  geneticStockListByAgribusiness,
  geneticStockGetById,
  geneticStockDelete,
  geneticStockUpdate,
};

export default GeneticStockService;
