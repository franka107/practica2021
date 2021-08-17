const regionList = () => {
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
  regionList,
};

export default RegionService;
