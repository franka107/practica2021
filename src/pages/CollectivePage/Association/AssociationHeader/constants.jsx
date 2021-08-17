export const dateForm = () => [
  {
    name: 'idRegister',
    label: 'Nro. registro',
    type: 'input',
    required: true,
    size: { sm: 12, xs: 12 },
  },
  {
    name: 'newDate',
    label: 'Nueva fecha',
    type: 'date',
    required: true,
    size: { sm: 12, xs: 12 },
  },
  {
    name: 'breeder',
    label: 'Criador',
    type: 'input',
    required: true,
    size: { sm: 12, xs: 12 },
  },
  {
    name: 'owner',
    label: 'Propietario',
    type: 'input',
    required: true,
    size: { sm: 12, xs: 12 },
  },
  {
    name: 'observation',
    label: 'Observaciones',
    type: 'multiline',
    rows: 6,
    required: true,
    size: { sm: 12, xs: 12 },
  },
]
