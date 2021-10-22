import { useEffect } from "react";
import CustomDialog from "../../../components/CustomDialog";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import IAMNForm from "../Forms/IAMNForm";
import serviceActions from "../../../redux/actions/service.actions.js";
import { useSelector } from "react-redux";

const IAMNUpdatePage = ({ parentPathname }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const serviceCurrent = useSelector((state) => state.service.current);

  useEffect(() => {
    if (!serviceCurrent || serviceCurrent._id !== params._id) {
      dispatch(serviceActions.listById({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathName={parentPathname}>
        {(props) => (
          <>
            {serviceCurrent && (
              <IAMNForm
                type="update"
                initValues={serviceCurrent}
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

export default IAMNUpdatePage;
