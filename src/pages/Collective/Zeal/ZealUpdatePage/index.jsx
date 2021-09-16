// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import CustomDialog from "../../../../components/CustomDialog";
// import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import ZealForm from "../Forms/ZealForm";

const ZealUpdatePage = ({ parentPathname }) => {
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
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <ZealForm
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

export default ZealUpdatePage;
