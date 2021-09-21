import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  loader: {
    position: "fixed",
    zIndex: "999",
    overflow: "show",
    margin: "auto",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "50px",
    height: "50px",
  },
  searchContainer_container: {
    padding: "0 .5rem",
    borderRadius: "25px !important",
    borderColor: "rgba(0, 0, 0, 0.24) !important",
    border: `1px solid !important`,
    backgroundColor: `${theme.palette.primary.light} !important`,
    "&:hover": {
      padding: "0 .5rem",
      borderRadius: "25px !important",
      borderColor: "rgba(0, 0, 0, 0.24) !important",
      border: `1px solid !important`,
      backgroundColor: `${theme.palette.primary.light} !important`,
    },

    [theme.breakpoints.down("sm")]: {
      marginTop: "1rem",
    },
  },

  searchContainer__input: {
    width: "100% !important",
    height: "100% !important",
    backgroundColor: `inherit !important`,
    border: `0px solid !important`,
    "&:hover": {
      backgroundColor: `inherit !important`,
      border: `0px solid !important`,
    },
    "&$focused": {
      backgroundColor: `inherit !important`,
      border: `0px solid !important`,
    },
    "&$active": {
      backgroundColor: `inherit !important`,
      border: `0px solid !important`,
    },
  },

  customModal: {
    padding: "1.2rem",
  },
  customModal__closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    cursor: "pointer",
  },
  chipList__container: {
    padding: "1rem 0",
    marginBottom: "0.4rem",
  },
  chipList__chip: {
    padding: "1.2rem .5rem",
    backgroundColor: theme.palette.button.tertiary,
    "&:hover": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
    },
    "&--active": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
      "&:focus": {
        backgroundColor: theme.palette.button.primary,
        color: "white",
      },
    },
  },
  form__subBorder: {
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: "0.7rem",
    marginBottom: "1rem",
    position: "relative",
  },
  form__border: {
    marginTop: ".9rem",
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: "0 1rem",
    marginBottom: "1rem",
    position: "relative",
  },
  form__raceContainer: {
    padding: "1rem 0",
  },
  form__raceContainer__deleteIcon: {
    cursor: "pointer",
    marginLeft: theme.spacing(1),
  },
  form__raceContainer__errorMessage: {
    color: "red",
    textAlign: "center",
  },
  form__raceContainer__addBtn: {
    position: "absolute",
    right: -12,
    bottom: 7,
    backgroundColor: "white",
    cursor: "pointer",
  },
  dataContainer__container: {
    padding: theme.spacing(3),
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    borderRadius: "4px",
  },
  dataContainer__number: {
    color: "black",
    fontSize: 45,
    paddingBottom: theme.spacing(1),
  },
  dataContainer__text: {
    paddingBottom: theme.spacing(1),
  },
}));
