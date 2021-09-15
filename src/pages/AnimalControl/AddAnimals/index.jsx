import React from "react";
import { Button, Grid } from "@material-ui/core";
import { useStyles } from "./styles";
import addAnimals from "../../../assets/icons/addAnimal.svg";
import SearchAnimals from "../SearchAnimals";
import { useHistory } from "react-router";
import { ROUTES_DICT } from "../../../routes/routesDict";

function AddAnimals({ searchText, setSearchText }) {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (event) => {
    // setOpenMenu(event.currentTarget);
    history.push(ROUTES_DICT.animal.create);
  };

  return (
    <Grid container item xs={12}>
      <Grid
        container
        item
        xs={12}
        className={classes.registerContainer}
        justifyContent={"space-between"}
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
          {/* <Menu
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
          </Menu> */}
        </Grid>
        <Grid
          item
          md={8}
          sm={12}
          xs={12}
          container
          alignItems="center"
          justifyContent={"flex-end"}
        >
          <SearchAnimals
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AddAnimals;
