import React, { useState } from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  Drawer,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import clsx from "clsx";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";

function Sidebar({ openDrawer, setOpenDrawer, options }) {
  const history = useHistory();
  const { location = {} } = history;
  const classes = useStyles();
  const farm = {
    id: "control-ganadero",
    title: "Emerson Arriba",
    submenu: [
      {
        id: "Emerson",
        title: "Emerson",
      },
      {
        id: "Frank",
        title: "Frank",
      },
    ],
  };
  const [nestedList, setNestedList] = useState(() => {
    const { state = {} } = {};
    const { item = null } = state;

    return item ? { [item]: true } : {};
  });
  const [subNestedList, setSubNestedList] = useState(() => {
    const { state = {} } = {};
    const { subItem = null } = state;

    return subItem ? { [subItem]: true } : {};
  });
  const [barnActive, setBarnActive] = useState({});

  const handleClick = (e) => {
    setNestedList({ [e]: !nestedList[e] });
  };

  const handleSubMenuClick = (e) => {
    if (!subNestedList[e]) setSubNestedList({ [e]: !subNestedList[e] });
  };

  const drawer = (
    <List
      component="nav"
      className={classes.root}
      subheader={
        <ListSubheader
          disableSticky
          color={"primary"}
          component="div"
          id="nested-list-subheader"
          className={classes.subheader}
        >
          <ListItem
            button
            onClick={() => {
              handleClick(farm.title);
            }}
            className={clsx(
              classes.farmItem,
              nestedList[farm.title] && classes.activeFarmItem
            )}
          >
            <ListItemText className={classes.farmTextContainer}>
              <Typography className={classes.farmText}>
                {`Hacienda ${farm.title || ""}`}
              </Typography>
              <Typography
                variant={"subtitle2"}
                className={classes.activeBarnText}
              >
                {barnActive.title}
              </Typography>
            </ListItemText>
            {farm.submenu && (
              <div>
                {nestedList[farm.title] ? (
                  <ExpandLess className={classes.farmItem} />
                ) : (
                  <ExpandMore color={"primary"} className={classes.farmItem} />
                )}
              </div>
            )}
          </ListItem>
          <Collapse in={nestedList[farm.title]} timeout="auto" unmountOnExit>
            {farm.submenu &&
              farm.submenu.map((farmSubItem) => {
                return (
                  <List
                    key={`list-sub-item-${farmSubItem.id}`}
                    component="div"
                    disablePadding
                    onClick={() => {
                      setBarnActive(farmSubItem);
                      handleClick(farm.title);
                    }}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemText
                        primary={farmSubItem.title}
                        className={classes.text}
                      />
                    </ListItem>
                  </List>
                );
              })}
          </Collapse>
        </ListSubheader>
      }
    >
      {options.map((item) => {
        return (
          <React.Fragment key={`list-item-${item.id}`}>
            <ListItem
              button
              onClick={() => {
                handleClick(item.id);
              }}
              className={clsx(
                classes.itemList,
                nestedList[item.id] && classes.activeItem
              )}
            >
              {/* <ListItemIcon>
          {CustomIcon && CustomIcon.prefix ? (
            <FontAwesomeIcon icon={item.img} className={classes.icon} />
          ) : (
            <CustomIcon className={classes.icon} />
          )}
        </ListItemIcon> */}
              <ListItemText primary={item.title} className={classes.text} />
              {item.submenu && (
                <div>
                  {nestedList[item.id] ? (
                    <ExpandLess color={"primary"} />
                  ) : (
                    <ExpandMore color={"primary"} />
                  )}
                </div>
              )}
            </ListItem>
            <Collapse in={nestedList[item.id]} timeout="auto" unmountOnExit>
              {item.submenu &&
                item.submenu.map((subitem) => {
                  const SubCustomIcon = subitem.img;

                  return (
                    <List
                      key={`list-sub-item-${subitem.id}`}
                      component="div"
                      disablePadding
                      onClick={() => {
                        handleSubMenuClick(subitem.id);
                        if (subitem.id === "registro-celos") {
                          history.push("/test1");
                        }
                        if (subitem.id === "agregar-pesos") {
                          history.push("/test");
                        }
                        console.log(location);
                        console.log(subitem);
                      }}
                    >
                      <ListItem button className={classes.nested}>
                        {subitem.img && (
                          <ListItemIcon>
                            <SubCustomIcon className={classes.icon} />
                          </ListItemIcon>
                        )}
                        <ListItemText
                          disableTypography
                          primary={subitem.title}
                          className={clsx(
                            classes.text,
                            subNestedList[subitem.id] && classes.activeSubItem
                          )}
                        />
                      </ListItem>
                    </List>
                  );
                })}
            </Collapse>
          </React.Fragment>
        );
      })}
    </List>
  );
  return (
    <React.Fragment>
      {!openDrawer && (
        <div className={classes.siderContainer}>
          <div className={classes.siderMenu}>{drawer}</div>
        </div>
      )}
      <Drawer
        variant="temporary"
        anchor={"left"}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{
          paper: classes.siderMenuDrawer,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </React.Fragment>
  );
}

export default Sidebar;
