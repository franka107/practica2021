import { useParams } from "react-router";
import CustomDialog from "../../../components/CustomDialog";
import DeleteForm from "../Forms/DeleteForm";

const AnimalDeletePage = ({ parentPathname }) => {
  const params = useParams();

  return (
    <>
      <CustomDialog parentPathname={parentPathname}>
        {(props) => (
          <DeleteForm
            onClickCancelButton={props.handleClose}
            idDelete={params._id}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default AnimalDeletePage;
