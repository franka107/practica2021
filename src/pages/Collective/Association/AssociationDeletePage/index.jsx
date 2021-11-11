import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../../components/CustomDialog";
import DeleteForm from "../../../../components/Forms/DeleteForm";
import AssociationActions from "../../../../redux/actions/association.actions";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder eliminar registros de asociacion
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const AssociationDeletePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(AssociationActions.deleteAssociation({ _id: params._id }));
  };

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
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

export default AssociationDeletePage;
