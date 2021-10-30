import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  optionContainer: {
    padding: "1rem 0",
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    cursor: "pointer",
  },
  modal: { padding: "1.2rem" },
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
    backgroundColor: theme.palette.secondary.main,
    color: "white",
  },
}));
