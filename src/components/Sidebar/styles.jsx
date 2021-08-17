import { makeStyles } from "@material-ui/core";
import { alpha } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  siderContainer: {
    width: "100%",
    height: "100%",
    paddingTop: "4.2rem",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  siderMenu: {
    margin: "auto",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.sider.dark,
  },
  siderMenuDrawer: {
    width: "250px",
    // width: "min-content",
    backgroundColor: theme.palette.sider.dark,
  },
  subheader: {
    backgroundColor: theme.palette.sider.primary,
    padding: 0,
    color: "black",
  },
  activeItem: {
    backgroundColor: theme.palette.sider.tertiary,
    width: "100%",
  },
  icon: {
    width: 20,
    height: 20,
    color: theme.palette.primary.main,
  },
  text: {
    color: "white",
    [theme.breakpoints.down("sm")]: {
      overflow: "hidden",
    },
  },
  homeText: {
    fontWeight: "bold",
    paddingBottom: ".3rem",
  },
  nested: {
    paddingLeft: "1.5rem",
    backgroundColor: theme.palette.sider.secondary,
    "&:hover": {
      backgroundColor: alpha(theme.palette.sider.secondary, 0.5),
    },
  },
  nestedSub: {
    paddingLeft: "2.5rem",
    backgroundColor: theme.palette.sider.quaternary,
    "&:hover": {
      backgroundColor: alpha(theme.palette.sider.quaternary, 0.75),
    },
  },
  itemList: {
    "&:hover": {
      backgroundColor: theme.palette.sider.tertiary,
    },
  },
  farmContainer: {
    display: "flex",
  },
  farmTextContainer: {
    padding: "1rem 0",
  },
  farmItem: {
    color: "inherit",
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.sider.tertiary,
    },
  },
  farmText: {
    color: "inherit",
    fontSize: "17px !important",
    fontWeight: "600",
    "&:hover": {
      color: "inherit",
    },
  },
  activeBarnText: {
    fontSize: "13px !important",
    color: "inherit",
    padding: 0,
  },
  activeFarmItem: {
    color: "white",
    backgroundColor: theme.palette.sider.tertiary,
  },
  activeSubItem: {
    fontWeight: "bold",
  },
  menuDrawer: {
    display: "flex",
    backgroundColor: "red",
  },
}));
