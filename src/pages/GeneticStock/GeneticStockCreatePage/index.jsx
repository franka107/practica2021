import { useParams } from "react-router";
import CustomDialog from "../../../components/CustomDialog";
import GeneticStockForm from "../Forms/GeneticStockForm";

const GeneticStckCreatePage = ({ parentPathname }) => {
  const params = useParams();
  return (
    <>
      <CustomDialog parentPathname={parentPathname}>
        {(props) => (
          <GeneticStockForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
            geneticType={params.geneticType.toUpperCase()}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default GeneticStckCreatePage;
