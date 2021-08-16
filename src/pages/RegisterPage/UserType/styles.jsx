import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
  container: {
    padding: '1rem 0 .5rem',
    fontFamily: 'Century Gothic',
    fontSize: 14,
  },
  title: {
    color: theme.palette.general.contrastText,
    fontWeight: 600,
    fontSize: 25,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.palette.primary.contrastText,
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: '1rem',
  },
  description: {
    color: theme.palette.primary.contrastText,
    fontSize: 14,
    fontWeight: 600,
    padding: '1rem 0',
    opacity: .8,
  },
  link: {
    color: theme.palette.button.primary,
  },
  userTitle: {
    color: theme.palette.button.primary,
    fontSize: 14,
    fontWeight: 600,
  },
  userTypeContainer: {
    paddingBottom: '1rem',
  },
  itemContainer: {
    paddingTop: '.8rem',
  },
  label: {
    paddingTop: '.9rem',
    fontWeight: 'bold',
  },
  labelContainer: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
  },
  button: {
    marginTop: '10rem',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '4rem',
    },
  },
}));
