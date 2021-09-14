import CustomDialog from "../../../components/CustomDialog";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import serviceActions from "../../../redux/actions/service.actions.js";
import DeleteForm from "../../../components/Forms/DeleteForm";

/**
 * @component
 * @description Componente, renderiza un dialog
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const ServiceDeletePage = ({ parentPathname }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const onSubmit = () => {
    dispatch(serviceActions.delete({ _id: params.id })).then(() => {
      dispatch(serviceActions.listByAgribusiness());
    });
  };

  return (
    <>
      <CustomDialog parentPathName={parentPathname} maxWidth="xs">
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

export default ServiceDeletePage;
