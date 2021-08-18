import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { CustomForm } from '../../../../Components/CustomForm'
import { weighingForm } from './constants'
import { useStyles } from './styles'

function OtherData({ setOpen, setAnimalsList, agribusinessId }) {
  const classes = useStyles()
  const [sections] = useState([
    {
      title: '',
      form: weighingForm(),
    },
  ])

  return (
    <Grid className={classes.modal}>
      <Typography variant={'subtitle1'} gutterBottom>
        Leche(sugerir título)
      </Typography>
      <CustomForm sections={sections} handlePrev={true}></CustomForm>
    </Grid>
  )
}

export default OtherData
