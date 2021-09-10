import CustomDialog from "../../../components/CustomDialog";
import EmbryoTransferForm from "../Forms/EmbryoTransferForm";
import ServicePage from "../ServicePage";

const EmbryoTransferCreatePage = ({ parentPathname }) => {
  return (
    <>
      <ServicePage>
        <CustomDialog parentPathName={parentPathname} maxWidth="md">
          {(props) => (
            <>
              <EmbryoTransferForm
                type="create"
                onClickCancelButton={props.handleClose}
                onCompleteSubmit={props.handleClose}
              />
            </>
          )}
        </CustomDialog>
      </ServicePage>
    </>
  );
};

export default EmbryoTransferCreatePage;
