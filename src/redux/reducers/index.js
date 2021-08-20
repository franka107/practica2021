import { combineReducers } from "redux";
import { agribusinessReducer } from "./agribusiness.reducer";
import { animalReducer } from "./animal.reducer";
import { authReducer } from "./auth.reducer";
import { countryReducer } from "./country.reducer";
import { currencyReducer } from "./currency.reducer";
import { districtReducer } from "./district.reducer";
import { farmReducer } from "./farm.reducer";
import { regionReducer } from "./region.reducer";
import { uiReducer } from "./ui.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  country: countryReducer,
  region: regionReducer,
  district: districtReducer,
  farm: farmReducer,
  animal: animalReducer,
  currency: currencyReducer,
  agribusiness: agribusinessReducer,
});

export default rootReducer;
