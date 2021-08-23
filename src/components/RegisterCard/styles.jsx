import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    padding: '.5rem',
  },
  registerContainer: {
    padding: '2rem',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      padding: '1.5rem',
    },
  },
  registerText: {
    padding: '3rem 0',
  },
  registerSecondaryText: {
    color: theme.palette.secondary.main,
    opacity: .7,
  },
  button: {
    marginTop: '15rem',
    marginBottom: '5rem',
    width: '100%',
  },
  bannerContainer: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.only('xs')]: {
      height: '30rem',
    },
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));
