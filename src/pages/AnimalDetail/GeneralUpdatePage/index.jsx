import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import GeneralForm from "../Forms/GeneralForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder actualizar los datos de un animal
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const GeneralUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const currentAnimal = useSelector((state) => state.animal.current);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <>
            {currentAnimal &&
              currentAnimal._id &&
              currentAnimal._id === params._id && (
                <GeneralForm
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

export default GeneralUpdatePage;
