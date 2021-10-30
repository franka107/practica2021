import CustomDialog from "../../../components/CustomDialog";
import PalpationForm from "../../Palpation/Forms/PalpationForm";

const PalapationControlCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog maxWidth="md" parentPathname={parentPathname}>
        {(props) => (
          <PalpationForm
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

export default PalapationControlCreatePage;
