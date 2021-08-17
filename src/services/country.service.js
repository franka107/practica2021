const countryList = () => {
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
  countryList,
};

export default CountryService;
