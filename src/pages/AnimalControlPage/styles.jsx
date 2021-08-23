import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  registerContainer: {
    paddingTop: "1rem",
  },
  errorsContainer: {
    paddingTop: "1rem",
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 10,
    cursor: "pointer",
  },
  modal: {
    padding: "1.2rem",
  },
  btnCancel: {
    marginRight: "1.2rem",
  },
}));
