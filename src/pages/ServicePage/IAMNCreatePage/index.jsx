import CustomDialog from "../../../components/CustomDialog";
import IAMNForm from "../Forms/IAMNForm";

const IAMNCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathName={parentPathname}>
        {(props) => (
          <>
            <IAMNForm
              type="create"
              onCompleteSubmit={props.handleClose}
              onClickCancelButton={props.handleClose}
            />
          </>
        )}
      </CustomDialog>
    </>
  );
};

export default IAMNCreatePage;
