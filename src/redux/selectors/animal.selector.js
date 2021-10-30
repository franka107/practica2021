export const getMaleAnimals = () => (state) =>
  state.animal.list.filter((animal) => animal.gender === "MALE");

export const getFemaleAnimals = () => (state) =>
  state.animal.list.filter((animal) => animal.gender === "FEMALE");
