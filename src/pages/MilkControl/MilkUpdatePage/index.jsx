import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import MilkActions from "../../../redux/actions/milkControl.actions";
import MilkForm from "../Forms/MilkForm";

const MilkUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const currentMilkControl = useSelector((state) => state.milk.current);

  useEffect(() => {
    if (!currentMilkControl || currentMilkControl._id !== params._id) {
      dispatch(MilkActions.get({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <>
            {currentMilkControl &&
              currentMilkControl._id &&
              currentMilkControl._id === params._id && (
                <MilkForm
                  type="update"
                  initValues={currentMilkControl}
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

export default MilkUpdatePage;
