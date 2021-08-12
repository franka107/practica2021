import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
  header: {
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  footer: {
    color: theme.palette.general.main,
    cursor: 'pointer',
  },
  logo: {
    width: '11rem',
    [theme.breakpoints.down('xs')]: {
      width: '10rem',
    },
  }
}));
