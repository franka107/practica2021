import CustomDialog from "../../../../components/CustomDialog";
import ZealForm from "../Forms/ZealForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar datos del celo de una vaca
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const ZealCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <ZealForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default ZealCreatePage;
