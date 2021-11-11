import CustomDialog from "../../../components/CustomDialog";
import EmbryoTransferForm from "../../Services/Forms/EmbryoTransferForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar una tranferencia de embriones a una vaca
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const TransferServiceCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <EmbryoTransferForm
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

export default TransferServiceCreatePage;
