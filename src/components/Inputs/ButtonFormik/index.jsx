import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
  button: {
    marginTop: "2rem",
    width: "100%",
    backgroundColor: theme.palette.button.primary.secondary,
    color: "black",
    "&:hover": {
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
  buttonSubmit: {
    marginTop: "2rem",
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  buttonCancel: {
    marginTop: "2rem",
    width: "100%",
    backgroundColor: theme.palette.button.primary.secondary,
    color: "black",
    "&:hover": {
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
}));

export default function ButtonFormik({ xs = 12, ...props }) {
  //const { text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();

  return (
    <MuiButton
      variant={"contained"}
      size={"large"}
      classes={{ root: classes.root, label: classes.label }}
      className={clsx(
        classes.button,
        props.type === "cancel" && classes.buttonCancel,
        props.type === "submit" && classes.buttonSubmit
      )}
      style={{ boxShadow: "none" }}
      {...props}
    >
      {props.label}
    </MuiButton>
  );
}
