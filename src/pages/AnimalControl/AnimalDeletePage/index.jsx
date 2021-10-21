import { useParams } from "react-router";
import CustomDialog from "../../../components/CustomDialog";
import DeleteForm from "../Forms/DeleteForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder eliminar animales
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const AnimalDeletePage = ({ parentPathname }) => {
  const params = useParams();

  return (
    <>
      <CustomDialog parentPathname={parentPathname}>
        {(props) => (
          <DeleteForm
            onClickCancelButton={props.handleClose}
            idDelete={params._id}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default AnimalDeletePage;
