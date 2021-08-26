import { Typography } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import { useState } from "react";
import RegisterAgribusinessForm from "../../components/Forms/RegisterAgribusinessForm";
import RegisterFarmForm from "../../components/Forms/RegisterFarmForm";
import { useStyles } from "./styles";

export default function SetupControlPage() {
  const classes = useStyles();
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
        {registerStep === 0 && (
          <RegisterFarmForm setRegisterStep={setRegisterStep} />
        )}
        {registerStep === 1 && <RegisterAgribusinessForm />}
        <Typography variant={"caption"} className={classes.stepCounter}>
          {`Paso ${registerStep + 1}/2`}
        </Typography>
      </Dialog>
    </>
  );
}
