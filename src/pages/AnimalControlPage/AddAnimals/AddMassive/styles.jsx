import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
  modal: {
    padding: '2.5rem',
  },
  btn: {
    background: theme.palette.secondary.main,
    color: 'white',
  },
  alignBtn: {
    textAlign: 'center',
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  errorsContainer: {
    paddingTop: '2rem',
  },
  errorsContainerScroll: {
    overflow: 'auto',
    height: '6rem',
    padding: '2rem 0',
  },
}));
