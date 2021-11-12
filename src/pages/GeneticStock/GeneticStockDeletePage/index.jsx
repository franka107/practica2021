import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import DeleteForm from "../../../components/Forms/DeleteForm";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder eliminar datos al stock genetico
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const GeneticStockDeletePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const currentGeneticStock = useSelector(
    (state) => state.geneticStock.current
  );
  const onSubmit = () => {
    dispatch(geneticStockActions.deleteGenticStock({ _id: params._id })).then(
      () => {
        dispatch(geneticStockActions.listGeneticStockByAgribusiness());
      }
    );
  };

  useEffect(() => {
    if (!currentGeneticStock || currentGeneticStock._id !== params._id) {
      dispatch(geneticStockActions.getById({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname}>
        {(props) => (
          <DeleteForm
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={onSubmit}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default GeneticStockDeletePage;
