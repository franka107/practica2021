export const dateForm = () => [
  {
    name: 'date',
    label: 'Fecha',
    type: 'date',
    required: true,
    size: { sm: 12, xs: 12 },
  },
  {
    name: 'weight',
    label: 'Peso',
    type: 'input',
    required: true,
    size: { sm: 12, xs: 12 },
  },
  {
    name: 'controlType',
    label: 'Valor por Lb./Kg',
    type: 'input',
    required: true,
    size: { sm: 12, xs: 12 },
  },
  {
    name: 'observation',
    label: 'Observaciones',
    type: 'multiline',
    rows: 5,
    required: true,
    size: { sm: 12, xs: 12 },
  },
]
