import { types } from "../actionTypes";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    window.icAPI.callService(
      "userLogin",
      { email, password },
      function (error, response) {
        const { key, firstName } = response.responseJSON;
        dispatch(login(key, firstName));
      }
    );
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
