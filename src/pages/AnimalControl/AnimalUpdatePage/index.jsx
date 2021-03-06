import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import CustomDialog from "../../../components/CustomDialog";
import AnimalActions from "../../../redux/actions/animal.actions";
import AnimalForm from "../Forms/AnimalForm";

const AnimalUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const currentAnimal = useSelector((state) => state.animal.current);

  useEffect(() => {
    if (!currentAnimal || currentAnimal._id !== params._id) {
      dispatch(AnimalActions.get({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname}>
        {(props) => (
          <>
            {currentAnimal &&
              currentAnimal._id &&
              currentAnimal._id === params._id && (
                <AnimalForm
                  type="update"
                  initValues={currentAnimal}
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

export default AnimalUpdatePage;
