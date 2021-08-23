import React, { useState } from 'react'
import { useStyles } from './styles'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import { Dialog, Grid, Paper, Typography } from '@material-ui/core'
import clsx from 'clsx'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import { chartData, chartDetailOptions, chartOptions } from './constants'

function Visit() {
  const classes = useStyles()
  const [openDetail, setOpenDetail] = useState(false)

  return (
    <Grid container xs={12}>
      <Grid item xs={12}>
        <Paper elevation={1} className={classes.userItemContainer}>
          <Typography
            variant={'body2'}
            align={'center'}
            className={classes.userItemText}
          >
            Visit
          </Typography>
          <Typography
            color={'primary'}
            align={'center'}
            className={classes.userItemNumber}
          >
            882
          </Typography>
          {/* <Typography
              variant={'body2'}
              align={'center'}
              className={classes.userItemText}
            >
              {chart.text}
            </Typography> */}
          <div className={classes.percentage}>
            {/* <TrendingUpIcon className={clsx(classes.icon, classes.iconAsc)} /> */}
            <TrendingUpIcon className={clsx(classes.icon, classes.iconDesc)} />
            <Typography
              variant={'body2'}
              align={'center'}
              className={clsx(
                classes.percentageText,
                classes.descTex
                // chart.percentage < 0 ? classes.descTex : classes.ascText
              )}
            >
              {/* {`${chart.percentage}%`} */}
              -9% &nbsp;
            </Typography>
            <Typography
              variant={'body2'}
              align={'center'}
              className={clsx(classes.percentageText)}
            >
              of target
            </Typography>
          </div>
        </Paper>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: 'column',
              margin: [20, 50, 60, 80],
            },
            title: {
              text: '',
            },

            series: [
              {
                type: 'column',
                colorByPoint: true,
                data: [29.9, 71.5, 30.4, 29.9, 71.5, 30.4],
                showInLegend: false,
              },
            ],
          }}
        />
      </Grid>
    </Grid>
  )
}

export default Visit
