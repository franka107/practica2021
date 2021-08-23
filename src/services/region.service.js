const getAll = () => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("regionList", {}, function (error, response) {
      if (!error) {
        resolve(response.responseJSON);
      } else {
        reject(response);
      }
    });
  });
};

const RegionService = {
  getAll,
};

export default RegionService;
