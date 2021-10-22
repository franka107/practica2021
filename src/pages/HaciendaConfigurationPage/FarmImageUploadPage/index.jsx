import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CustomDialog from "../../../components/CustomDialog";
import HaciendaImageForm from "../Forms/HaciendaImageForm";

const FarmImageUploadPage = ({ parentPathname }) => {
  const dispatch = useDispatch();

  const currentFarm = useSelector((state) => state.farm.current);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <HaciendaImageForm
            from="farm"
            initValues={currentFarm}
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default FarmImageUploadPage;
