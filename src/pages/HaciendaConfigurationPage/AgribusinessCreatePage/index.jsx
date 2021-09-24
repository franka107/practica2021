import CustomDialog from "../../../components/CustomDialog";
import RegisterAgribusinessForm from "../../../components/Forms/RegisterAgribusinessForm";

const AgribusinessCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="md">
        {(props) => (
          <RegisterAgribusinessForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default AgribusinessCreatePage;
