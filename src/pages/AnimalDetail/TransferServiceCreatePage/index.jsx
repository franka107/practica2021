import CustomDialog from "../../../components/CustomDialog";
import EmbryoTransferForm from "../../Services/Forms/EmbryoTransferForm";

const TransferServiceCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <EmbryoTransferForm
            type="create"
            hideAnimal={true}
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default TransferServiceCreatePage;
