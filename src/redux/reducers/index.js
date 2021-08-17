import { combineReducers } from "redux";
import { authenticationReducer } from "./authentication.reducer";
import { countryReducer } from "./country.reducer";
import { districtReducer } from "./district.reducer";
import { regionReducer } from "./region.reducer";
import { uiReducer } from "./ui.reducer";

const rootReducer = combineReducers({
  auth: authenticationReducer,
  ui: uiReducer,
  country: countryReducer,
  region: regionReducer,
  district: districtReducer,
});

export default rootReducer;
