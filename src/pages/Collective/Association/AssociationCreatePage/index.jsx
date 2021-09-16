import CustomDialog from "../../../../components/CustomDialog";
import AssociationForm from "../Forms/AssociationForm";

const AssociationCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <AssociationForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default AssociationCreatePage;
