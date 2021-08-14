import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    height: "100%",
    display: "flex",
    /* Direction of the items, can be row or column */
    flexDirection: "column",
  },
  contentContainer: {
    flex: 1,
  },
  siderBackground: {
    backgroundColor: theme.palette.sider.dark,
    height: "4.2rem",
    zIndex: 1000,
    position: "fixed",
  },
  logoContainer: {
    paddingLeft: "1.5rem",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "1rem",
    },
  },
  content: {
    flex: 1,
    padding: "6.5rem 2.5rem 2.5rem",
    backgroundColor: theme.palette.sider.light,
    [theme.breakpoints.down("xs")]: {
      padding: "6.5rem 1.5rem 2.5rem",
    },
    minHeight: "100vh",
  },
  containerResponsive: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  drawerIcon: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "inline",
      position: "absolute",
      top: 76,
      left: 6,
    },
  },
  allView: {
    height: "100%",
  },
}));
