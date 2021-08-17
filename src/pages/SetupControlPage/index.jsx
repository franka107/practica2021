import { Dialog } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import RegisterFarm from "./RegisterFarm";
import { useStyles } from "./styles";

export default function SetupControlPage() {
  const classes = useStyles();
  const history = useHistory();
  const [registerStep, setRegisterStep] = useState(0);
  return (
    <>
      <Dialog
        open={true}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        {registerStep === 0 && <RegisterFarm />}
      </Dialog>
    </>
  );
}
