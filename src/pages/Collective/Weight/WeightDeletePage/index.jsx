import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../../components/CustomDialog";
import DeleteForm from "../../../../components/Forms/DeleteForm";
import WeightActions from "../../../../redux/actions/weight.actions";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder eliminar pesos de un animal
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const WeightDeletePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(WeightActions.deleteWeight({ _id: params._id }));
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

export default WeightDeletePage;
