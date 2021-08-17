import React, { useState } from "react";
import { Close } from "@material-ui/icons";
import { Button, Dialog, Grid, Menu, MenuItem } from "@material-ui/core";
import { menuList } from "./constants";
// import AddIndividual from "./AddIndividual";
// import AddMassive from "./AddMassive";
import { useStyles } from "./styles";
import addAnimals from "../../../assets/icons/addAnimal.svg";
import SearchAnimals from "../SearchAnimals";

function AddAnimals({
  setAnimalsList,
  agribusinessId,
  setSearch,
  handleAddMassive,
  setFilter,
  handleChangePage,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(null);
  };

  return (
    <Grid container item xs={12}>
      <Grid
        container
        item
        xs={12}
        className={classes.registerContainer}
        justify={"space-between"}
      >
        <Grid item md={4} sm={12} xs={12} container alignItems={"center"}>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            color={"secondary"}
            variant={"contained"}
            onClick={handleClick}
            endIcon={
              <img
                src={addAnimals}
                alt={"addAnimals"}
                className={classes.icon}
              />
            }
            className={classes.button}
          >
            Nuevo Registro
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={openMenu}
            keepMounted
            open={Boolean(openMenu)}
            onClose={handleClose}
            classes={{ paper: classes.menuDropdown }}
          >
            {menuList.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => {
                  setOpenMenu(false);
                  setOpen(item.id);
                }}
              >
                {item.title}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
        <Grid
          item
          md={8}
          sm={12}
          xs={12}
          container
          alignItems="center"
          justify={"flex-end"}
        >
          <SearchAnimals
            setSearch={setSearch}
            setFilter={setFilter}
            setAnimalsList={setAnimalsList}
            handleChangePage={handleChangePage}
          />
        </Grid>
      </Grid>
      {/* <Dialog
        open={Boolean(open)}
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{paperFullWidth: classes.modal}}
      >
        <Close className={classes.closeBtn} onClick={() => setOpen(false)} />
        {open === 1 &&
        <AddIndividual setOpen={setOpen} setAnimalsList={setAnimalsList} agribusinessId={agribusinessId} />}
        {open === 2 &&
        <AddMassive setOpen={setOpen} handleAddMassive={handleAddMassive} agribusinessId={agribusinessId} />}
      </Dialog> */}
    </Grid>
  );
}

export default AddAnimals;
