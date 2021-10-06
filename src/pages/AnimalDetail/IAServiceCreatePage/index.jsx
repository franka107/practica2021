import CustomDialog from "../../../components/CustomDialog";
import IAMNForm from "../../Services/Forms/IAMNForm";

const IAServiceCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <IAMNForm
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

export default IAServiceCreatePage;
