import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import create from "zustand";

const useConfirmDialogStore = create((set) => ({
  title: "",
  message: "",
  textOk: null,
  textCancel: "",
  onSumit: undefined,
  close: () => {
    set({
      onSubmit: undefined,
    });
  },
}));

export const customModal = ({
  title,
  message,
  textOk = null,
  textCancel = "OK",
  onSubmit = null,
}) => {
  useConfirmDialogStore.setState({
    title,
    message,
    textOk,
    textCancel,
    onSubmit,
  });
};

const CustomModal = () => {
  const { title, message, onSubmit, textOk, textCancel, close } =
    useConfirmDialogStore();

  return (
    <Dialog
      open={Boolean(onSubmit)}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>{textCancel}</Button>
        {textOk && (
          <Button
            onClick={() => {
              onSubmit();
              close();
            }}
            autoFocus
          >
            {textOk}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
