import { useEffect } from "react";
import CustomDialog from "../../../components/CustomDialog";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import EmbryoTransferForm from "../Forms/EmbryoTransferForm";
import ServiceTablePage from "../ServicePage";
import serviceActions from "../../../redux/actions/service.actions.js";
import { useSelector } from "react-redux";

const EmbryoTransferUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const serviceCurrent = useSelector((state) => state.service.current);
  //http://localhost:3000/#/dashboard/genetic-stock/embryo/movements/

  useEffect(() => {
    if (!serviceCurrent || serviceCurrent._id !== params.id) {
      dispatch(serviceActions.listById({ _id: params.id }));
    }
  }, [dispatch]);

  return (
    <>
      <ServiceTablePage>
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
            </>
          )}
        </CustomDialog>
      </ServiceTablePage>
    </>
  );
};

export default EmbryoTransferUpdatePage;
