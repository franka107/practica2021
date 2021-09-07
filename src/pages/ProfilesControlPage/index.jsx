import React, { useState } from "react";
import { Chip, Dialog, Grid, Typography, IconButton } from "@material-ui/core";
import { Close, Edit, Delete } from "@material-ui/icons";
// import { useHistory } from "react-router-dom";
import { menuList } from "../../layouts/ConfigLayout/constants";
import clsx from "clsx";
import CustomMuiTable from "../../components/CustomMuiTable";
import { useStyles } from "./styles";
import { userColumns } from "./constants";
import FormUser from "./FormProfile";

function ProfilesControlPage() {
  const classes = useStyles();
  // const history = useHistory();
  // const { location = {} } = history;
  const [open, setOpen] = useState(false);
  const [searchText] = useState();

  const options = {
    selectableRows: "none",
    searchText,
    search: false,
  };

  const actionColumn = {
    label: "Acciones",
    name: "actions",
    options: {
      searchable: false,
      filter: false,
      sort: false,
      customBodyRenderLite: (dataIndex, rowIndex) => {
        return (
          <>
            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="edit"
              onClick={() => {
                setOpen(true);
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="delete"
              onClick={() => {
                setOpen(true);
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </>
        );
      },
    },
  };

  return (
    <Grid container xs={12}>
      <Typography variant={"h6"}>Configuración Perfiles</Typography>
      <Grid container spacing={2} className={classes.optionContainer}>
        {menuList[1].submenu.map((menu) => (
          <Grid item key={`option-${menu.id}`}>
            <Chip
              label={menu.title}
              onClick={() => {
                // history.push(`${location.pathname}#${menu.id}`);
                setOpen(true);
              }}
              className={clsx(classes.option)}
            />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <CustomMuiTable
          data={[]}
          columns={[...userColumns, actionColumn]}
          options={options}
        />
      </Grid>
      <Dialog
        open={open}
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close className={classes.closeBtn} onClick={() => setOpen(false)} />

        <FormUser setOpen={setOpen} />
      </Dialog>
    </Grid>
  );
}

export default ProfilesControlPage;
