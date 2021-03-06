import { useParams } from "react-router";
import CustomDialog from "../../../components/CustomDialog";
import AnimalBulkForm from "../Forms/AnimalBulkForm";
import DeleteForm from "../Forms/DeleteForm";

const AnimalCreateBulkPage = ({ parentPathname }) => {
  const params = useParams();

  return (
    <>
      <CustomDialog parentPathname={parentPathname}>
        {(props) => (
          <AnimalBulkForm
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default AnimalCreateBulkPage;
