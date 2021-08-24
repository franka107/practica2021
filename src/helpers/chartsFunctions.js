import { format, parseISO } from "date-fns";
import _ from "lodash";

/**
 * @description Retorna un array con 12 elementos, con la cantidad de animales por ordenados de mes a mes por entrada hato
 * @returns [null,1,3,4,5,null,683,1,4,3,1,2]
 */
export const getGroupedByHerdDate = (animalList = []) => {
  animalList = animalList.filter((animal) => {
    if (!animal.herdDate) return null;
    const year = format(parseISO(animal.herdDate), "RRRR");
    const currentYear = format(new Date(), "RRRR");
    return year === currentYear;
  });

  const getMonthDate = (item) => {
    return format(parseISO(item.herdDate), "L") - 1;
  };

  const groupedAnimals = _.groupBy(animalList, getMonthDate);

  const result = new Array(12)
    .fill(null)
    .map((element, index) =>
      groupedAnimals[index] ? groupedAnimals[index].length : null
    );

  return result;
};
