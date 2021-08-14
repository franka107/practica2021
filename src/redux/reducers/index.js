import { combineReducers } from "redux";
import { authenticationReducer } from "./authentication.reducer";

const rootReducer = combineReducers({
  auth: authenticationReducer,
});

export default rootReducer;
