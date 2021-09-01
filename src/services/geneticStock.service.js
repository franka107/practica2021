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

const geneticStockList = () => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "geneticStockList",
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

const GeneticStockService = {
  geneticStockCreate,
  geneticStockList,
};

export default GeneticStockService;
