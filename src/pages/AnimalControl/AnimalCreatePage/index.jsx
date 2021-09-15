import CustomDialog from "../../../components/CustomDialog";
import AnimalForm from "../Forms/AnimalForm";

const AnimalCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname}>
        {(props) => (
          <AnimalForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default AnimalCreatePage;
