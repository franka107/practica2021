import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import CollaboratorActions from "../../../redux/actions/collaborator.actions";
import CollaboratorForms from "../Forms/CollaboratorForm";

const CollaboratorUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const currentCollaborator = useSelector(
    (state) => state.collaborator.current
  );

  useEffect(() => {
    if (!currentCollaborator || currentCollaborator._id !== params._id) {
      dispatch(CollaboratorActions.get({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="md">
        {(props) => (
          <>
            {currentCollaborator &&
              currentCollaborator._id &&
              currentCollaborator._id === params._id && (
                <CollaboratorForms
                  type="update"
                  initValues={currentCollaborator}
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

export default CollaboratorUpdatePage;
