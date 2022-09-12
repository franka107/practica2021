import { useDispatch } from "react-redux";
import CustomDialog from "../../../components/CustomDialog";
import AnimalActions from "../../../redux/actions/animal.actions";
import AnimalBulkForm from "../Forms/AnimalBulkForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar datos masivos
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const AnimalCreateBulkPage = ({ parentPathname }) => {
  const dispatch = useDispatch();

  return (
    <>
      <CustomDialog
        parentPathname={parentPathname}
        action={() => {
          dispatch(AnimalActions.list());
        }}
      >
        {(props) => (
          <AnimalBulkForm
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default AnimalCreateBulkPage;
