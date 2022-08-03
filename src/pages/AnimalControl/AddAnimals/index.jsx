/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Grid, Menu, MenuItem } from "@material-ui/core";
import { useStyles } from "./styles";
import addAnimals from "../../../assets/icons/addAnimal.svg";
import SearchAnimals from "../SearchAnimals";
import { useHistory } from "react-router";
import { ROUTES_DICT } from "../../../routes/routesDict";

/**
 * @component
 * @description Componente, en esta seccion se encuentra la estrucura de los botones para poder añadir un nuevo animal, también se encuentra filtro de búsqueda
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const AddAnimals = ({ searchText, setSearchText }) => {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(false);
  const history = useHistory();
  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
    //history.push(ROUTES_DICT.animal.create);
  };
  const handleClose = (e) => {
    setOpenMenu(false);
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
        {/* <Grid item md={4} sm={12} xs={12} container alignItems={"center"}>
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
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                history.push(ROUTES_DICT.animal.create);
              }}
            >
              Individual
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenMenu(false);
                history.push(ROUTES_DICT.animal.createBulk);
              }}
            >
              Masivo
            </MenuItem>
          </Menu>
        </Grid> */}
        <Grid
          item
          md={12}
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
};

export default AddAnimals;
