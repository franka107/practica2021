import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  baseContainer: {
    minHeight: "100vh",
    height: "100%",
    backgroundColor: theme.palette.general.light,
  },
  root: {
    minHeight: "100vh",
    height: "100%",
    backgroundColor: theme.palette.general.light,
    display: "flex",
    alignContent: "center",
  },
  siderBackground: {
    backgroundColor: theme.palette.general.light,
    height: "5.5rem",
    borderBottom: `2px solid ${theme.palette.primary.light}`,
    paddingTop: ".8rem",
  },
  siderHeader: {
    padding: "1rem",
  },
  logoContainer: {
    paddingLeft: "4.5rem",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1rem",
    },
  },
  footer: {
    marginBottom: 0,
    marginTop: "auto",
    backgroundColor: theme.palette.secondary.dark,
    padding: "4.5rem 3rem",
  },
  content: {
    paddingTop: "2.5rem",
    paddingBottom: "4rem",
    backgroundColor: theme.palette.general.light,
  },
}));
