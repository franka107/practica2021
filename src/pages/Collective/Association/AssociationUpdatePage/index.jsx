import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../../components/CustomDialog";
import AssociationActions from "../../../../redux/actions/association.actions";
import AssociationForm from "../Forms/AssociationForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder actualizar los registro de asociaciones
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const AssociationUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const currentAssociationControl = useSelector(
    (state) => state.association.current
  );

  useEffect(() => {
    if (
      !currentAssociationControl ||
      currentAssociationControl._id !== params._id
    ) {
      dispatch(AssociationActions.get({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <>
            {currentAssociationControl &&
              currentAssociationControl._id &&
              currentAssociationControl._id === params._id && (
                <AssociationForm
                  type="update"
                  initValues={currentAssociationControl}
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

export default AssociationUpdatePage;
