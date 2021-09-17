// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
// import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import MilkForm from "../Forms/MilkForm";

const MilkUpdatePage = ({ parentPathname }) => {
  // const params = useParams();
  // const dispatch = useDispatch();

  // const currentGeneticStock = useSelector(
  //   (state) => state.geneticStock.current
  // );

  // useEffect(() => {
  //   if (!currentGeneticStock || currentGeneticStock._id !== params._id) {
  //     dispatch(geneticStockActions.getById({ _id: params._id }));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <MilkForm
            type="update"
            // initValues={currentGeneticStock}
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default MilkUpdatePage;
