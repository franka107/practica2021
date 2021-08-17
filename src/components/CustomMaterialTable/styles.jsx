import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  registerContainer: {
    paddingTop: "1rem",
  },
  paperContainer: {
    backgroundColor: "#fafafa",
  },
  filterIcon: {
    marginLeft: "0.25rem",
    width: "1rem",
    fontSize: "1rem",
  },
  filterOption: {
    color: `${theme.palette.secondary.main}`,
    padding: "1rem",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    flexDirection: "inherit",
    justifyContent: "flex-start",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  popoverDateComparison: {
    display: "flex",
  },
  datePicker: {
    maxWidth: "0rem",
  },
  popoverContainer: {
    padding: theme.spacing(2),
  },
  popoverLabel: {
    marginBottom: "1rem",
  },
  popoverDateLabel: {
    alignSelf: "center",
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
}));
