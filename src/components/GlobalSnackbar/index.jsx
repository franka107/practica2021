import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../redux/actions/ui.actions";

export const GlobalSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("I'm a custom snackbar");
  const [duration, setDuration] = useState(4000);
  const [severity, setSeverity] =
    useState("success"); /** error | warning | info */
  const dispatch = useDispatch();
  const { snackbarMessage, snackbarSeverity, snackbarDuration, snackbarOpen } =
    useSelector((state) => state.ui);

  const showMessage = (message, severity, duration) => {
    setMessage(message);
    setSeverity(severity);
    setDuration(duration);
    setOpen(true);
  };

  useEffect(() => {
    if (snackbarOpen) {
      showMessage(snackbarMessage, snackbarSeverity, snackbarDuration);
      setTimeout(() => {
        setOpen(false);
        dispatch(uiActions.clearSnackbar());
      }, duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackbarOpen]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={duration}
        open={open}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
