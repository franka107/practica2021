export const generalForm = () => [
  {
    name: 'id',
    label: 'Identificación de animal',
    type: 'input',
    required: true,
    size: { xs: 12 },
  },
  {
    name: 'name',
    label: 'Nombre',
    type: 'input',
    required: true,
    size: { xs: 12 },
  },
]
export const statusForm = () => [
  {
    name: 'date',
    label: 'Fecha de nacimiento',
    type: 'date',
    required: true,
    size: { sm: 6, xs: 12 },
  },
  {
    name: 'nroRegister',
    label: 'Nro. de registro',
    type: 'input',
    required: true,
    size: { sm: 6, xs: 12 },
  },
  {
    name: 'hato',
    label: 'Entrada de hato',
    type: 'date',
    required: true,
    size: { sm: 6, xs: 12 },
  },
]

export const aditionalForm = () => [
  {
    name: 'gender',
    label: 'Sexo',
    type: 'select',
    required: true,
    size: { sm: 6, xs: 12 },
  },
  {
    name: 'category',
    label: 'Categoria',
    type: 'select',
    required: true,
    size: { sm: 6, xs: 12 },
  },
]
