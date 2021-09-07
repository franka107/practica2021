import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  modal: {
    padding: '2.5rem',
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
  buttons: {
    padding: '0 2.5rem 2rem 2.5rem',
  },
  prevBtnContainer: {
    marginRight: '.5rem',
  },
  customModal: {
    paddingBottom: 0,
  },
  customModalSystem: {
    paddingBottom: theme.spacing(4),
  },
}))
