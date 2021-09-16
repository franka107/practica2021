import CustomDialog from "../../../../components/CustomDialog";
import SaleForm from "../Forms/SaleForm";

const SaleCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <SaleForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default SaleCreatePage;
