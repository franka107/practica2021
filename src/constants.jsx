export const unitAreaOptions = [
  { _id: "HECTARES", name: "Hectáreas" },
  { _id: "ACRES", name: "Acres" },
];

export const unitWeightOptions = [
  { _id: "POUNDS", name: "Libras", short: "Lb." },
  { _id: "KILOGRAMS", name: "Kilogramos", short: "Kg." },
];

export const unitWeightTestOptions = {
  POUNDS: "Lb.",
  KILOGRAMS: "Kg.",
};

export const commentTypeOptions = {
  ERROR: "Error",
  IMPROVEMENT: "Mejora",
};

export const unitCapacityTestOptions = {
  LITERS: "L.",
  KILOGRAMS: "Kg.",
};

export const unitCapacityOptions = [
  { _id: "LITERS", name: "Litros" },
  { _id: "KILOGRAMS", name: "Kilos" },
];

export const targetOptions = [
  { _id: "MILK", name: "Leche" },
  { _id: "DOUBLE_PURPOSE", name: "Doble propósito" },
  { _id: "MEAT", name: "Carne" },
];

export const targetSystemOptions = [
  { _id: "EXTENSIVE", name: "Extensivo" },
  { _id: "INTENSIVE", name: "Intensivo" },
  { _id: "SEMI_INTENSIVE", name: "Semi-intensivo" },
];

export const milkingOptions = [
  { _id: "MANUAL", name: "Manual" },
  { _id: "MECHANICAL", name: "Mecánico" },
  { _id: "AUTOMATIC", name: "Automático" },
];

export const numberOptions = [
  { _id: "0", name: 0 },
  { _id: "1", name: 1 },
  { _id: "2", name: 2 },
  { _id: "3", name: 3 },
];

export const objectiveFarmOptions = [
  { _id: "FARMER_OBJECTIVE", name: "Objetivo farmero" },
];
export const productionOptions = [
  { _id: "DIRECT_MOUNT", name: "Monta Directa" },
  { _id: "ARTIFICIAL_INSEMINATION", name: "Inseminación Artificial" },
  {
    _id: "DM_&_AI",
    name: "Monta Directa/Inseminación Artificial",
  },
  {
    _id: "DM_&_AI_&_ET",
    name: "Inseminación Artificial, Monta Directa/Transferencia de embriones",
  },
];

export const sexDictionary = {
  MALE: "Macho",
  FEMALE: "Hembra",
  INDETERMINATE: "Indeterminado",
};

export const sexOptions = [
  { _id: "INDETERMINATE", name: "Indeterminado" },
  { _id: "FEMALE", name: "Hembra" },
  { _id: "MALE", name: "Macho" },
];

export const racialTypeOptions = [
  { _id: "BULLFIGHTING", name: "Taurino" },
  { _id: "ZEBU", name: "Cebuino" },
  { _id: "HALF_BLOOD", name: "Media Sangre" },
];

export const stateOptions = {
  PREGNANT: "Preñada",
  EMPTY: "Vacía",
  RECHECK: "Re-chequeo",
};

export const deleteOptions = [
  { _id: "DEATH", name: "Muerte" },
  { _id: "SELF_CONSUMPTION", name: "Autoconsumo" },
  { _id: "SALE", name: "Venta" },
  { _id: "OTHERS", name: "Otros" },
];

export const categoryOptions = { _id: "1", name: "Reproductor" };

export const movementOptions = {
  SALE: "Venta",
  PURCHASE: "Compra",
  SERVICE: "Servicio",
  OTHER: "Otros",
  MOVING: "Traslado",
};

export const operationOptions = {
  ADDITION: "Acreditar",
  SUBSTRACTION: "Debitar",
};

// export const operationOptions = {
//   ADDITION: "Adición",
//   SUBSTRACTION: "Substracción",
// };

export const typeServices = [
  { _id: "AR_IN", name: "I.A" },
  { _id: "NA_MO", name: "M.N" },
];

