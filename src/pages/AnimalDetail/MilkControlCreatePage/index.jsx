import CustomDialog from "../../../components/CustomDialog";
import MilkForm from "../../MilkControl/Forms/MilkForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar controles lecheros a una vaca
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const MilkControlCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <MilkForm
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

export default MilkControlCreatePage;
