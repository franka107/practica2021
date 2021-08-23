import { ReactComponent as ARS } from "../../../assets/flags/argentina.svg";
import { ReactComponent as BRL } from "../../../assets/flags/brazil.svg";
import { ReactComponent as CAD } from "../../../assets/flags/canada.svg";
import { ReactComponent as CHF } from "../../../assets/flags/chile.svg";
import { ReactComponent as COP } from "../../../assets/flags/colombia.svg";
import { ReactComponent as CUP } from "../../../assets/flags/ecuador.svg";
import { ReactComponent as EUR } from "../../../assets/flags/european-union.svg";
import { ReactComponent as JPY } from "../../../assets/flags/japan.svg";
import { ReactComponent as MXN } from "../../../assets/flags/mexico.svg";
import { ReactComponent as PEN } from "../../../assets/flags/peru.svg";
import { ReactComponent as UYU } from "../../../assets/flags/uruguay.svg";
import { ReactComponent as USD } from "../../../assets/flags/united-states-of-america.svg";

export const targetOptions = [
  { _id: "1", name: "Leche" },
  { _id: "2", name: "Doble propósito" },
  { _id: "3", name: "Carne" },
];

export const targetSystemOptions = [
  { _id: "1", name: "Extensivo" },
  { _id: "2", name: "Intensivo" },
  { _id: "3", name: "Semi-intensivo" },
];

export const unitAreaOptions = [
  { _id: "HEC", name: "Hectáreas" },
  { _id: "ACR", name: "Acres" },
];

export const unitWeightOptions = [
  { _id: "POU", name: "Libras" },
  { _id: "KIL", name: "Kilogramos" },
];

export const unitCapacityOptions = [
  { _id: "LIT", name: "Litros" },
  { _id: "KIL", name: "Kilos" },
];

export const coinOptions = [
  { _id: 1, name: "PEN", icon: PEN },
  { _id: 2, name: "COL", icon: COP },
  { _id: 3, name: "ARS", icon: ARS },
  { _id: 4, name: "CLP", icon: CHF },
  { _id: 5, name: "USD", icon: USD },
  { _id: 6, name: "BRL", icon: BRL },
  { _id: 7, name: "CAD", icon: CAD },
  { _id: 8, name: "CUP", icon: CUP },
  { _id: 9, name: "EUR", icon: EUR },
  { _id: 10, name: "JPY", icon: JPY },
  { _id: 11, name: "MXN", icon: MXN },
  { _id: 12, name: "UYU", icon: UYU },
];
