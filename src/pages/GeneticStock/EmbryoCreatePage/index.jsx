import CustomDialog from "../../../components/CustomDialog";
import GeneticStockForm from "../Forms/GeneticStockForm";

const EmbryoCreatePage = ({ parentPathname }) => {
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
