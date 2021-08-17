import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  subtitle2: {
    marginTop: "0.5rem",
  },
  button: {
    marginTop: "2rem",
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));
