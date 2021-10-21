import CustomDialog from "../../../components/CustomDialog";
import AnimalForm from "../Forms/AnimalForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar animales
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const AnimalCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname}>
        {(props) => (
          <AnimalForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default AnimalCreatePage;
