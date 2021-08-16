const userLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "userLogin",
      { email, password },
      function (error, response) {
        if (!error) {
          const { key, firstName, email } = response.responseJSON;
          localStorage.setItem(
            "user",
            JSON.stringify({ key, firstName, email })
          );
          resolve({ key, firstName, email });
        } else {
          reject(response);
        }
      }
    );
  });
};

const userRegister = (userData) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("userRegister", userData, (error, response) => {
      if (!error) {
        resolve(response);
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
};

const UserService = {
  userLogin,
  userRegister,
};

export default UserService;
