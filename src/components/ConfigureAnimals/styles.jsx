import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  modal: {
    paddingTop: "1.5rem",
    marginBottom: theme.spacing(1),
  },
  container: {
    border: `2px solid ${theme.palette.primary.light}`,
    padding: "1rem 5rem",
    width: "100%",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
  },
  containerCategory: {
    border: `2px solid ${theme.palette.primary.light}`,
    padding: "1rem",
    width: "100%",
    alignItems: "center",
    margin: 0,
  },
  numberInput: {
    minWidth: 60,
    width: 25,
    margin: "0 .25rem",
  },
  numberInputText: {
    width: 70,
    margin: "0 .25rem",
  },
  animalItem: {
    paddingBottom: ".5rem",
  },
  input: {
    minWidth: 160,
    width: "100%",
    maxWidth: 80,
    margin: "0 .1rem",
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
      maxWidth: "100%",
    },
  },
  animalTitle: {
    fontWeight: 400,
    opacity: 0.7,
  },
  animalTitleBold: {
    fontWeight: 400,
    color: "black",
  },
  title: {
    color: theme.palette.general.contrastText,
    fontWeight: "bold",
    padding: ".5rem 0",
  },
  subtitle: {
    color: theme.palette.general.contrastText,
    fontWeight: 600,
    padding: ".5rem 0",
    opacity: 0.5,
  },
  prevBtn: {
    marginTop: "2rem",
    marginBottom: "2rem",
    backgroundColor: theme.palette.button.secondary,
    margin: "1.5rem 0 .8rem 0",
    width: "100%",
    "&:hover": {
      backgroundColor: theme.palette.button.secondary,
    },
  },
  nextBtn: {
    marginTop: "2rem",
    marginBottom: "2rem",
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  barnName: {
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
    padding: "1rem",
  },
  rightText: {
    textAlign: "end",
  },
  costContainer: {
    marginTop: "1rem",
  },
  inputNumberText: {
    padding: ".5rem .3rem",
  },
}));
