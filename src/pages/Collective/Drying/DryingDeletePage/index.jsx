import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../../components/CustomDialog";
import DeleteForm from "../../../../components/Forms/DeleteForm";
import DryingActions from "../../../../redux/actions/drying.actions";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder eliminar datos de secado de una vaca
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const DryingDeletePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(DryingActions.deleteDrying({ _id: params._id }));
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

export default DryingDeletePage;
