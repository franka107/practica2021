import { combineReducers } from "redux";
import { animalReducer } from "./animal.reducer";
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
  animal: animalReducer,
});

export default rootReducer;
