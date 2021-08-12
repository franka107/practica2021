// import React, { useState } from "react";
// import {
//   Collapse,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   ListSubheader,
//   Typography,
// } from "@material-ui/core";
// import { ExpandLess, ExpandMore } from "@material-ui/icons";
// import clsx from "clsx";
// import { useStyles } from "./styles";

// export const AuthLayout = ({ children }) => {
//   const classes = useStyles();
//   const [openDrawer, setOpenDrawer] = useState(true);
//   const [farm, setFarm] = useState({
//     id: "control-ganadero",
//     title: "Emerson Arriba",
//     submenu: [
//       {
//         id: "Emerson",
//         title: "Emerson",
//       },
//       {
//         id: "Frank",
//         title: "Frank",
//       },
//     ],
//   });

//   return (
//     <React.Fragment>
//       <Drawer
//         variant="temporary"
//         anchor={"left"}
//         open={openDrawer}
//         onClose={() => setOpenDrawer(false)}
//         classes={{
//           paper: classes.siderMenuDrawer,
//         }}
//         ModalProps={{
//           keepMounted: true, // Better open performance on mobile.
//         }}
//       >
//         <List
//           component="nav"
//           className={classes.root}
//           subheader={
//             <ListSubheader
//               disableSticky
//               color={"primary"}
//               component="div"
//               id="nested-list-subheader"
//               className={classes.subheader}
//             >
//               <ListItem
//                 button
//                 className={clsx(classes.farmItem, classes.activeFarmItem)}
//               >
//                 <ListItemText className={classes.farmTextContainer}>
//                   <Typography className={classes.farmText}>
//                     {`Hacienda ${farm.title || ""}`}
//                   </Typography>
//                   <Typography
//                     variant={"subtitle2"}
//                     className={classes.activeBarnText}
//                   >
//                     {barnActive.title}
//                   </Typography>
//                 </ListItemText>
//                 {farm.submenu && (
//                   <div>
//                     {nestedList[farm.title] ? (
//                       <ExpandLess className={classes.farmItem} />
//                     ) : (
//                       <ExpandMore
//                         color={"primary"}
//                         className={classes.farmItem}
//                       />
//                     )}
//                   </div>
//                 )}
//               </ListItem>
//               <Collapse
//                 // in={nestedList[farm.title]}
//                 timeout="auto"
//                 unmountOnExit
//               >
//                 {farm.submenu &&
//                   farm.submenu.map((farmSubItem) => {
//                     return (
//                       <List
//                         key={`list-sub-item-${farmSubItem.id}`}
//                         component="div"
//                         disablePadding
//                         // onClick={() => {
//                         //   setBarnActive(farmSubItem);
//                         //   handleClick(farm.title);
//                         // }}
//                       >
//                         <ListItem button className={classes.nested}>
//                           <ListItemText
//                             primary={farmSubItem.title}
//                             className={classes.text}
//                           />
//                         </ListItem>
//                       </List>
//                     );
//                   })}
//               </Collapse>
//             </ListSubheader>
//           }
//         >
//           {menuList.map((item) => {
//             const CustomIcon = item.img;

//             return (
//               <React.Fragment key={`list-item-${item.id}`}>
//                 <ListItem
//                   button
//                   onClick={() => {
//                     handleClick(item.id);
//                     if (item.link) {
//                       history.push(`${item.link}`);
//                     }
//                   }}
//                   className={clsx(
//                     classes.itemList,
//                     nestedList[item.id] && classes.activeItem
//                   )}
//                 >
//                   <ListItemIcon>
//                     {CustomIcon && CustomIcon.prefix ? (
//                       <FontAwesomeIcon
//                         icon={item.img}
//                         className={classes.icon}
//                       />
//                     ) : (
//                       <CustomIcon className={classes.icon} />
//                     )}
//                   </ListItemIcon>
//                   <ListItemText primary={item.title} className={classes.text} />
//                   {item.submenu && (
//                     <div>
//                       {nestedList[item.id] ? (
//                         <ExpandLess color={"primary"} />
//                       ) : (
//                         <ExpandMore color={"primary"} />
//                       )}
//                     </div>
//                   )}
//                 </ListItem>
//                 <Collapse in={nestedList[item.id]} timeout="auto" unmountOnExit>
//                   {item.submenu &&
//                     item.submenu.map((subitem) => {
//                       const SubCustomIcon = subitem.img;

//                       return (
//                         <List
//                           key={`list-sub-item-${subitem.id}`}
//                           component="div"
//                           disablePadding
//                           onClick={() => {
//                             handleSubMenuClick(subitem.id);
//                             history.push(`${subitem.link}#${subitem.id}`, {
//                               item: item.id,
//                               subItem: subitem.id,
//                             });
//                           }}
//                         >
//                           <ListItem button className={classes.nested}>
//                             {subitem.img && (
//                               <ListItemIcon>
//                                 <SubCustomIcon className={classes.icon} />
//                               </ListItemIcon>
//                             )}
//                             <ListItemText
//                               disableTypography
//                               primary={subitem.title}
//                               className={clsx(
//                                 classes.text,
//                                 subNestedList[subitem.id] &&
//                                   classes.activeSubItem
//                               )}
//                             />
//                           </ListItem>
//                         </List>
//                       );
//                     })}
//                 </Collapse>
//               </React.Fragment>
//             );
//           })}
//         </List>
//       </Drawer>
//     </React.Fragment>
//   );
// };

// export default Sider;
