import CustomDialog from "../../../components/CustomDialog";
import PalpationForm from "../../Palpation/Forms/PalpationForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar palapaciones a una vaca
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const PalapationControlCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog maxWidth="md" parentPathname={parentPathname}>
        {(props) => (
          <PalpationForm
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

export default PalapationControlCreatePage;
