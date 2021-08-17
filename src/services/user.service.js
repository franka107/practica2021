const userLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "userLogin",
      { email, password },
      function (error, response) {
        if (!error) {
          localStorage.setItem("user", JSON.stringify(response.responseJSON));
          resolve(response.responseJSON);
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
};

const userUpdate = (data) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService("userUpdate", data, (error, response) => {
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
};

const sendVerificationEmail = ({ email }) => {
  return new Promise((resolve, reject) => {
    window.icAPI.callService(
      "sendVerificationEmail",
      { email },
      (error, response) => {
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
      }
    );
  });
};

const UserService = {
  userLogin,
  userRegister,
  sendVerificationEmail,
  userUpdate,
};

export default UserService;
