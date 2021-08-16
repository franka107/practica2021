import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
  icon: {
    color: 'red',
  },
  iconAsc: {
    color: 'green',
  },
  iconDesc: {
    color: 'red',
    transform: 'rotate(180deg)',
  },
  userItemNumber: {
    color: 'black',
    fontSize: 45,
    paddingBottom: theme.spacing(1),
  },
  userItemContainer: {
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  userItemText: {
    paddingBottom: theme.spacing(1),
  },
  percentage: {
    display: 'flex',
  },
  highchart: {
    width: '100%',
    height: '100%',
  },
  container: {
    padding: '1rem 0'
  },
  percentageText: {
    fontWeight: 'bold',
  },
  descTex: {
    color: 'red',
  },
  ascText: {
    color: 'green',
  },
  highchartContainer: {
    padding: '0 1rem 0 .5rem',
    [theme.breakpoints.down('md')]: {
      padding: '1rem 0',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  cardContainer: {
    [theme.breakpoints.down('sm')]: {
      margin: 0
    },
  }
}));
