import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../../components/CustomDialog";
import DeleteForm from "../../../../components/Forms/DeleteForm";
import SaleActions from "../../../../redux/actions/sale.actions";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder eliminar ventas de animales
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const SaleDeletePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(SaleActions.deleteSale({ _id: params._id }));
  };

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <DeleteForm
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={onSubmit}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default SaleDeletePage;
