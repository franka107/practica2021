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
import { serviceReducer } from "./service.reducer";
import { birthReducer } from "./birth.reducer";
import { milkControlReducer } from "./milkControl.reducer";
import { palpationReducer } from "./palpation.reducer";
import { zealReducer } from "./zeal.reducer";
import { weightReducer } from "./weight.reducer";
import { saleReducer } from "./sale.reducer";
import { associationReducer } from "./association.reducer";
import { dryingReducer } from "./drying.reducer";

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
  service: serviceReducer,
  birth: birthReducer,
  milk: milkControlReducer,
  palpation: palpationReducer,
  zeal: zealReducer,
  weight: weightReducer,
  sale: saleReducer,
  association: associationReducer,
  drying: dryingReducer,
});

//const rootReducer = (state, action) => {
//  return appReducer(state, action);
//};

export default rootReducer;
