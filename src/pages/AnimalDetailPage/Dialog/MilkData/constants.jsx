export const categoryOptions = [
  { id: '1', name: 'Descornado' },
  { id: '2', name: 'Herrado' },
  { id: '3', name: 'Podología' },
]

export const weighingForm = () => [
  {
    name: 'lastParto',
    label: 'Total de leche',
    type: 'input',
    defaultValue: '0',
    required: true,
    size: { sm: 4, xs: 12 },
  },
  {
    name: 'iec',
    label: 'Controles lácteos',
    type: 'input',
    defaultValue: '0',
    required: true,
    size: { sm: 4, xs: 12 },
  },
  {
    name: 'lastPalpation',
    label: 'Días de lactancia',
    defaultValue: '0',
    type: 'input',
    required: true,
    size: { sm: 4, xs: 12 },
  },
]
