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

const UserService = {
  userLogin,
};

export default UserService;
