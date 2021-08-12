import { types } from "../actionTypes";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    window.icAPI.callService("animalList", {}, function (error, response) {
      console.log(response);
      dispatch(login(123, "Pedro"));
    });
    // setTimeout(() => {
    //   dispatch(login(123, "Pedro"));
    // }, 3500);
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
