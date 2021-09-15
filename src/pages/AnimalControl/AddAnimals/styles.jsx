import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
  registerContainer: {
    padding: '1rem 0',
  },
  textSecondary: {
    color: theme.palette.secondary.main,
  },
  icon: {
    color: theme.palette.primary.main,
  },
  button: {
    borderRadius: 25,
    padding: 'auto 2rem',
    height: '100%',
  },
  buttonContainer: {
    width: 100,
  },
  closeBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
    cursor: 'pointer',
  },
  menuDropdown: {
    marginTop: '2.5rem',
    marginLeft: '1.5rem',
  },
  searchInputContainer: {
    padding: '0 .5rem',
    borderRadius: '25px !important',
    borderColor: 'rgba(0, 0, 0, 0.24) !important',
    border: `1px solid !important`,
    backgroundColor: `${theme.palette.primary.light} !important`,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.light} !important`,
      borderColor: `${theme.palette.primary.light} !important`,
      border: `1px solid !important`,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
  searchInput: {
    width: '100% !important',
    height: '100% !important',
    backgroundColor: `inherit !important`,
    border: `0px solid !important`,
    '&:hover': {
      backgroundColor: `inherit !important`,
      border: `0px solid !important`,
    },
  },
  advancedSearch: {
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('xs')]: {
      marginTop: '1rem',
    },
  },
}));
