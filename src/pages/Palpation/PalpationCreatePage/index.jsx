import CustomDialog from "../../../components/CustomDialog";
import PalpationForm from "../Forms/PalpationForm";

const PalpationCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <PalpationForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default PalpationCreatePage;
