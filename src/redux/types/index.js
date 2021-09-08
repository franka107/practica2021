const ACTION_TYPES = {
  AUTH: {
    REGISTER_SUCESS: "auth/REGISTER_SUCESS",
    REGISTER_FAIL: "auth/REGISTER_FAIL",
    LOGIN_SUCESS: "auth/LOGIN_SUCCESS",
    LOGIN_FAIL: "auth/LOGIN_FAIL",
    LOGOUT: "auth/LOGIN_LOGOUT",
  },
  UI: {
    SNACKBAR_SHOW: "ui/SNACKBAR_SHOW",
  },
  API: {
    REQUEST: "api/REQUEST",
    START: "api/START",
    END: "api/END",
    DENIED: "api/DENIED",
    ERROR: "api/ERROR",
  },
  CURRENCY: {
    RETRIEVE: "currency/RETRIEVE",
    RETRIEVE_BY_ID: "currency/RETRIEVE_BY_ID",
  },
  AGRIBUSINESS: {
    RETRIEVE: "agribusiness/RETRIEVE",
    CREATE: "agribusiness/CREATE",
    UPDATE_CURRENT: "agribusiness/UPDATE_CURRENT",
    DELETE: "agribusiness/DELETE",
  },
  MOVEMENT: {
    RETRIEVE_LIST: "movement/RETRIEVE_LIST",
    CREATE: "movement/CREATE",
    UPDATE_CURRENT: "movement/UPDATE_CURRENT",
    DELETE: "movement/DELETE",
  },
  FARM: {
    RETRIEVE_BY_OWNER_ID: "farm/RETRIEVE_BY_OWNER_ID",
    CLEAR_ALL: "farm/CLEAR_ALL",
  },
  ANIMAL: {
    UPDATE_CURRENT: "animal/UPDATE_CURRENT",
  },
  RACE: {
    RETRIEVE: "race/RETRIEVE",
  },
  GENETICSTOCK: {
    RETRIEVE: "geneticStock/RETRIEVE",
    RETRIEVE_BY_CURRENCY: "geneticStock/RETRIEVE_BY_CURRENCY",
    RETRIEVE_BY_ID: "geneticStock/RETRIEVE_BY_ID",
    UPDATE: "geneticStock/UPDATE",
    UPDATE_CURRENT: "geneticStock/UPDATE_CURRENT",
    DELETE: "geneticStock/DELETE",
    CREATE: "geneticStock/CREATE",
  },
  SERVICEIAMN: {
    RETRIEVE: "serviceIAMN/RETRIEVE",
    RETRIEVE_BY_CURRENCY: "serviceIAMN/RETRIEVE_BY_CURRENCY",
    RETRIEVE_BY_ID: "serviceIAMN/RETRIEVE_BY_ID",
    UPDATE: "serviceIAMN/UPDATE",
    UPDATE_CURRENT: "serviceIAMN/UPDATE_CURRENT",
    DELETE: "serviceIAMN/DELETE",
    CREATE: "serviceIAMN/CREATE",
  },
};

export default ACTION_TYPES;
