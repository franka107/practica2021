import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import MovementActions from "../../../redux/actions/movement.actions";
import { ROUTES_SLUGS } from "../../../routes/routesDict";
import GeneticStockForm from "../Forms/GeneticStockForm";
import MovementForm from "../Forms/MovementForm";

const SemenUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const currentGeneticStock = useSelector(
    (state) => state.geneticStock.current
  );

  useEffect(() => {
    if (!currentGeneticStock || currentGeneticStock._id !== params._id) {
      dispatch(geneticStockActions.listGeneticStockById({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname}>
        {(props) => (
          <GeneticStockForm
            type="update"
            initValues={currentGeneticStock}
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
            geneticType={"SEMEN"}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default SemenUpdatePage;