export const typeServicesTest = {
  AR_IN: "Inseminación Artificial",
  NA_MO: "Monta natural",
  EM_TR: "Tranferencia de embriones",
};

export const birthTypeOptions = {
  SIMPLE: "Simple",
  TWIN: "Gemelar",
  ABORTION: "Aborto",
  REABSORPTION: "Reabsorción",
  MUMMIFICATION: "Momificación",
  DEAD: "Nació muerto",
};

export const serviceStatusOptions = {
  SUCCESSFUL: "Exitoso",
  UNCERTAIN: "Incierto",
  FAILED: "Fallido",
};

export const birthDifficulyOptions = {
  EUTOCICUS: "Eutócico",
  DISTOCICUS: "Distócico",
  CEASAREAN: "Cesárea",
};

export const estadiosOptions = [
  { _id: "MO_CO", name: "Mórula Compacta" },
  { _id: "BL_TE", name: "Blastocito Temprano" },
  { _id: "BL_MA", name: "Blastocito Maduro" },
  { _id: "BL_EX", name: "Blastocito Expandido" },
  { _id: "BL_E_EC", name: "Blastocito en Eclosión" },
  { _id: "BL_EC", name: "Blastocito Eclosionado" },
];

export const qualityEmbryoOptions = [
  { _id: 1, name: "1" },
  { _id: 2, name: "2" },
];

export const conditionOptions = [
  { _id: "FROZEN", name: "Congelado" },
  { _id: "VITRIFIED", name: "Vitrificado" },
  { _id: "FRESH", name: "Fresco" },
];

export const typeEmbryonOptions = [
  { _id: "MOET", name: "In Vivo (MOET)" },
  { _id: "FIV", name: "In Vitro (FIV)" },
];

export const categoryOptionsTest = {
  REPRODUCTOR: "Reproductor",
};

export const controlTypeOptions = {
  BIRTH: "Nacimiento",
  BALANCE: "Balanza",
  WEANING: "Destete",
  YEAR: "Al año",
  PRESALE: "Pre-venta",
};

export const reasonOptions = {
  PREGNANCY: "Preñez",
  HEALTH: " Sanidad",
  ABORTION: "Aborto",
  POOR_PRODUCTION: "Producción probre",
};

export const saleTranferOptions = {
  SALE: "Venta",
  TRANSFER: "Traslado",
};

export const positionOptions = {
  ADMIN: "Administrador",
  VET: "Veterinario",
};

export const planOptions = {
  BASIC: "Básico",
  INTERMEDIATE: "Intermedio",
  PREMIUM: "Premium",
};

export const statusOptions = {
  /** Crías */
  FEMALE_BREEDING: "Cría hembra",
  MALE_BREEDING: "Cría macho",
  /** De levante */
  FEMALE_UPPED: "Hembra levante",
  MALE_UPPED: "Macho levante",
  /** Novillas/os */
  FEMALE_HEIFER: "Vaquillona Vacia",
  FEMALE_HEIFER_PREGNANT: "Vaquillona preñada",
  MALE_HEIFER_NR: "Novillo para engorde",
  MALE_HEIFER_R: "Torete",
  //FEMALE_HEIFER_PREGNANT_DRIED: "Novilla de vientre preñada y seca",
  //FEMALE_HEIFER_DRIED: "Novilla de vientre seca",
  //FEMALE_HEIFER_BIRTHED: "Novilla de vientre seca",

  /** Adultos */
  MALE_ANIMAL_R: "Toro reproductor",
  FEMALE_ANIMAL_BIRTHED: "Vaca parida",
  FEMALE_ANIMAL_PREGNANT: "Vaca preñada",
  FEMALE_ANIMAL_DRIED: "Vaca seca",
  FEMALE_ANIMAL_PREGNANT_DRIED: "Vaca preñada y seca",
  //FEMALE_ANIMAL_BIRTHED_DRIED: "Vaca parida y seca",
  /** Sin manejar */
};
