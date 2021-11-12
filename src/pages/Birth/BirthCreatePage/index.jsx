import CustomDialog from "../../../components/CustomDialog";
import BirthForm from "../Forms/BirthForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar nacimientos de una vaca
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const BirthCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog maxWidth="md" parentPathname={parentPathname}>
        {(props) => (
          <BirthForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default BirthCreatePage;
