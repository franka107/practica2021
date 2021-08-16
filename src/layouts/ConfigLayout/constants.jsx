import { faUsers, faUser, faSignal } from '@fortawesome/free-solid-svg-icons'
// import routesDictionary from '../../routers/routesDict'

export const menuList = [
  {
    id: 'usuarios',
    title: 'Usuarios',
    img: faUsers,
    submenu: [
      {
        id: 'inicio',
        title: 'Inicio',
        // link: routesDictionary.userManagement,
      },
      {
        id: 'agregar-nuevo-usuario',
        title: 'Agregar nuevo usuario',
        // link: routesDictionary.userManagement,
      },
    ],
  },
  {
    id: 'perfiles',
    title: 'Perfiles',
    img: faSignal,
    submenu: [
      {
        id: 'inicio',
        title: 'Inicio',
        // link: routesDictionary.profileManagement,
      },
      {
        id: 'agregar-nuevo-perfil',
        title: 'Agregar nuevo perfil',
        // link: routesDictionary.profileManagement,
      },
    ],
  },
  {
    id: 'account',
    title: 'Cuenta',
    img: faUser,
    // link: routesDictionary.account,
  },
]
