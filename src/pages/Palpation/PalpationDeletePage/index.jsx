import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import DeleteForm from "../../../components/Forms/DeleteForm";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";

const PalpationDeletePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(geneticStockActions.deleteGenticStock({ _id: params._id })).then(
      () => {
        dispatch(geneticStockActions.listGeneticStockByAgribusiness());
      }
    );
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

export default PalpationDeletePage;
