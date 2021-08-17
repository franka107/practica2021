import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import { useField } from "formik";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
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
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.contrastText,
    },
  },
}));

export default function ButtonFormik({ xs = 12, ...props }) {
  const [field] = useField(props);
  //const { text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();

  return (
    <MuiButton
      variant={"contained"}
      size={"large"}
      classes={{ root: classes.root, label: classes.label }}
      className={clsx(
        props.type === "cancel" && classes.buttonCancel,
        props.type === "submit" && classes.buttonSubmit
      )}
      {...props}
      {...field}
    >
      {props.label}
    </MuiButton>
  );
}
