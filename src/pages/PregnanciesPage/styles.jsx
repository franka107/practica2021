import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  registerContainer: {
    paddingTop: '1rem',
  },
  errorsContainer: {
    paddingTop: '1rem',
  },
  paper: {
    padding: theme.spacing(3),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  charts: {
    marginTop: '1rem',
  },
  table: {
    boxShadow: 'none !important',
  },
}))
