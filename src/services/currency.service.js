class CurrencyService {
  getAll() {
    return new Promise((resolve, reject) => {
      window.icAPI.callService("currencyList", {}, (error, response) => {
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
    });
  }
  get(_id) {
    return new Promise((resolve, reject) => {
      window.icAPI.callService(
        "currencyGetById",
        { _id },
        (error, response) => {
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
  }
  create() {}
  update() {}
  delete() {}
  deleteAll() {}
  findByName(name) {}
}

export default new CurrencyService();
