import CustomDialog from "../../../components/CustomDialog";
import MilkForm from "../../MilkControl/Forms/MilkForm";

const MilkControlCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <MilkForm
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

export default MilkControlCreatePage;
