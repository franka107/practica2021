import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../../components/CustomDialog";
import ZealActions from "../../../../redux/actions/zeal.actions";
import ZealForm from "../Forms/ZealForm";

const ZealUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const currentZeal = useSelector((state) => state.zeal.current);

  useEffect(() => {
    if (!currentZeal || currentZeal._id !== params._id) {
      dispatch(ZealActions.get({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <>
            {currentZeal &&
              currentZeal._id &&
              currentZeal._id === params._id && (
                <ZealForm
                  type="update"
                  initValues={currentZeal}
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

export default ZealUpdatePage;
