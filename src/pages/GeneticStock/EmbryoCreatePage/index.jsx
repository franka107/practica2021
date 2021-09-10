import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import { ROUTES_SLUGS } from "../../../routes/routesDict";
import GeneticStockForm from "../Forms/GeneticStockForm";

const EmbryoCreatePage = ({ parentPathname }) => {
  const params = useParams();

  return (
    <>
      <CustomDialog parentPathname={parentPathname}>
        {(props) => (
          <GeneticStockForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default EmbryoCreatePage;
