import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => (
  {
    modal: {
      padding: '2.5rem',
    },
    closeBtn: {
      position: 'absolute',
      right: 10,
      top: 10,
      cursor: 'pointer',
    },
    searchInputContainer: {
      padding: '0 .5rem',
      borderRadius: '25px !important',
      borderColor: 'rgba(0, 0, 0, 0.24) !important',
      border: `1px solid !important`,
      backgroundColor: `${theme.palette.primary.light} !important`,
      '&:hover': {
        padding: '0 .5rem',
        borderRadius: '25px !important',
        borderColor: 'rgba(0, 0, 0, 0.24) !important',
        border: `1px solid !important`,
        backgroundColor: `${theme.palette.primary.light} !important`,
      },

      [theme.breakpoints.down('sm')]: {
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
      '&$focused': {
        backgroundColor: `inherit !important`,
        border: `0px solid !important`,
      },
      '&$active': {
        backgroundColor: `inherit !important`,
        border: `0px solid !important`,
      },
    },
    advancedSearch: {
      marginLeft: '.5rem',
      maxWidth: '100%',
      width: 'fit-content',
      cursor: 'pointer',
      color: theme.palette.secondary.main,
      textAlign: 'center',
      padding: '.95rem 1rem',
      height: '100%',
      borderRadius: 25,
      border: `1px solid ${theme.palette.secondary.main}`,
      [theme.breakpoints.down('xs')]: {
        marginTop: '1rem',
      },
      [theme.breakpoints.down('md')]: {
        padding: '.5rem 1rem',
      },
      '&:hover': {
        backgroundColor: `inherit !important`,
        opacity: .5
      },
    },
    dateTitle: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    dateInput: {
      width: 'min-content',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    clearFields: {
      color: theme.palette.secondary.main,
      cursor: 'pointer',
      textAlign: 'end',
      position: 'absolute',
      bottom: '-2rem'
    },
    extraFields: {
      position: 'relative',
    },
  }
));
