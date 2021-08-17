import React, { useEffect, useState } from "react";
import { Chip, Grid, Typography, Dialog } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import AddMN from "./Add/AddMN";
import AddTransfer from "./Add/AddTransfer";
import { Close } from "@material-ui/icons";

import { menuList } from "../../../layouts/DashboardLayout/constants";
import { useStyles } from "./styles";

function ServiceHeader() {
  const classes = useStyles();
  const history = useHistory();
  const { location = {} } = history;
  const [activeTab, setActiveTab] = useState("inicio");
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const { hash = {} } = location;
    const path = hash.replace("#", "");

    setActiveTab(hash ? path : "inicio");
  }, [location]);

  return (
    <Grid item container xs={12}>
      <Typography variant={"h6"}>Servicios</Typography>
      <Grid container spacing={2} className={classes.optionContainer}>
        {menuList[2].submenu[5].submenu.map((menu, index) => (
          <Grid item key={`option-${menu.id}`}>
            <Chip
              label={menu.title}
              onClick={() => {
                // history.push(`${location.pathname}#${menu.id}`);
                setOpen(index);
              }}
              className={clsx(
                classes.option,
                activeTab === menu.id && classes.active
              )}
            />
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={Boolean(open)}
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        maxWidth={open === 1 ? "sm" : "md"}
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close className={classes.closeBtn} onClick={() => setOpen(false)} />
        {open === 1 && <AddMN setOpen={setOpen} />}
        {open === 2 && <AddTransfer setOpen={setOpen} />}
      </Dialog>
    </Grid>
  );
}

export default ServiceHeader;
