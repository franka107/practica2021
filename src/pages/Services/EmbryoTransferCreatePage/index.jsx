import CustomDialog from "../../../components/CustomDialog";
import EmbryoTransferForm from "../Forms/EmbryoTransferForm";

const EmbryoTransferCreatePage = ({ parentPathname }) => {
  return (
    <>
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
    </>
  );
};

export default EmbryoTransferCreatePage;
