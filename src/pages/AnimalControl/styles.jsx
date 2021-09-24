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
  formControlContainer: {
    flexDirection: "row !important",
    justifyContent: "space-between !important",
  },
  checkBoxFormControl: {
    padding: ".3rem .2rem 0",
  },
  checkBoxLabelForm: {
    fontSize: 13,
  },
  raceInput: {
    minWidth: "100%",
  },
  raceContainer: {
    padding: "1rem 0",
  },
  border: {
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "0 1rem",
    marginBottom: "1rem",
    position: "relative",
  },
  addBtn: {
    color: theme.palette.primary.main,
    position: "absolute",
    right: -12,
    bottom: 7,
    backgroundColor: "white",
    cursor: "pointer",
  },
  hidden: {
    display: "none !important",
  },
  deleteIcon: {
    cursor: "pointer",
    marginLeft: theme.spacing(1),
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
  categoryForm: {
    padding: ".5rem",
  },
  rightText: {
    textAlign: "end",
  },
}));
