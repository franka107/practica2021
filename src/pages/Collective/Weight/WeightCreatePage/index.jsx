import CustomDialog from "../../../../components/CustomDialog";
import WeightForm from "../Forms/WeightForm";

const WeightCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <WeightForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default WeightCreatePage;
