export const categoryOptions = [
  { id: '1', name: 'Descornado' },
  { id: '2', name: 'Herrado' },
  { id: '3', name: 'Podología' },
]

export const weighingForm = () => [
  {
    name: 'lastParto',
    label: 'Potrero',
    type: 'date',
    required: true,
    size: { sm: 4, xs: 12 },
  },
  {
    name: 'iec',
    label: 'Grupo',
    type: 'input',
    required: true,
    size: { sm: 4, xs: 12 },
  },
  {
    name: 'lastPalpation',
    label: 'Lote',
    type: 'date',
    required: true,
    size: { sm: 4, xs: 12 },
  },
  {
    name: 'isReproductive',
    type: 'checkbox',
    options: categoryOptions,
    size: { xs: 12 },
  },
]
