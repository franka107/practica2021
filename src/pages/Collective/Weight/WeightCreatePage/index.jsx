import CustomDialog from "../../../../components/CustomDialog";
import WeightForm from "../Forms/WeightForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar pesos de un animal
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const WeightCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <WeightForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default WeightCreatePage;
