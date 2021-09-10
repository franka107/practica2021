import { useHistory, useLocation } from "react-router";
import { Dialog } from "@material-ui/core";
import { useStyles } from "../../styles";
import { Close } from "@material-ui/icons";

const CustomDialog = ({ children, parentPathname }) => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const handleClose = () => {
    if (location.state && location.state.background) {
      history.push(location.state.background.pathname);
    } else if (parentPathname) {
      history.push(parentPathname);
    } else {
      history.goBack();
    }
  };
  return (
    <Dialog
      open
      fullWidth
      classes={{ paperFullWidth: classes.customModal }}
      onClose={handleClose}
    >
      <Close onClick={handleClose} className={classes.customModal__closeBtn} />
      {children({ handleClose })}
    </Dialog>
  );
};

export default CustomDialog;
