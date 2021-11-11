import { useParams } from "react-router";
import CustomDialog from "../../../components/CustomDialog";
import GeneticStockForm from "../Forms/GeneticStockForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar datos al stock genetico
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const GeneticStckCreatePage = ({ parentPathname }) => {
  const params = useParams();
  return (
    <>
      <CustomDialog parentPathname={parentPathname}>
        {(props) => (
          <GeneticStockForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
            geneticType={params.geneticType.toUpperCase()}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default GeneticStckCreatePage;
