import { useEffect } from "react";
import CustomDialog from "../../../components/CustomDialog";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import EmbryoTransferForm from "../Forms/EmbryoTransferForm";
import serviceActions from "../../../redux/actions/service.actions.js";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

const EmbryoTransferUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const serviceCurrent = useSelector((state) => state.service.current);

  useEffect(() => {
    if (!serviceCurrent || serviceCurrent._id !== params.id) {
      dispatch(serviceActions.listById({ _id: params.id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathName={parentPathname} maxWidth="md">
        {(props) => (
          <>
            {serviceCurrent && (
              <EmbryoTransferForm
                type="update"
                initValues={serviceCurrent}
                onClickCancelButton={props.handleClose}
                onCompleteSubmit={props.handleClose}
              />
            )}
          </>
        )}
      </CustomDialog>
    </>
  );
};

export default EmbryoTransferUpdatePage;
