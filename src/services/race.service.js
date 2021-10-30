const raceList = () => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("raceList", {}, function (error, response) {
      if (!error) {
        resolve(response.responseJSON);
      } else {
        reject(response);
      }
    });
  });
};

const RaceService = {
  raceList,
};

export default RaceService;
