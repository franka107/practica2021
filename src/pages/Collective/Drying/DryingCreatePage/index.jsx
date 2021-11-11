import CustomDialog from "../../../../components/CustomDialog";
import DryingForm from "../Forms/DryingForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar datos de secado de una vaca
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const DryingCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <DryingForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default DryingCreatePage;
