import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Edit } from '@material-ui/icons'

export const columns = [
  {
    title: 'Nro Registro',
    field: 'id',
    color: true,
  },
  {
    title: 'Nombre',
    field: 'name',
    color: true,
  },
  {
    title: 'Edad',
    field: 'age',
    color: true,
  },
  {
    title: 'Estado',
    field: 'state',
    color: true,
  },
  {
    title: 'Prod. lechera',
    field: 'prodMilk',
    color: true,
  },
  {
    title: 'Fecha registro',
    field: 'registerDate',
    color: true,
  },
  {
    title: 'Acciones',
    field: 'actions',
    color: true,
  },
]

export const exampleTable = [
  {
    id: '0123',
    name: 'Larizza',
    age: '51 meses',
    state: 'Vaca seca',
    prodMilk: 'Control',
    registerDate: '12/02/2021',
    actions: (
      <>
        <IconButton aria-label="edit">
          <Edit />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
  {
    id: '0124',
    name: '-',
    age: '51 meses',
    state: 'Vaca seca',
    prodMilk: 'Control',
    registerDate: '12/02/2021',
    actions: (
      <>
        <IconButton aria-label="edit">
          <Edit />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
]
