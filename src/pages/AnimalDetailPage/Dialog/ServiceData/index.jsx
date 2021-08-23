import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { CustomForm } from '../../../../Components/CustomForm'
import { birthForm } from './constants'
import { useStyles } from './styles'

function ServiceData({ setOpen, setAnimalsList, agribusinessId }) {
  const classes = useStyles()
  const [sections] = useState([
    {
      title: '',
      form: birthForm(),
    },
  ])

  return (
    <Grid className={classes.modal}>
      <Typography variant={'subtitle1'} gutterBottom>
        Servicios y palpación
      </Typography>
      <CustomForm sections={sections} handlePrev={true}></CustomForm>
    </Grid>
  )
}

export default ServiceData
