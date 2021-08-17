import React, { useEffect, useState } from "react";
import { Chip, Grid, Typography, Dialog, Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { Close } from "@material-ui/icons";
import { menuList } from "../../../layouts/DashboardLayout/constants";
import { useStyles } from "./styles";
import TextFieldFormik from "../../../components/Inputs/TextFieldFormik";

function PalpationHeader({ handleChange }) {
  const classes = useStyles();
  const history = useHistory();
  const { location = {} } = history;
  const [activeTab, setActiveTab] = useState("inicio");
  const [open, setOpen] = useState(0);

  useEffect(() => {
    console.log(menuList);
  }, []);

  return (
    <Grid item container xs={12}>
      <Typography variant={"h6"}>Palpaciones</Typography>
      <Grid container spacing={2} className={classes.optionContainer}>
        {menuList[2].submenu[1].submenu.map((menu, index) => (
          <Grid item key={`option-${menu.id}`}>
            <Chip
              label={menu.title}
              onClick={() => {
                setOpen(true);
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
        maxWidth="sm"
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close className={classes.closeBtn} onClick={() => setOpen(false)} />
        <Grid>
          <Typography variant={"subtitle1"} gutterBottom>
            Palpación
          </Typography>
          <Divider />
          <TextFieldFormik
            name="email"
            type="text"
            label="Correo"
            // onChange={handleChange}
          ></TextFieldFormik>
        </Grid>
      </Dialog>
    </Grid>
  );
}

export default PalpationHeader;
