import { useHistory } from "react-router";
import { Dialog } from "@material-ui/core";

const CustomDialog = ({ children }) => {
  const history = useHistory();
  return (
    <Dialog open fullWidth onClose={() => history.goBack()}>
      Probando
      {children}
    </Dialog>
  );
};

export default CustomDialog;
