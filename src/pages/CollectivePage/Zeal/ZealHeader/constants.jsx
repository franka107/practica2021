export const dateForm = () => [
  {
    name: 'date',
    label: 'Fecha',
    type: 'date',
    required: true,
    size: { sm: 12, xs: 12 },
  },
  {
    name: 'iec',
    label: 'I.E.C',
    type: 'date',
    required: true,
    size: { sm: 12, xs: 12 },
  },
  {
    name: 'observation',
    label: 'Observaciones',
    type: 'multiline',
    rows: 4,
    required: true,
    size: { sm: 12, xs: 12 },
  },
]
