import CustomDialog from "../../../../components/CustomDialog";
import SaleForm from "../Forms/SaleForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar ventas de animales
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const SaleCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <SaleForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default SaleCreatePage;
