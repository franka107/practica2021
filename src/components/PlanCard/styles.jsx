import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
  planContainer : {
    padding: '2rem',
    paddingTop: '3.5rem',
    height: '100%',
    borderTop: '10px solid transparent',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '2rem',
    },
  },
  basic: {
    borderTop: `10px solid ${theme.palette.card.basic}`,
  },
  middle: {
    borderTop: `10px solid ${theme.palette.card.middle}`,
  },
  premium: {
    borderTop: `10px solid ${theme.palette.card.premium}`,
  },
  button: {
    backgroundColor: theme.palette.button.secondary,
    margin: '1.5rem 0 .8rem 0',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.button.secondary,
    },
  },
  contained: {
    backgroundColor: theme.palette.button.primary,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.button.primary,
    },
  },
  text: {
    color: theme.palette.general.contrastText,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.palette.general.contrastText,
  },
  h100: {
    height: '100%',
  },
  description: {
    padding: '1rem 0',
    fontSize: 17,
  },
  footer: {
    padding: '1rem 0 4rem 0',
    fontSize: 17,
    [theme.breakpoints.down('xs')]: {
      padding: '1rem 0 1rem 0',
    },
  },
}));
