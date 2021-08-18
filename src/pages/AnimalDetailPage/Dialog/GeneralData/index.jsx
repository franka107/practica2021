import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { CustomForm } from '../../../../Components/CustomForm'
import { aditionalForm, generalForm, statusForm } from './constants'
import { useStyles } from './styles'

function GeneralData({ setOpen, setAnimalsList, agribusinessId }) {
  const classes = useStyles()
  const [sections] = useState([
    {
      title: '',
      form: generalForm(),
    },
  ])

  const [secondSection] = useState([
    {
      title: '',
      form: statusForm(),
    },
    {
      title: '',
      form: aditionalForm(),
    },
  ])

  return (
    <Grid className={classes.modal}>
      <Typography variant={'subtitle1'} gutterBottom>
        Datos generales
      </Typography>
      <CustomForm sections={sections} showButton={false}></CustomForm>
      <Typography variant={'subtitle1'} gutterBottom>
        Status
      </Typography>
      <CustomForm sections={secondSection} handlePrev={true}></CustomForm>
    </Grid>
  )
}

export default GeneralData
