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
  //http://localhost:3000/#/dashboard/genetic-stock/embryo/movements/

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
            {serviceCurrent && serviceCurrent._id === params.id && (
              <EmbryoTransferForm
                type="update"
                onClickCancelButton={props.handleClose}
                onCompleteSubmit={props.handleClose}
                initValues={serviceCurrent}
              />
            )}
            {!serviceCurrent && serviceCurrent._id !== params.id && (
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                alignItems="center"
              >
                <CircularProgress color="secondary" />
              </Grid>
            )}
          </>
        )}
      </CustomDialog>
    </>
  );
};

export default EmbryoTransferUpdatePage;
