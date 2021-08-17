export const sexOptions = [
  {id: 'MA', name: 'Macho'},
  {id: 'FE', name: 'Hembra'},
];

export const stateOptions = [
  {id: 'PRE', name: 'Preñada'},
  {id: 'VAC', name: 'Vacía'},
];

export const raceOptions = [
  {id: '1', name: 'Criollo Serrano', raceType: 'Bos Taurus'},
  {id: '2', name: 'Criollo Cebuino', raceType: 'Bos Indicus'},
  {id: '3', name: 'Holstein Negro', raceType: 'Bos Taurus'},
  {id: '4', name: 'Holstein Rojo', raceType: 'Bos Taurus'},
  {id: '5', name: 'Jersey', raceType: 'Bos Taurus'},
  {id: '6', name: 'Brahman Gris', raceType: 'Bos Indicus'},
  {id: '7', name: 'Brahman Rojo', raceType: 'Bos Indicus'},
  {id: '8', name: 'GYR', raceType: 'Bos Indicus'},
  {id: '9', name: 'Pardo Suizo', raceType: 'Bos Taurus'},
  {id: '10', name: 'Braunvieh Original', raceType: 'Bos Taurus'},
  {id: '11', name: 'Fleckviek DP', raceType: 'Bos Taurus'},
  {id: '12', name: 'Angus Negro', raceType: 'Bos Taurus'},
  {id: '13', name: 'Angus Rojo', raceType: 'Bos Taurus'},
  {id: '14', name: 'Hereford', raceType: 'Bos Taurus'},
  {id: '15', name: 'Charolais', raceType: 'Bos Taurus'},
  {id: '16', name: 'Guzerat', raceType: 'Bos Indicus'},
  {id: '17', name: 'Sta. Gertrudis', raceType: 'Raza Sintética'},
  {id: '18', name: 'Ayrshire', raceType: 'Bos Taurus'},
  {id: '19', name: 'Normando', raceType: 'Bos Taurus'},
  {id: '20', name: 'Shorthorn', raceType: 'Bos Taurus'},
  {id: '21', name: 'Nelore', raceType: 'Bos Indicus'},
  {id: '22', name: 'Limousine', raceType: 'Bos Taurus'},
  {id: '23', name: 'Chianina', raceType: 'Bos Taurus'},
  {id: '24', name: 'Beedmaster', raceType: 'Raza Sintética'},
  {id: '25', name: 'Guernsey', raceType: 'Bos Taurus'},
  {id: '26', name: 'Belga Azul', raceType: 'Bos Taurus'},
  {id: '27', name: 'Siimental Carne', raceType: 'Bos Taurus'},
  {id: '28', name: 'Senepol', raceType: 'Bos Taurus'},
  {id: '29', name: 'Montbeliarde', raceType: 'Bos Taurus'},
  {id: '30', name: 'Wagyu R. (Akaushi)', raceType: 'Bos Taurus'},
  {id: '31', name: 'Wagyu N. (Tajima)', raceType: 'Bos Taurus'},
  {id: '32', name: 'Braford', raceType: 'Raza Sintética'},
];

export const categoryOptions = [
  {id: '1', name: 'Reproductor'},
];

export const contactForm = (classes, setBreeder, setBornDate, setValuesSubmit) => {
  return [
    {
      name: 'identifier',
      label: 'Identificación del animal (Número de Arete)',
      type: 'input',
      required: true,
      size: {xs: 12},
    },
    {
      name: 'name',
      label: 'Nombre',
      type: 'input',
      required: true,
      size: {xs: 12},
    },
    {
      name: 'birthDate',
      label: 'Fecha de nacimiento',
      type: 'date',
      onChange: (value) => {
        setBornDate(value);
        setValuesSubmit([
          {
            name: 'herdDate',
            value
          }
        ]);
      },
      required: true,
      size: {sm: 6, xs: 12},
    },
    {
      name: 'herdDate',
      label: 'Entrada de hato',
      type: 'date',
      required: true,
      errorText: 'No puede ser menor que la fecha de nacimiento',
      size: {xs: 12, sm: 6},
    },
    {
      name: 'nroRegister',
      label: 'Nro de registro',
      type: 'input',
      disabled: true,
      size: {xs: 12},
    },
    {
      name: 'gender',
      label: 'Sexo',
      type: 'select',
      required: true,
      defaultValue: 'MA',
      options: sexOptions,
      onChange: (value) => {
        if (value === 'MA') {
          setBreeder(false);
        } else {
          setBreeder(true);
        }
      },
      size: {sm: 6, xs: 12},
    },
    {
      name: 'isReproductive',
      label: 'Categoría',
      type: 'checkbox',
      options: categoryOptions,
      size: {sm: 6, xs: 12},
    },
    {
      name: 'reproductiveStatus',
      label: 'Estado',
      type: 'select',
      required: true,
      defaultValue: 'VAC',
      options: stateOptions,
      size: {sm: 6, xs: 12},
    },
    {
      name: 'father',
      label: 'Padre',
      type: 'input',
      size: {sm: 6, xs: 12},
    },
    {
      name: 'mother',
      label: 'Madre',
      type: 'input',
      size: {sm: 6, xs: 12},
    },
  ]
};
