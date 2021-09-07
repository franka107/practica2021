import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  planSection: {
    padding: "10rem",
    paddingBottom: "7.5rem",
    margin: "5rem 0",
    [theme.breakpoints.down("sm")]: {
      padding: "6rem 1rem",
      margin: "1rem 0",
    },
    [theme.breakpoints.down("md")]: {
      padding: "6rem 3rem",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "1rem 0",
      padding: "3rem 1rem",
    },
  },
  text: {
    padding: "0 18rem",
    [theme.breakpoints.down("md")]: {
      padding: "0 5rem",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 2rem",
    },
  },
}));
