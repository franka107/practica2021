import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import MovementActions from "../../../redux/actions/movement.actions";
import { ROUTES_SLUGS } from "../../../routes/routesDict";
import MovementForm from "../Forms/MovementForm";

const MovementCreatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const parentPathnameParsed = parentPathname.replace(
    ":geneticType",
    params.geneticType
  );

  const currentMovement = useSelector((state) => state.movement.current);

  useEffect(() => {
    if (!currentMovement || currentMovement._id !== params._id) {
      dispatch(MovementActions.get({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathnameParsed}>
        {(props) => (
          <MovementForm
            type="update"
            initValues={currentMovement}
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
            geneticType={
              params.geneticType === ROUTES_SLUGS.embryo ? "EMBRYO" : "SEMEN"
            }
          />
        )}
      </CustomDialog>
    </>
  );
};

export default MovementCreatePage;
