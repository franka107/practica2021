import { LinearProgress, withStyles } from "@material-ui/core";

export const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 10,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 10,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);
