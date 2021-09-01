import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
  modal: {
    padding: '2.5rem',
  },
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
  }
}));
