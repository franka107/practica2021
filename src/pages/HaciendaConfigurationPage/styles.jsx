import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  registerContainer: {
    paddingTop: "1rem",
  },
  errorsContainer: {
    paddingTop: "1rem",
  },
  textSecondary: {
    color: `${theme.palette.secondary.main} !important`,
  },
  tableHeader: {
    color: `${theme.palette.secondary.main} !important`,
    backgroundColor: "#fafafa",
    position: "sticky",
    top: 0,
  },
  optionContainer: {
    padding: "1rem 0",
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    cursor: "pointer",
  },
  modal: { padding: "1.2rem" },
  option: {
    padding: "1.2rem .5rem",
    backgroundColor: theme.palette.button.tertiary,
    "&:hover": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
    },
    "&:focus": {
      backgroundColor: theme.palette.button.primary,
      color: "white",
    },
  },
  optionDelete: {
    backgroundColor: "#E7B3CA",
  },
  card: {
    padding: "1.2rem",
    margin: "0.5rem",
  },
  calendarTitle: {
    fontSize: "12px",
  },
  link: {
    textAlign: "right",
    display: "block",
  },
  image: {
    width: "70%",
    margin: "auto",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    position: "relative",
  },
  cowImageEditButton: {
    position: "absolute",
    right: "-0.5rem",
    top: "1.5rem",
  },
  cowImageQrButton: {
    position: "absolute",
    right: "-2.5rem",
    bottom: "0.5rem",
    backgroundColor: "#E8EDF1",
    padding: "15px",
    borderRadius: "100%",
  },
  cowImage: {
    width: "100%",
    margin: "auto",
    borderRadius: "100%",
  },
  textCenter: {
    textAlign: "center",
  },
  generalFeature: {
    padding: "0.25rem",
  },
  borderLinearProgress: {
    padding: "2rem",
    paddingLeft: "3rem",
    paddingRight: "3rem",
  },
  cardFeature: {
    color: "#979797",
    fontWeight: "bold",
    paddingRight: "0.1rem",
  },
  cowCodeTitle: {
    paddingBottom: "1rem",
  },
  divider: {
    marginBottom: "1rem",
  },
  checkboxSmall: {
    width: "16px",
    height: "16px",
  },

  qrImage: {
    width: "60px",
    height: "60px",
  },
  cardEditIcon: {
    backgroundColor: "#BBD1D7",
  },
  cardEditButtonCow: {
    backgroundColor: "#BBD1D7",
    "&:hover": {
      backgroundColor: "#BBD1D7",
    },
  },
  cardTitle: {
    fontWeight: "700",
    alignSelf: "flex-end",
  },
  cardHeader: {
    paddingBottom: "0.25rem",
    display: "flex",
    justifyContent: "space-between",
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
}));
