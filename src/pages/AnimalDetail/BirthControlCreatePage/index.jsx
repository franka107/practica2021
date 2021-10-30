import CustomDialog from "../../../components/CustomDialog";
import BirthForm from "../../Birth/Forms/BirthForm";

const BirthControlCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog maxWidth="md" parentPathname={parentPathname}>
        {(props) => (
          <BirthForm
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

export default BirthControlCreatePage;
