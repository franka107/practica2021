import { useEffect } from "react";
import CustomDialog from "../../../components/CustomDialog";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import UserForm from "../Forms/UserForm";
import UserActions from "../../../redux/actions/user.actions";

const UserUpdatePage = ({ parentPathname }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const userCurrent = useSelector((state) => state.user.current);

  useEffect(() => {
    if (!userCurrent || userCurrent._id !== params._id) {
      dispatch(UserActions.get({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathName={parentPathname}>
        {(props) => (
          <>
            {userCurrent &&
              userCurrent._id &&
              userCurrent._id === params._id && (
                <UserForm
                  type="update"
                  initValues={{ ...userCurrent, profile: "BASIC" }}
                  onClickCancelButton={props.handleClose}
                  onCompleteSubmit={props.handleClose}
                />
              )}
          </>
        )}
      </CustomDialog>
    </>
  );
};

export default UserUpdatePage;
