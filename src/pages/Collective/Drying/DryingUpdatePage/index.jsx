import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../../components/CustomDialog";
import DryingActions from "../../../../redux/actions/drying.actions";
import DryingForm from "../Forms/DryingForm";

const DryingUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const currentDryingControl = useSelector((state) => state.drying.current);

  useEffect(() => {
    if (!currentDryingControl || currentDryingControl._id !== params._id) {
      dispatch(DryingActions.get({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <>
            {currentDryingControl &&
              currentDryingControl._id &&
              currentDryingControl._id === params._id && (
                <DryingForm
                  type="update"
                  initValues={currentDryingControl}
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

export default DryingUpdatePage;
