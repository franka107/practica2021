import CustomDialog from "../../../components/CustomDialog";
import IAMNForm from "../../Services/Forms/IAMNForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar una IA a una vaca
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const IAServiceCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <IAMNForm
            type="create"
            hideAnimal={true}
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default IAServiceCreatePage;
