import CustomDialog from "../../../components/CustomDialog";
import RegisterAgribusinessForm from "../../../components/Forms/RegisterAgribusinessForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar datos masivos
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const AgribusinessCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="md">
        {(props) => (
          <RegisterAgribusinessForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default AgribusinessCreatePage;
