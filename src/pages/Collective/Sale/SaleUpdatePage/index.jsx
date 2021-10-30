import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../../components/CustomDialog";
import SaleActions from "../../../../redux/actions/sale.actions";
import SaleForm from "../Forms/SaleForm";

const SaleUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const currentSaleControl = useSelector((state) => state.sale.current);

  useEffect(() => {
    if (!currentSaleControl || currentSaleControl._id !== params._id) {
      dispatch(SaleActions.get({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <>
            {currentSaleControl &&
              currentSaleControl._id &&
              currentSaleControl._id === params._id && (
                <SaleForm
                  type="update"
                  initValues={currentSaleControl}
                  onClickCancelButton={props.handleClose}
                  onCompleteSubmit={props.handleClose}
                />
              )}
          </>
        )}
      </CustomDialog>
    </>
  );
};

export default SaleUpdatePage;
