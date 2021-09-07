import { useHistory } from "react-router";
import { Dialog } from "@material-ui/core";
import { useStyles } from "../../styles";
import { Close } from "@material-ui/icons";

const CustomDialog = ({ children }) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Dialog
      open
      fullWidth
      classes={{ paperFullWidth: classes.customModal }}
      onClose={() => history.goBack()}
    >
      <Close
        onClick={() => history.goBack()}
        className={classes.customModal__closeBtn}
      />
      {children}
    </Dialog>
  );
};

export default CustomDialog;
