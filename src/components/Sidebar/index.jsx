import React, { useState, useEffect } from "react";
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
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import clsx from "clsx";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import agribusinessActions from "../../redux/actions/agribusiness.actions";

function Sidebar({ openDrawer, setOpenDrawer, options }) {
  const history = useHistory();
  const dispatch = useDispatch();
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

  const { current: currentFarm } = useSelector((state) => state.farm);
  const { current: currentAgribusiness, list: listAgribusiness } = useSelector(
    (state) => state.agribusiness
  );

  useEffect(() => {
    verifyLocation();
  }, []);

  const verifyLocation = () => {
    options.map((option, oindex) => {
      if (option.submenu) {
        option.submenu.map((sub, sindex) => {
          if (sub.submenu) {
            sub.submenu.map((subsub, ssindex) => {
              if (subsub.link === location.pathname) {
                handleClick(option.id);
                handleSubMenuClick(sub.id);
                handleSubSubMenuClick(subsub.id);
              }
            });
          } else {
            if (sub.link === location.pathname) {
              handleClick(option.id);
              handleSubMenuClick(sub.id);
            }
          }
        });
      }
    });
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

  const [subSubNestedList, setSubSubNestedList] = useState(() => {
    const { state = {} } = {};
    const { subSubItem = null } = state;

    return subSubItem ? { [subSubItem]: true } : {};
  });
  const [barnActive, setBarnActive] = useState(farm.submenu[0]);

  const handleClick = (e) => {
    setNestedList({ [e]: !nestedList[e] });
  };

  const handleSubMenuClick = (e) => {
    setSubNestedList({ [e]: !subNestedList[e] });
  };

  const handleSubSubMenuClick = (e) => {
    if (!subSubNestedList[e])
      setSubSubNestedList({ [e]: !subSubNestedList[e] });
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
                {`${(currentFarm && currentFarm.name) || ""}`}
              </Typography>
              <Typography
                variant={"subtitle2"}
                className={classes.activeBarnText}
              >
                {currentAgribusiness && currentAgribusiness.name}
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
            {listAgribusiness &&
              listAgribusiness.map((agribusiness) => {
                return (
                  <List
                    key={`list-sub-item-${agribusiness._id}`}
                    component="div"
                    disablePadding
                    onClick={() => {
                      setBarnActive(agribusiness);
                      handleClick(farm.title);
                      dispatch(
                        agribusinessActions.setCurrentAgribusiness(agribusiness)
                      );
                    }}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemText
                        primary={agribusiness.name}
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
        const CustomIcon = item.img;
        return (
          <React.Fragment key={`list-item-${item.id}`}>
            <ListItem
              button
              onClick={() => {
                handleClick(item.id);
                if (item.link) {
                  history.push(item.link);
                }
                if (openDrawer) {
                  setOpenDrawer(false);
                }
              }}
              className={clsx(
                classes.itemList,
                nestedList[item.id] && classes.activeItem
              )}
            >
              <ListItemIcon>
                {CustomIcon && CustomIcon.prefix ? (
                  <FontAwesomeIcon icon={item.img} className={classes.icon} />
                ) : (
                  <CustomIcon className={classes.icon} />
                )}
              </ListItemIcon>
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
                        if (subitem.link) {
                          history.push(subitem.link);
                        }
                        if (openDrawer) {
                          setOpenDrawer(false);
                        }
                      }}
                    >
                      <ListItem
                        button
                        className={classes.nested}
                        onClick={() => {
                          handleSubMenuClick(subitem.id);
                        }}
                      >
                        {subitem.img && (
                          <ListItemIcon>
                            {SubCustomIcon && SubCustomIcon.prefix ? (
                              <FontAwesomeIcon
                                icon={subitem.img}
                                className={classes.icon}
                              />
                            ) : (
                              <SubCustomIcon className={classes.icon} />
                            )}
                          </ListItemIcon>
                        )}
                        <ListItemText
                          disableTypography
                          primary={subitem.title}
                          className={clsx(
                            classes.text,
                            subNestedList[subitem.id] && !subitem.submenu
                              ? classes.activeSubItem
                              : classes.text
                          )}
                        />
                        {subitem.submenu && (
                          <div>
                            {nestedList[subitem.id] ? (
                              <ExpandLess color={"primary"} />
                            ) : (
                              <ExpandMore color={"primary"} />
                            )}
                          </div>
                        )}
                      </ListItem>
                      <Collapse
                        in={subNestedList[subitem.id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        {subitem.submenu &&
                          subitem.submenu.map((subsubitem) => {
                            const SubSubCustomIcon = subsubitem.img;

                            return (
                              <List
                                key={`list-sub-sub-item-${subsubitem.id}`}
                                component="div"
                                disablePadding
                              >
                                <ListItem
                                  button
                                  className={classes.nestedSub}
                                  onClick={() => {
                                    if (subsubitem.link) {
                                      history.push(subsubitem.link);
                                    }
                                    handleSubSubMenuClick(subsubitem.id);
                                  }}
                                >
                                  {subsubitem.img && (
                                    <ListItemIcon>
                                      <SubSubCustomIcon
                                        className={classes.icon}
                                      />
                                    </ListItemIcon>
                                  )}
                                  <ListItemText
                                    disableTypography
                                    primary={subsubitem.title}
                                    className={clsx(
                                      classes.text,
                                      subSubNestedList[subsubitem.id] &&
                                        classes.activeSubItem
                                    )}
                                  />
                                </ListItem>
                              </List>
                            );
                          })}
                      </Collapse>
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
