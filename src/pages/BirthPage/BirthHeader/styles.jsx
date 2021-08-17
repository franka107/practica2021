import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  modal: {
    padding: "1.2rem",
  },
  optionContainer: {
    padding: "1rem 0",
  },
  option: {
    padding: "1.2rem .5rem",
    backgroundColor: theme.palette.button.tertiary,
    "&:hover": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
    },
    // '&:focus': {
    //   backgroundColor: theme.palette.button.primary,
    //   color: 'white',
    // },
  },
  active: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
  },
  userContainer: {
    backgroundColor: theme.palette.card.green,
    padding: "2rem",
  },
  userTitle: {
    fontWeight: "600",
    fontSize: 25,
  },
  userDescription: {
    fontSize: 13,
  },
  userItem: {
    padding: "1rem",
  },
  userItemNumber: {
    fontSize: 22,
  },
  userItemText: {
    fontSize: 13,
  },
  userItemContainer: {
    padding: "1rem",
    backgroundColor: theme.palette.card.gray,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  icon: {
    color: theme.palette.general.main,
    marginBottom: "1rem",
  },
  cardContainer: {
    [theme.breakpoints.down("sm")]: {
      margin: 0,
    },
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    cursor: "pointer",
  },
  formStyle: {
    marginTop: "1rem",
  },
  formDivider: {
    marginTop: "0.3rem",
  },
  paddingButton: {
    marginRight: "1rem",
  },
  borderBirth: {
    border: "1px solid #0073C8",
  },
}));
