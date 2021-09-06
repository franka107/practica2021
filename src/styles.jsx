import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  chipList__container: {
    padding: "1rem 0",
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
}));
