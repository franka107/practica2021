import CustomDialog from "../../../components/CustomDialog";
import CollaboratorForms from "../Forms/CollaboratorForm";

const CollaboratorCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="md">
        {(props) => (
          <CollaboratorForms
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default CollaboratorCreatePage;
