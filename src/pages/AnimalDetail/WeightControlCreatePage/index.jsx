import CustomDialog from "../../../components/CustomDialog";
import WeightForm from "../../Collective/Weight/Forms/WeightForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar datos de pesos de un animal
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const WeightControlCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <WeightForm
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

export default WeightControlCreatePage;
