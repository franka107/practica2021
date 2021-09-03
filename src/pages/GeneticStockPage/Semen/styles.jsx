import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  registerContainer: {
    paddingTop: "1rem",
  },
  errorsContainer: {
    paddingTop: "1rem",
  },
  optionContainer: {
    padding: "1rem 0",
  },
  option: {
    padding: "1.2rem .5rem",
    backgroundColor: theme.palette.button.tertiary,
    "&:hover": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
    },
    "&:focus": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
    },
  },
  active: {
    backgroundColor: theme.palette.button.primary,
    color: "white",
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    cursor: "pointer",
  },
  modal: {
    padding: "1.2rem",
  },
  paddingButton: {
    marginRight: "1rem",
  },
  buttonSubmit: {
    marginTop: "2rem",
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  buttonCancel: {
    marginTop: "2rem",
    width: "100%",
    backgroundColor: theme.palette.button.primary.secondary,
    color: "black",
    "&:hover": {
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
}));
