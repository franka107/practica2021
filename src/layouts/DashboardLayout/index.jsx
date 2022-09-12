import React, { useState } from "react";
import { Grid } from "@material-ui/core";
// import { useStyles } from "./styles";
import Sidebar from "../../components/Sidebar";
import MenuDropdown from "../../components/MenuDropdown";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useStyles } from "./styles";
import Logo from "../../components/Logo";
import { menuList } from "./constants";
import { useHistory } from "react-router";
import { ROUTES_DICT } from "../../routes/routesDict";
// import { useSelector } from "react-redux";

export const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  // const currentAgribusiness = useSelector(
  //   (state) => state.agribusiness.current
  // );
  const history = useHistory();
  return (
    <div style={{ overflow: "hidden", height: "100vh" }}>
      <Grid
        item
        container
        className={classes.siderBackground}
        alignContent={"center"}
        justifyContent={"space-between"}
      >
        <Grid item md={2} sm={4} xs={5} className={classes.logoContainer}>
          <Logo footer onClick={() => history.push(ROUTES_DICT.animal.list)} />
        </Grid>
        <Grid item className={classes.drawerIcon}>
          <MenuOpenIcon fontSize="large" onClick={() => setOpenDrawer(true)} />
        </Grid>
        <Grid
          item
          container
          justifyContent={"flex-end"}
          alignItems={"center"}
          xs={6}
        >
          <MenuDropdown isLogin={true} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={2} md={2}>
          <Sidebar
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            options={menuList()}
          />
        </Grid>
        <Grid item xs={12} sm={10} md={10} className={classes.content}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};
