import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.button.primary,
    textDecoration: 'underline'
  },
  description: {
    paddingBottom: '2rem'
  },
  contentDialog: {
    pointerEvents: 'none'
  }
}));
