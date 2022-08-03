import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";
import GeneticStockForm from "../Forms/GeneticStockForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para poder actualizar datos al stock genetico
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const GeneticStockUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const currentGeneticStock = useSelector(
    (state) => state.geneticStock.current
  );

  useEffect(() => {
    if (!currentGeneticStock || currentGeneticStock._id !== params._id) {
      dispatch(geneticStockActions.getById({ _id: params._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      {currentGeneticStock && currentGeneticStock._id === params._id && (
        <CustomDialog parentPathname={parentPathname}>
          {(props) =>
            currentGeneticStock && (
              <GeneticStockForm
                type="update"
                initValues={{
                  ...currentGeneticStock,
                  races: currentGeneticStock.entity.races,
                }}
                onClickCancelButton={props.handleClose}
                onCompleteSubmit={props.handleClose}
                geneticType={params.geneticType.toUpperCase()}
              />
            )
          }
        </CustomDialog>
      )}
    </>
  );
};

export default GeneticStockUpdatePage;
