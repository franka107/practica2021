import { generatePath, useHistory, useLocation, useParams } from "react-router";
import { Dialog } from "@material-ui/core";
import { useStyles } from "../../styles";
import { Close } from "@material-ui/icons";

const CustomDialog = ({ children, parentPathname, maxWidth = "sm" }) => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const params = useParams();
  const handleClose = () => {
    if (
      location.state &&
      location.state.background &&
      location.state.background.pathname !== location.pathname
    ) {
      history.push(generatePath(location.state.background.pathname, params));
    } else if (parentPathname) {
      history.push(generatePath(parentPathname, params));
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
      maxWidth={maxWidth}
    >
      <Close onClick={handleClose} className={classes.customModal__closeBtn} />
      {children({ handleClose })}
    </Dialog>
  );
};

export default CustomDialog;
