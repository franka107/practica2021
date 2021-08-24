import React, { useEffect, useState } from "react";
import { Chip, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFlag,
  faGem,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import clsx from "clsx";

import { menuList } from "../../../layouts/DashboardLayout/constants";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";

function AnimalDescription() {
  const classes = useStyles();
  const history = useHistory();
  const { location = {} } = history;
  const [activeTab, setActiveTab] = useState("inicio");
  const { current: currentAgribussiness } = useSelector(
    (state) => state.agribusiness
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const { hash = {} } = location;
    const path = hash.replace("#", "");

    setActiveTab(hash ? path : "inicio");
  }, [location]);

  return (
    <Grid item container xs={12}>
      <Grid container spacing={2} className={classes.optionContainer}>
        {menuList[0].submenu.map((menu) => (
          <Grid item key={`option-${menu.id}`}>
            <Chip
              label={menu.title}
              onClick={() => history.push(`${location.pathname}#${menu.id}`)}
              className={clsx(
                classes.option,
                activeTab === menu.id && classes.active
              )}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={7} xs={12}>
          <div className={classes.userContainer}>
            <Typography
              variant={"h3"}
              color={"primary"}
              gutterBottom
              className={classes.userTitle}
            >
              ¡Bienvenido {user.firstName} a{" "}
              {currentAgribussiness && currentAgribussiness.name}!
            </Typography>
            <Typography color={"primary"} className={classes.userDescription}>
              Consejos etc. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </Typography>
          </div>
        </Grid>
        <Grid
          item
          container
          md={5}
          xs={12}
          spacing={2}
          className={classes.cardContainer}
        >
          <Grid item md={4} xs={12}>
            <div className={classes.userItemContainer}>
              <FontAwesomeIcon
                icon={faFlag}
                className={classes.icon}
                size={"3x"}
              />
              <Typography
                variant={"body2"}
                color={"primary"}
                align={"center"}
                className={classes.userItemText}
              >
                Tareas o logros
              </Typography>
              <Typography
                color={"primary"}
                align={"center"}
                className={classes.userItemNumber}
              >
                15
              </Typography>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <div className={classes.userItemContainer}>
              <FontAwesomeIcon
                icon={faGem}
                className={classes.icon}
                size={"3x"}
              />
              <Typography
                color={"primary"}
                align={"center"}
                className={classes.userItemText}
              >
                Tareas o logros
              </Typography>
              <Typography
                color={"primary"}
                align={"center"}
                className={classes.userItemNumber}
              >
                15
              </Typography>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <div className={classes.userItemContainer}>
              <FontAwesomeIcon
                icon={faPaperPlane}
                className={classes.icon}
                size={"3x"}
              />
              <Typography
                color={"primary"}
                align={"center"}
                className={classes.userItemText}
              >
                Tareas o logros
              </Typography>
              <Typography
                color={"primary"}
                align={"center"}
                className={classes.userItemNumber}
              >
                15%
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AnimalDescription;
