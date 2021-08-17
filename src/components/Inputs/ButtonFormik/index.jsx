import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import { useField } from "formik";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
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

export default function ButtonFormik({ xs = 12, ...props }) {
  const [field] = useField(props);
  //const { text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();

  return (
    <Grid item container justifyContent={"flex-end"} xs={12}>
      <Grid item sm={3} xs={12}>
        <MuiButton
          variant={"contained"}
          size={"large"}
          color={"primary"}
          classes={{ root: classes.root, label: classes.label }}
          className={classes.button}
          {...props}
          {...field}
          type="submit"
        >
          {props.label}
        </MuiButton>
      </Grid>
    </Grid>
  );
}
