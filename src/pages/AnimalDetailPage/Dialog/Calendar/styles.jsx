import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  raceInput: {
    minWidth: '100%',
  },
  raceContainer: {
    padding: '1rem 0',
  },
  border: {
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: '0 1rem',
    marginBottom: '1rem',
    position: 'relative',
  },
  addBtn: {
    position: 'absolute',
    right: -12,
    bottom: 7,
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  hidden: {
    display: 'none !important',
  },
  deleteIcon: {
    cursor: 'pointer',
    marginLeft: theme.spacing(1),
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
  categoryForm: {
    padding: '.5rem',
  },
  rightText: {
    textAlign: 'end',
  },
  cardIcon: {
    backgroundColor: '#BBD1D7',
    padding: '8px',
    marginRight: '10px',
    '&:hover': {
      backgroundColor: theme.palette.button.primary,
      color: 'white',
    },
  },
  cardIconSelected: {
    backgroundColor: theme.palette.button.primary,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.button.primary,
      color: 'white',
    },
  },
  containerIcons: {
    marginBottom: '1.5rem',
  },
  icon: {
    color: 'black',
    marginRight: '0.5rem',
  },
  nextBtn: {
    marginTop: '2rem',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  prevBtn: {
    marginTop: '2rem',
    marginRight: '.5rem',
    backgroundColor: theme.palette.button.secondary,
    margin: '1.5rem 0 .8rem 0',
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.button.secondary,
    },
  },
}))
