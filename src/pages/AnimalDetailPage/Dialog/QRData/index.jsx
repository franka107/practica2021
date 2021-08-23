import React, { useEffect, useState } from 'react'
import { Grid, Typography, CardMedia, Button } from '@material-ui/core'
import { useStyles } from './styles'

function QRData({ setOpen, setAnimalsList, agribusinessId }) {
  const classes = useStyles()

  return (
    <Grid className={classes.modal}>
      <Typography variant={'h6'} gutterBottom>
        Actualizar Foto
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        xs={5}
        style={{ margin: 'auto' }}
      >
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/1200px-Codigo_QR.svg.png"
          title="Contemplative Reptile"
          className={classes.imageFather}
        />
      </Grid>
    </Grid>
  )
}

export default QRData
