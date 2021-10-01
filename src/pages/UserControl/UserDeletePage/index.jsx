import CustomDialog from "../../../components/CustomDialog";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import DeleteForm from "../../../components/Forms/DeleteForm";
import UserActions from "../../../redux/actions/user.actions";

/**
 * @component
 * @description Componente, renderiza un dialog
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const UserDeletePage = ({ parentPathname }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const onSubmit = () => {
    dispatch(UserActions.deleteUser({ _id: params._id }));
  };

  return (
    <>
      <CustomDialog parentPathName={parentPathname} maxWidth="xs">
        {(props) => (
          <DeleteForm
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={onSubmit}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default UserDeletePage;
