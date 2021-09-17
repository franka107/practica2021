import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import PalpationActions from "../../../redux/actions/palpation.actions";
import PalpationForm from "../Forms/PalpationForm";

const PalpationUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const currentPalpationControl = useSelector(
    (state) => state.palpation.current
  );

  useEffect(() => {
    if (
      !currentPalpationControl ||
      currentPalpationControl._id !== params._id
    ) {
      dispatch(PalpationActions.get({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <>
            {currentPalpationControl &&
              currentPalpationControl._id &&
              currentPalpationControl._id === params._id && (
                <PalpationForm
                  type="update"
                  initValues={currentPalpationControl}
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

export default PalpationUpdatePage;
