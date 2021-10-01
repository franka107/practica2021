import CustomDialog from "../../../components/CustomDialog";
import UserForm from "../Forms/UserForm";

const UserCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathName={parentPathname}>
        {(props) => (
          <>
            <UserForm
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

export default UserCreatePage;
