export const unitAreaOptions = [
  { _id: "HECTARES", name: "Hectáreas" },
  { _id: "ACRES", name: "Acres" },
];

export const unitWeightOptions = [
  { _id: "POUNDS", name: "Libras" },
  { _id: "KILOGRAMS", name: "Kilogramos" },
];

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
};

export const sexOptions = [
  { _id: "MALE", name: "Macho" },
  { _id: "FEMALE", name: "Hembra" },
];

export const racialTypeOptions = [
  { _id: "BULLFIGHTING", name: "Toreo" },
  { _id: "ZEBU", name: "Zebu" },
  { _id: "HALF_BLOOD", name: "Media Sangre" },
];

export const stateDictionary = {
  PREGNANT: "Preñada",
  EMPTY: "Vacía",
};

export const stateOptions = [
  { _id: "PREGNANT", name: "Preñada" },
  { _id: "EMPTY", name: "Vacía" },
];

export const deleteOptions = [
  { _id: "DEATH", name: "Muerte" },
  { _id: "SELF_CONSUMPTION", name: "Autoconsumo" },
  { _id: "SALE", name: "Venta" },
  { _id: "OTHERS", name: "Otros" },
];

export const categoryOptions = [{ _id: "1", name: "Reproductor" }];

export const movementOptions = {
  SALE: "Venta",
  SERVICE: "Servicio",
};

export const typeServices = [
  { _id: "I.A", name: "I.A" },
  { _id: "M.N", name: "M.N" },
];
