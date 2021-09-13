export const ROUTES_SLUGS = {
  register: "register",
  login: "login",
  dashboard: "dashboard",
  geneticStock: "genetic-stock",
  semen: "semen",
  movements: "movements",
  embryo: "embryo",
  colective: "colective",
  sale: "sale",
  service: "service",
  iamn: "I.A-M.N",
  embryoTransfer: "transfer-embryo",
  /* common routes slugs */
  create: "create",
  update: "update",
  delete: "delete",
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
    },
    movements: {
      root: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/${ROUTES_SLUGS.movements}`,
      list: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/${ROUTES_SLUGS.movements}/list`,
    },
  },
  semen: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/${ROUTES_SLUGS.semen}`,
  embryo: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/${ROUTES_SLUGS.embryo}`,
  movements: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/${ROUTES_SLUGS.movements}`,
  movementsCreate: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/${ROUTES_SLUGS.movements}/${ROUTES_SLUGS.create}`,
  movementsUpdate: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/:geneticType/${ROUTES_SLUGS.movements}/:_id/${ROUTES_SLUGS.update}`,
  embryoCreate: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/${ROUTES_SLUGS.embryo}/${ROUTES_SLUGS.create}`,
  embryoUpdate: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/${ROUTES_SLUGS.embryo}/:_id/${ROUTES_SLUGS.update}`,
  semenCreate: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/${ROUTES_SLUGS.semen}/${ROUTES_SLUGS.create}`,
  semenUpdate: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.geneticStock}/${ROUTES_SLUGS.semen}/:_id/${ROUTES_SLUGS.update}`,
  service: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.service}`,
  iamnCreate: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.service}/${ROUTES_SLUGS.iamn}/${ROUTES_SLUGS.create}`,
  iamnUpdate: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.service}/${ROUTES_SLUGS.iamn}/:id/${ROUTES_SLUGS.update}`,
  embryoTransferCreate: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.service}/${ROUTES_SLUGS.embryoTransfer}/${ROUTES_SLUGS.create}`,
  embryoTransferUpdate: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.service}/${ROUTES_SLUGS.embryoTransfer}/:id/${ROUTES_SLUGS.update}`,
  serviceDelete: `/${ROUTES_SLUGS.dashboard}/${ROUTES_SLUGS.service}/:id/${ROUTES_SLUGS.delete}`,
  account: "/cuenta",
  profile: "/perfil",
  users: "/usuario",
  plan: "/plan",
  hacienda: "/hacienda",
  sale: "/dashboard/colectiva-ventas",
  weight: "/dashboard/colectiva-pesaje",
  zeal: "/dashboard/colectiva-celos",
  birth: "/dashboard/nacimientos",
  palpations: "/dashboard/palpaciones",
  emailVerified: "/email-verified",
  pregnancies: "/dashboard/preñeces",
  animalDetail: "/dashboard/detalles-animal",
  pedigree: "/dashboard/detalles-animal/:animalId/pedigree",
  animalControl: "/dashboard/control-animal",
  recoverPassword: "/recover-password",
  setup: "/setup",
};
