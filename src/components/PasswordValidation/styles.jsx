import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
  password: {
    fontWeight: 'bold',
    letterSpacing: '-1px',
    verticalAlign: 'middle',
    display: 'flex',
    alignItems: 'flex-end',
  },
  active: {
    color: theme.palette.icon.logo,
  },
  passwordContainer: {
    paddingBottom: theme.spacing(1),
  },
}));
