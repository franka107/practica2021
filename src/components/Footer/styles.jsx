import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  logoContainer: {
    paddingLeft: "2.2rem",
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0,
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      paddingBottom: "3rem",
    },
  },
  description: {
    paddingTop: ".5rem",
    width: "100%",
  },
  icon: {
    width: "40px !important",
    height: "40px !important",
    margin: "0 1rem",
    cursor: "pointer",
    [theme.breakpoints.only("xs")]: {
      margin: "0 .5rem",
    },
  },
  iconContainer: {
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "3rem 0",
    },
  },
  copyright: {
    textAlign: "right",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
      textAlign: "center",
    },
  },
  footerItem: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      justifyContent: "center",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "1rem",
    },
  },
  rightContainer: {
    alignContent: "flex-start",
    [theme.breakpoints.down("md")]: {
      alignContent: "space-around",
    },
  },
  footerText: {
    fontSize: 17,
    fontWeight: 800,
    lineHeight: "20px",
    color: "#FFFFFF",
  },
}));
