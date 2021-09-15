import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid } from '@material-ui/core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignal } from '@fortawesome/free-solid-svg-icons';
import { columns, exampleTable } from './constants'
import { useStyles } from './styles'
// import { useApolloClient } from '@apollo/client';
import CustomMaterialTable from '../../../Components/CustomMaterialTable'
import DryingHeader from './DryingHeader'

function Drying() {
  const history = useHistory()
  // const client = useApolloClient();
  const [animalsList, setAnimalsList] = useState(exampleTable)
  // const [agribusinessId, setAgribusinessId] = useState(null);
  // const [addAnimal, setAddAnimal] = useState(0);
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)
  const [currentPage, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  // const [search, setSearch] = useState('');
  // const [uploadFile, setUploadFile] = useState(0);
  // const [filterValues, setFilter] = useState({});

  const { state = {} } = history.location
  const classes = useStyles()

  return (
    <Grid container xs={12}>
      <DryingHeader />
      <Grid item xs={12} className={classes.registerContainer}>
        <CustomMaterialTable
          columns={columns}
          data={animalsList}
          filters={[
            { field: 'allRegister', type: 'text', title: 'Todos registros' },
            { field: 'allAge', type: 'text', title: 'Todas edades' },
            {
              field: 'allStates',
              type: 'text',
              title: 'Todos estados',
            },
            {
              field: 'allDates',
              type: 'date',
              title: 'Todas fechas',
            },
          ]}
          setData={setAnimalsList}
        />
      </Grid>
    </Grid>
  )
}

export default Drying
