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
import { raceReducer } from "./race.reducer";
import { geneticStockReducer } from "./geneticStock.reducer";
import { movementReducer } from "./movement.reducer";

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
  race: raceReducer,
  geneticStock: geneticStockReducer,
  movement: movementReducer,
});

//const rootReducer = (state, action) => {
//  return appReducer(state, action);
//};

export default rootReducer;
