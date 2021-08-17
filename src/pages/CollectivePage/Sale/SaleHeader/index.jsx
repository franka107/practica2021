import React, { useEffect, useState } from 'react'
import { Chip, Grid, Typography, Dialog } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { Close } from '@material-ui/icons'
import { CustomForm } from '../../../../Components/CustomForm'
import { dateForm } from './constants'
import { useStyles } from './styles'

function WeightHeader() {
  const classes = useStyles()
  const history = useHistory()
  const { location = {} } = history
  const [activeTab, setActiveTab] = useState('')
  const [open, setOpen] = useState(0)
  const [sections] = useState([
    {
      title: '',
      form: dateForm(),
    },
  ])

  useEffect(() => {
    const { hash = {} } = location
    const path = hash.replace('#', '')

    setActiveTab(hash ? path : '')
  }, [location])

  return (
    <Grid item container xs={12}>
      <Typography variant={'h6'}>Colectiva / Ventas</Typography>
      <Grid container spacing={2} className={classes.optionContainer}>
        <Grid item>
          <Chip
            label={'Agregar traslado  y/o venta'}
            onClick={() => {
              setOpen(true)
            }}
            className={clsx(classes.option)}
          />
        </Grid>
      </Grid>
      <Dialog
        open={Boolean(open)}
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        maxWidth="xs"
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close className={classes.closeBtn} onClick={() => setOpen(false)} />
        <Grid className={classes.modal}>
          <Typography variant={'subtitle1'} gutterBottom>
            Agregar traslado y/o venta
          </Typography>
          <CustomForm sections={sections} handlePrev={true}></CustomForm>
        </Grid>
      </Dialog>
    </Grid>
  )
}

export default WeightHeader
