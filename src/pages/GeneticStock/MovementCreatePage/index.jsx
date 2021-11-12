import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import { ROUTES_SLUGS } from "../../../routes/routesDict";
import MovementForm from "../Forms/MovementForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar datos al movimientos
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const MovementCreatePage = ({ parentPathname }) => {
  const params = useParams();
  const parentPathnameParsed = parentPathname.replace(
    ":geneticType",
    params.geneticType
  );

  return (
    <>
      <CustomDialog parentPathname={parentPathnameParsed} maxWidth="md">
        {(props) => (
          <MovementForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
            geneticType={
              params.geneticType === ROUTES_SLUGS.embryo ? "EMBRYO" : "SEMEN"
            }
          />
        )}
      </CustomDialog>
    </>
  );
};

export default MovementCreatePage;
