import { Grid } from "@material-ui/core";
import React from "react";
import Footer from "../../components/Footer";
import Logo from "../../components/Logo";
// import MenuDropdown from "../../components/MenuDropdown";
import { useStyles } from "./styles";

export const AuthLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid
        item
        container
        xs={12}
        className={classes.siderBackground}
        alignContent={"center"}
        justify={"space-between"}
      >
        <Grid item md={2} sm={4} xs={5} className={classes.logoContainer}>
          <Logo />
        </Grid>
        <Grid item container justify={"flex-end"} xs={2}>
          {/* <MenuDropdown /> */}
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.content}>
        {children}
      </Grid>
      <Grid item container xs={12} className={classes.footer}>
        <Footer />
      </Grid>
    </Grid>
  );
};
