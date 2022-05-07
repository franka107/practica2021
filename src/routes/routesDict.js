export const ROUTES_SLUGS = {
  /**
   * common routes slugs
   */
  list: "list",
  create: "create",
  update: "update",
  delete: "delete",
  upload: "upload",
  view: "view",
  detail: "detail",
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
  collaborator: "collaborator",
  graphics: "graphics",
};

export const ROUTES_DICT = {
  root: "/",
  register: `/${ROUTES_SLUGS.register}`,
  login: `/${ROUTES_SLUGS.login}`,
  dashboard: `/${ROUTES_SLUGS.dashboard}`,
  graphics: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.graphics}`,
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
    createBulk: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animal}/list/${ROUTES_SLUGS.create}-bulk`,
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
  weight: {
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.weight}`,
    list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.weight}/list`,
    create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.weight}/list/${ROUTES_SLUGS.create}`,
    update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.weight}/list/:_id/${ROUTES_SLUGS.update}`,
    delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.weight}/list/:_id/${ROUTES_SLUGS.delete}`,
  },
  sale: {
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.sale}`,
    list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.sale}/list`,
    create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.sale}/list/${ROUTES_SLUGS.create}`,
    update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.sale}/list/:_id/${ROUTES_SLUGS.update}`,
    delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.sale}/list/:_id/${ROUTES_SLUGS.delete}`,
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
  },
  account: `/${ROUTES_SLUGS.account}/${ROUTES_SLUGS.update}`,
  profile: `/${ROUTES_SLUGS.profile}`,
  users: {
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.user}`,
    list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.user}/list`,
    create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.user}/list/${ROUTES_SLUGS.create}`,
    update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.user}/list/:_id/${ROUTES_SLUGS.update}`,
    delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.user}/list/:_id/${ROUTES_SLUGS.delete}`,
  },
  plan: `/${ROUTES_SLUGS.plan}`,
  hacienda: {
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}`,
    farm: {
      root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.farm}`,
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.farm}/:_id/${ROUTES_SLUGS.update}`,
      image: {
        upload: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.farm}/:_id/${ROUTES_SLUGS.upload}`,
      },
    },
    agribusiness: {
      root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.agribusiness}`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.agribusiness}/${ROUTES_SLUGS.create}`,
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.agribusiness}/:_id/${ROUTES_SLUGS.update}`,
      image: {
        upload: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.agribusiness}/:_id/${ROUTES_SLUGS.upload}`,
      },
    },
    collaborator: {
      root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.collaborator}`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.collaborator}/${ROUTES_SLUGS.create}`,
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.collaborator}/:_id/${ROUTES_SLUGS.update}`,
      delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.hacienda}/${ROUTES_SLUGS.collaborator}/:_id/${ROUTES_SLUGS.delete}`,
    },
  },
  emailVerified: `/${ROUTES_SLUGS.emailVerified}`,
  pregnancies: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.pregnancies}`,
  animalDetail: {
    pedigree: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.pedigree}`,
    root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}`,
    detail: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}`,
    delete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}/${ROUTES_SLUGS.delete}`,
    general: {
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}/general/${ROUTES_SLUGS.update}`,
    },
    race: {
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}/race/${ROUTES_SLUGS.update}`,
    },
    birth: {
      list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/birth/${ROUTES_SLUGS.list}`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}/birth/${ROUTES_SLUGS.create}`,
    },
    calendar: {
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}/calendar/${ROUTES_SLUGS.update}`,
    },
    service: {
      list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/ia/${ROUTES_SLUGS.list}`,
      ia: {
        create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}/ia/${ROUTES_SLUGS.create}`,
      },
      transfer: {
        create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}/transfer/${ROUTES_SLUGS.create}`,
      },
    },
    palpation: {
      list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.palpation}/${ROUTES_SLUGS.list}`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}/${ROUTES_SLUGS.palpation}/${ROUTES_SLUGS.create}`,
    },
    other: {
      update: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}/other/${ROUTES_SLUGS.update}`,
    },
    milk: {
      list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.milk}/${ROUTES_SLUGS.list}`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}/${ROUTES_SLUGS.milk}/${ROUTES_SLUGS.create}`,
    },
    weight: {
      list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.weight}/${ROUTES_SLUGS.list}`,
      create: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}/${ROUTES_SLUGS.weight}/${ROUTES_SLUGS.create}`,
    },
    image: {
      upload: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}/image/${ROUTES_SLUGS.upload}`,
    },
    qr: {
      view: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.animalDetail}/:_id/${ROUTES_SLUGS.detail}/qr/${ROUTES_SLUGS.view}`,
    },
  },
  recoverPassword: `/${ROUTES_SLUGS.recoverPassword}`,
  setup: `/${ROUTES_SLUGS.setup}`,
};
