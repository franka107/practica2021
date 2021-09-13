import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  customModal: {
    padding: "1.2rem",
  },
  customModal__closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    cursor: "pointer",
  },
  chipList__container: {
    padding: "1rem 0",
    marginBottom: "0.4rem",
  },
  chipList__chip: {
    padding: "1.2rem .5rem",
    backgroundColor: theme.palette.button.tertiary,
    "&:hover": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
    },
    "&--active": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
      "&:focus": {
        backgroundColor: theme.palette.button.primary,
        color: "white",
      },
    },
  },
  form__border: {
    marginTop: ".9rem",
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: "0 1rem",
    marginBottom: "1rem",
    position: "relative",
  },
  form__raceContainer: {
    padding: "1rem 0",
  },
  form__raceContainer__deleteIcon: {
    cursor: "pointer",
    marginLeft: theme.spacing(1),
  },
  form__raceContainer__errorMessage: {
    color: "red",
    textAlign: "center",
  },
  form__raceContainer__addBtn: {
    position: "absolute",
    right: -12,
    bottom: 7,
    backgroundColor: "white",
    cursor: "pointer",
  },
}));
