import CustomDialog from "../../../../components/CustomDialog";
import AssociationForm from "../Forms/AssociationForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar registros de asociacion
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const AssociationCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <AssociationForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default AssociationCreatePage;
