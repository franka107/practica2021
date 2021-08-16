import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import AnimalDescription from './AnimalDescription'
import AnimalCharts from './AnimalCharts'

function AnimalControlPage() {
  return (
    <Grid item container xs={12}>
      <Typography variant={'h6'}>Control Ganadero</Typography>
      <AnimalDescription />
      <AnimalCharts />
    </Grid>
  )
}
export default AnimalControlPage
