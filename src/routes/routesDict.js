export const ROUTES_SLUGS = {
  /**
   * common routes slugs
   */
  create: "create",
  update: "update",
  delete: "delete",
  /**
   * General routes slugs
   */
  register: "register",
  login: "login",
  emailVerified: "email-verified",
  recoverPassword: "recover-password",
  dashboard: "dashboard",
  geneticStock: "genetic-stock",
  semen: "semen",
  movements: "movements",
  embryo: "embryo",
  colective: "colective",
  service: "service",
  iamn: "I.A-M.N",
  animal: "animal",
  embryoTransfer: "transfer-embryo",
  account: "cuenta",
  profile: "perfil",
  user: "usuario",
  palpation: "palpations",
  birth: "nacimientos",
  pregnancies: "preñeces",
  plan: "plan",
  hacienda: "hacienda",
  animalDetail: "detalles-animal",
  animalControl: "control-animal",
  pedigree: "pedigree",
  setup: "setup",
  zeal: "zeal",
  association: "association",
  drying: "drying",
  sale: "sale",
  weight: "weight",
  milk: "milk",
  farm: "farm",
  agribusiness: "agribusiness",
};

export const ROUTES_DICT = {
  root: "/",
  register: `/${ROUTES_SLUGS.register}`,
  login: `/${ROUTES_SLUGS.login}`,
  dashboard: `/${ROUTES_SLUGS.dashboard}`,
  geneticStock: {
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}`,
    geneticType: {
      root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType`,
      list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/list`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/list/${ROUTES_SLUGS.create}`,
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/list/:_id/${ROUTES_SLUGS.update}`,
      delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/list/:_id/${ROUTES_SLUGS.delete}`,
    },
    movements: {
      root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/${ROUTES_SLUGS.movements}`,
      list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/${ROUTES_SLUGS.movements}/list`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/${ROUTES_SLUGS.movements}/list/${ROUTES_SLUGS.create}`,
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/${ROUTES_SLUGS.movements}/list/:_id/${ROUTES_SLUGS.update}`,
      delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/${ROUTES_SLUGS.movements}/list/:_id/${ROUTES_SLUGS.delete}`,
    },
  },
  service: {
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.service}`,
    list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.service}/list`,
    createIAMN: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.service}/list/${ROUTES_SLUGS.create}IAMN/`,
    updateIAMN: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.service}/list/:_id/${ROUTES_SLUGS.update}IAMN/`,
    updateET: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.service}/list/:_id/${ROUTES_SLUGS.update}ET/`,
    createET: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.service}/list/${ROUTES_SLUGS.create}ET/`,
    delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.service}/list/:_id/${ROUTES_SLUGS.delete}`,
  },

  birth: {
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.birth}`,
    list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.birth}/list`,
    create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.birth}/list/${ROUTES_SLUGS.create}/`,
    update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.birth}/list/:_id/${ROUTES_SLUGS.update}/`,
    delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.birth}/list/:_id/${ROUTES_SLUGS.delete}/`,
  },

  animal: {
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animal}`,
    list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animal}/list`,
    create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animal}/list/${ROUTES_SLUGS.create}`,
    update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animal}/list/:_id/${ROUTES_SLUGS.update}`,
    delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animal}/list/:_id/${ROUTES_SLUGS.delete}`,
  },
  milk: {
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.milk}`,
    list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.milk}/list`,
    create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.milk}/list/${ROUTES_SLUGS.create}`,
    update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.milk}/list/:_id/${ROUTES_SLUGS.update}`,
    delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.milk}/list/:_id/${ROUTES_SLUGS.delete}`,
  },
  palpation: {
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.palpation}`,
    list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.palpation}/list`,
    create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.palpation}/list/${ROUTES_SLUGS.create}`,
    update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.palpation}/list/:_id/${ROUTES_SLUGS.update}`,
    delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.palpation}/list/:_id/${ROUTES_SLUGS.delete}`,
  },
  collective: {
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}`,
    zeal: {
      root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.zeal}`,
      list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.zeal}/list`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.zeal}/list/${ROUTES_SLUGS.create}`,
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.zeal}/list/:_id/${ROUTES_SLUGS.update}`,
      delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.zeal}/list/:_id/${ROUTES_SLUGS.delete}`,
    },
    association: {
      root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.association}`,
      list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.association}/list`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.association}/list/${ROUTES_SLUGS.create}`,
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.association}/list/:_id/${ROUTES_SLUGS.update}`,
      delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.association}/list/:_id/${ROUTES_SLUGS.delete}`,
    },
    drying: {
      root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.drying}`,
      list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.drying}/list`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.drying}/list/${ROUTES_SLUGS.create}`,
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.drying}/list/:_id/${ROUTES_SLUGS.update}`,
      delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.drying}/list/:_id/${ROUTES_SLUGS.delete}`,
    },
    sale: {
      root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.sale}`,
      list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.sale}/list`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.sale}/list/${ROUTES_SLUGS.create}`,
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.sale}/list/:_id/${ROUTES_SLUGS.update}`,
      delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.sale}/list/:_id/${ROUTES_SLUGS.delete}`,
    },
    weight: {
      root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.weight}`,
      list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.weight}/list`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.weight}/list/${ROUTES_SLUGS.create}`,
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.weight}/list/:_id/${ROUTES_SLUGS.update}`,
      delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.colective}/${ROUTES_SLUGS.weight}/list/:_id/${ROUTES_SLUGS.delete}`,
    },
  },
  account: `/${ROUTES_SLUGS.account}`,
  profile: `/${ROUTES_SLUGS.profile}`,
  users: `/${ROUTES_SLUGS.user}`,
  plan: `/${ROUTES_SLUGS.plan}`,
  hacienda: {
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}`,
    farm: {
      root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.farm}`,
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.farm}/:_id/${ROUTES_SLUGS.update}`,
    },
    agribusiness: {
      root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.agribusiness}`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.agribusiness}/${ROUTES_SLUGS.create}`,
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.agribusiness}/:_id/${ROUTES_SLUGS.update}`,
    },
  },
  emailVerified: `/${ROUTES_SLUGS.emailVerified}`,
  pregnancies: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.pregnancies}`,
  animalDetail: {
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id`,
    delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.delete}`,
    general: {
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/general/${ROUTES_SLUGS.update}`,
    },
    race: {
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/race/${ROUTES_SLUGS.update}`,
    },
    birth: {
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/birth/${ROUTES_SLUGS.update}`,
    },
    calendar: {
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/calendar/${ROUTES_SLUGS.update}`,
    },
    service: {
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/service/${ROUTES_SLUGS.update}`,
    },
    other: {
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/other/${ROUTES_SLUGS.update}`,
    },
    milk: {
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/milk/${ROUTES_SLUGS.update}`,
    },
    weight: {
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/weight/${ROUTES_SLUGS.update}`,
    },
  },
  pedigree: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:animalId/${ROUTES_SLUGS.pedigree}`,
  recoverPassword: `/${ROUTES_SLUGS.recoverPassword}`,
  setup: `/${ROUTES_SLUGS.setup}`,
};
