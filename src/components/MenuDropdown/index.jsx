import React, { useEffect, useState } from 'react'
import {
  Grid,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core'
import { Menu as MenuIcon, Search } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStyles } from './styles'
import { menuItems } from './constants'

function MenuDropdown({ isLogin, setLoginState }) {
  const classes = useStyles()
  const [openMenu, setOpenMenu] = useState(false)
  const [menuList, setMenuList] = useState([])
  const history = useHistory()

  useEffect(() => {
    if (!menuList.length) {
      if (isLogin) {
        setMenuList(menuItems)
      } else {
        setMenuList([
          {
            id: 1,
            title: 'Inicio',
            onClick: (history) => {},
          },
          {
            id: 2,
            title: 'Iniciar Sesión',
            onClick: (history) => {},
          },
          {
            id: 3,
            title: 'Registrarse',
            onClick: (history) => {},
          },
        ])
      }
    }
  }, [menuList, isLogin])

  const handleClick = (event) => {
    setOpenMenu(event.currentTarget)
  }

  const handleClose = () => setOpenMenu(false)

  return (
    <Grid item container justify={'flex-end'} className={classes.menuContainer}>
      {isLogin && (
        <React.Fragment>
          <Grid item>
            <AccountCircleIcon className={classes.iconColor} />
          </Grid>
          <Grid item>
            <Search className={classes.iconColor} />
          </Grid>
          <Grid item>
            <NotificationsNoneOutlinedIcon className={classes.iconColor} />
          </Grid>
        </React.Fragment>
      )}
      <Grid item className={classes.menuIconContainer}>
        <Typography className={classes.menuIcon} onClick={handleClick}>
          <MenuIcon className={classes.icon} />
        </Typography>
      </Grid>
      <Menu
        id="simple-menu"
        anchorEl={openMenu}
        open={Boolean(openMenu)}
        keepMounted
        onClose={handleClose}
        classes={{ paper: classes.menuList }}
      >
        {menuList.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              handleClose()
              if (item.link) {
                history.push(item.link)
              }
            }}
          >
            {item.img && (
              <ListItemIcon className={classes.menuImg}>
                <FontAwesomeIcon icon={item.img} size={'1x'} />
              </ListItemIcon>
            )}
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  )
}

export default MenuDropdown
