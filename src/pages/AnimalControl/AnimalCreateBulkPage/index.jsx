import { useParams } from "react-router";
import CustomDialog from "../../../components/CustomDialog";
import AnimalBulkForm from "../Forms/AnimalBulkForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder agregar datos masivos
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const AnimalCreateBulkPage = ({ parentPathname }) => {
  const params = useParams();

  return (
    <>
      <CustomDialog parentPathname={parentPathname}>
        {(props) => (
          <AnimalBulkForm
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default AnimalCreateBulkPage;
