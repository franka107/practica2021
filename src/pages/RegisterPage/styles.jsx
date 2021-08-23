import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  titleContainer: {
    padding: "1rem 0",
    textAlign: "center",
  },
  title: {
    color: theme.palette.general.contrastText,
    fontWeight: 600,
    fontSize: 25,
  },
  subtitle: {
    color: theme.palette.primary.contrastText,
    fontSize: 13,
    fontWeight: 600,
    opacity: 0.5,
  },
  googleBtn: {
    marginTop: "1rem",
    width: "100%",
    border: `1px solid ${theme.palette.button.primary}`,
    backgroundColor: theme.palette.primary.main,
    padding: ".2rem",
    borderRadius: 0,
  },
  googleBtnText: {
    width: "80%",
    fontSize: 15,
    fontWeight: 800,
  },
  logo: {
    cursor: "pointer",
    width: "15rem",
    margin: "auto",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      width: "10rem",
    },
  },
  resetPassword: {
    marginLeft: "auto",
    textAlign: "right",
  },
  registerBtn: {
    margin: "1rem 0",
    backgroundColor: theme.palette.button.primary,
    color: "white",
    width: "100%",
    "&:hover": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
    },
  },
  fbIcon: {
    fontSize: "30px !important",
    margin: ".1rem 0",
  },
  cssLabel: {
    color: theme.palette.primary.contrastText,
    width: "100%",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: `${theme.palette.primary.contrastText} !important`,
  },
  checkBox: {
    color: theme.palette.button.primary,
    borderColor: `${theme.palette.button.primary} !important`,
  },
  checkBoxLabel: {
    fontSize: 13,
    paddingTop: "1rem",
  },
  link: {
    color: theme.palette.button.primary,
    textDecoration: "underline",
  },
  button: {
    marginTop: "1rem",
    marginBottom: "1rem",
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  registerPhone: {
    marginRight: 0,
    marginLeft: "auto",
    color: theme.palette.secondary.main,
    cursor: "pointer",
    fontSize: 13,
  },
  emailInput: {
    backgroundColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  phoneInput: {
    padding: ".7rem !important",
    borderColor: "rgba(0, 0, 0, 0.24) !important",
    border: `1px solid !important`,
    height: "100% !important",
    backgroundColor: `${theme.palette.secondary.light} !important`,
    "&:hover": {
      backgroundColor: `${theme.palette.secondary.light} !important`,
      borderColor: `${theme.palette.secondary.light} !important`,
      border: `1px solid !important`,
    },
  },
}));
