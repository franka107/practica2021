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
    RETRIEVE: "animal/RETRIEVE",
    RETRIEVE_BY_CURRENCY: "animal/RETRIEVE_BY_CURRENCY",
    RETRIEVE_BY_ID: "animal/RETRIEVE_BY_ID",
    UPDATE: "animal/UPDATE",
    DELETE: "animal/DELETE",
    CREATE: "animal/CREATE",
  },
  RACE: {
    RETRIEVE: "race/RETRIEVE",
  },
  BIRTH: {
    RETRIEVE_LIST: "birth/RETRIEVE_LIST",
    UPDATE_CURRENT: "birth/UPDATE_CURRENT",
    DELETE: "birth/DELETE",
    CREATE: "birth/CREATE",
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
  PALPATION: {
    RETRIEVE_BY_CURRENCY: "palpation/RETRIEVE_BY_CURRENCY",
    RETRIEVE_BY_ID: "palpation/RETRIEVE_BY_ID",
    UPDATE: "palpation/UPDATE",

    RETRIEVE: "palpation/RETRIEVE",
    UPDATE_CURRENT: "paltation/UPDATE_CURRENT",
    DELETE: "palpation/DELETE",
    CREATE: "palpation/CREATE",
  },
  ZEAL: {
    RETRIEVE_BY_CURRENCY: "zeal/RETRIEVE_BY_CURRENCY",
    RETRIEVE_BY_ID: "zeal/RETRIEVE_BY_ID",
    UPDATE: "zeal/UPDATE",

    RETRIEVE: "zeal/RETRIEVE",
    UPDATE_CURRENT: "zeal/UPDATE_CURRENT",
    DELETE: "zeal/DELETE",
    CREATE: "zeal/CREATE",
  },
  MILKCONTROL: {
    RETRIEVE_BY_CURRENCY: "milk/RETRIEVE_BY_CURRENCY",
    RETRIEVE_BY_ID: "milk/RETRIEVE_BY_ID",
    UPDATE: "milk/UPDATE",

    RETRIEVE: "milk/RETRIEVE",
    UPDATE_CURRENT: "milk/UPDATE_CURRENT",
    DELETE: "milk/DELETE",
    CREATE: "milk/CREATE",
  },
  SERVICE: {
    RETRIEVE_BY_CURRENCY: "service/RETRIEVE_BY_CURRENCY",
    RETRIEVE_BY_ID: "service/RETRIEVE_BY_ID",
    UPDATE: "service/UPDATE",

    RETRIEVE: "service/RETRIEVE",
    UPDATE_CURRENT: "service/UPDATE_CURRENT",
    DELETE: "service/DELETE",
    CREATE: "service/CREATE",
  },
};

export default ACTION_TYPES;
