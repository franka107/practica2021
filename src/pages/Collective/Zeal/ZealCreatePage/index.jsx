import CustomDialog from "../../../../components/CustomDialog";
import ZealForm from "../Forms/ZealForm";

const ZealCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="xs">
        {(props) => (
          <ZealForm
            type="create"
            onClickCancelButton={props.handleClose}
            onCompleteSubmit={props.handleClose}
          />
        )}
      </CustomDialog>
    </>
  );
};

export default ZealCreatePage;
