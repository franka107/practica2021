import { combineReducers } from "redux";
import { authenticationReducer } from "./authentication.reducer";
import { uiReducer } from "./ui.reducer";

const rootReducer = combineReducers({
  auth: authenticationReducer,
  ui: uiReducer,
});

export default rootReducer;
