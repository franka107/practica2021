import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
  titleContainer: {
    padding: '1rem 0',
    textAlign: 'center',
  },
  title: {
    color: theme.palette.general.contrastText,
    fontWeight: 500,
    padding: '.5rem 0',
  },
  subtitle: {
    color: theme.palette.primary.contrastText,
    fontSize: 13,
    fontWeight: 600,
    opacity: .5,
  },
  form: {
    marginBottom: theme.spacing(2),
  },
  modal: {
    maxWidth: 875,
  },
  prevBtn: {
    backgroundColor: theme.palette.button.secondary,
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.button.secondary,
    },
  },
  nextBtn: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  stepCounter: {
    padding: '2.5rem',
    position: 'absolute',
    right: 0,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  buttons: {
    padding: '0 2.5rem 2rem 2.5rem',
  },
  prevBtnContainer: {
    marginRight: '.5rem',
  }
}));
