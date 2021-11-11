import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../../components/CustomDialog";
import WeightActions from "../../../../redux/actions/weight.actions";
import WeightForm from "../Forms/WeightForm";

/**
 * @component
 * @description Componente, tabla que contiene la lista de los pesos de animales
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const WeightUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const currentWeightControl = useSelector((state) => state.weight.current);

  useEffect(() => {
    if (!currentWeightControl || currentWeightControl._id !== params._id) {
      dispatch(WeightActions.get({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <>
            {currentWeightControl &&
              currentWeightControl._id &&
              currentWeightControl._id === params._id && (
                <WeightForm
                  type="update"
                  initValues={currentWeightControl}
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

export default WeightUpdatePage;
