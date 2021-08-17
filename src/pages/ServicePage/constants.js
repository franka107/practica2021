import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Edit } from '@material-ui/icons'

export const columns = [
  {
    title: 'Id Vaca',
    field: 'identifier',
    color: true,
  },
  {
    title: 'Nombre Vaca',
    field: 'name',
    color: true,
  },
  {
    title: 'Estado',
    field: 'state',
    color: true,
  },
  {
    title: 'Tipo de Servicio',
    field: 'typeService',
    color: true,
  },
  {
    title: 'Fecha Registro',
    field: 'registerDate',
    color: true,
  },
  {
    title: 'Responsable',
    field: 'responsable',
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
    identifier: 1,
    name: 'Sara',
    state: 'Preñada',
    typeService: 'I.A',
    registerDate: '12-02-2021',
    responsable: '003352',
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
    identifier: 1,
    name: 'Lola',
    state: 'Vacia ',
    typeService: 'M.N',
    registerDate: '12-02-2021',
    responsable: '003352',
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
