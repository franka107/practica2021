class AuthService {
  login(data) {
    return new Promise((resolve, reject) => {
      window.icAPI.callService("userLogin", data, function (error, response) {
        if (!error) {
          localStorage.setItem("user", JSON.stringify(response.responseJSON));
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

  register(userData) {
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
  }

  sendVerificationEmail({ email }) {
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
  }
}

export default new AuthService();
