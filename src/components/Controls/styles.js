import { makeStyles } from '@material-ui/core';


export const useStyles = makeStyles(theme => ({
  checkBoxLabel: {
    fontSize: 15,
    paddingTop: '.9rem',
  },
  label: {
    paddingTop: '.9rem',
  },
  labelContainer: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
  },
  textField: {
    width: '100%',
  },
  dateField: {
    width: '100%',
    fontSize: '15px !important',
  },
  phoneInputDefault: {
    padding: '.7rem',
    lineHeight: 1.5,
    borderColor: theme.palette.primary.light,
    border: `1px solid`,
    height: '100%',
    '&:hover': {
      borderColor: theme.palette.primary.light,
      border: `1px solid`,
    },
  },
  phoneInputDefaultText: {
    lineHeight: 1.5,
    padding: 1.5,
    height: '100%',
  },
  errorPhone: {
    paddingLeft: '.8rem',
  },
  formControlContainer: {
    flexDirection: 'row !important',
    justifyContent: 'space-between !important',
  },
  checkBoxFormControl: {
    padding: '.3rem .2rem 0',
  },
  checkBoxLabelForm: {
    fontSize: 13,
  },
  inputNumber: {
    textAlign: 'end'
  }
}));
