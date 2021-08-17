const districtList = () => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("districtList", {}, function (error, response) {
      if (!error) {
        resolve(response.responseJSON);
      } else {
        reject(response);
      }
    });
  });
};

const DistrictService = {
  districtList,
};

export default DistrictService;
