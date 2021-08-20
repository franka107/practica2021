const getAll = () => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("countryList", {}, function (error, response) {
      if (!error) {
        resolve(response.responseJSON);
      } else {
        reject(response);
      }
    });
  });
};

const CountryService = {
  getAll,
};

export default CountryService;
