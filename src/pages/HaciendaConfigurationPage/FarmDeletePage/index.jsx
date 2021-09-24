import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../../components/CustomDialog";
import DeleteForm from "../../../../components/Forms/DeleteForm";
import ZealActions from "../../../../redux/actions/zeal.actions";

const ZealDeletePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(ZealActions.deleteZeal({ _id: params._id }));
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

export default ZealDeletePage;
