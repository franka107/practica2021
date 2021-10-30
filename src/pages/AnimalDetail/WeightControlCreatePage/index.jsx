import CustomDialog from "../../../components/CustomDialog";
import WeightForm from "../../Collective/Weight/Forms/WeightForm";

const WeightControlCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => (
          <WeightForm
            type="create"
            hideAnimal={true}
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default WeightControlCreatePage;
