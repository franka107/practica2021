import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import RegisterFarmForm from "../../../components/Forms/RegisterFarmForm";
import { farmActions } from "../../../redux/actions/farm.actions";

const FarmUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const currentFarm = useSelector((state) => state.farm.current);

  useEffect(() => {
    // if (!currentFarm || currentFarm._id !== params._id) {
    //   dispatch(farmActions.findFarmByOwnerId({ ownerId: params._id }));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="md">
        {(props) => (
          <>
            {currentFarm &&
              currentFarm.ownerId &&
              currentFarm.ownerId === params._id && (
                <RegisterFarmForm
                  type="update"
                  initValues={currentFarm}
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

export default FarmUpdatePage;
