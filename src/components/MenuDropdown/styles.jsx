import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  menuContainer: {
    width: 'fit-content',
    paddingRight: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
    },
  },
  menuIcon: {
    height: 40,
    width: 48,
    background: theme.palette.icon.menu,
    color: theme.palette.icon.menuFill,
    borderRadius: 8,
    verticalAlign: 'middle',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    cursor: 'pointer',
  },
  menuIconContainer: {
    paddingRight: '1rem',
    margin: '0 .5rem',
  },
  icon: {
    margin: 'auto .5rem',
    fontSize: 33,
    padding: '0 1px',
  },
  menuList: {
    top: '63px!important',
    width: 'min-content',
    right: 20,
    left: 'auto!important',
  },
  iconColor: {
    fill: theme.palette.icon.menu,
    height: 40,
    width: 48,
    margin: '0 .5rem',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  menuImg: {
    minWidth: 'min-content',
    marginRight: '.5rem',
    color: 'black',
  },
}))
