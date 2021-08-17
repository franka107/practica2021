import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import { useField } from "formik";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

export default function ButtonFormik(props) {
  const [field] = useField(props);
  //const { text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();

  return (
    <MuiButton
      variant={"contained"}
      size={"large"}
      color={"primary"}
      classes={{ root: classes.root, label: classes.label }}
      className={classes.button}
      {...props}
      {...field}
    >
      {props.label}
    </MuiButton>
  );
}
