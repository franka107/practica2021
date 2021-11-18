import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  titleContainer: {
    paddingTop: "1rem",
    textAlign: "center",
  },
  form: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
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
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.button.primary,
    padding: ".2rem",
    borderRadius: 0,
  },
  googleBtnText: {
    width: "80%",
    fontSize: 15,
    fontWeight: 800,
  },
  logo: {
    margin: "auto",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      width: "10rem",
    },
  },
  link: {
    color: theme.palette.button.primary,
  },
  emailInput: {
    backgroundColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  loginBtn: {
    margin: "1rem 0",
    backgroundColor: theme.palette.button.primary,
    color: "white",
    width: "100%",
    "&:hover": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
    },
  },
  reset: {
    backgroundColor: theme.palette.button.secondary,
    width: "100%",
    "&:hover": {
      backgroundColor: theme.palette.button.secondary,
      color: "black",
    },
  },
  resetPassword: {
    marginLeft: "auto",
    textAlign: "right",
  },
  fbIcon: {
    fontSize: "30px !important",
    margin: ".1rem 0",
  },
}));
