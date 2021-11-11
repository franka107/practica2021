import CustomDialog from "../../../components/CustomDialog";
import BirthForm from "../../Birth/Forms/BirthForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar nacimientos a un animal
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const BirthControlCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog maxWidth="md" parentPathname={parentPathname}>
        {(props) => (
          <BirthForm
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

export default BirthControlCreatePage;
