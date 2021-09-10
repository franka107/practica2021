import CustomDialog from "../../../components/CustomDialog";
import IAMNForm from "../Forms/IAMNForm";
import ServicePage from "../ServicePage";

const IAMNCreatePage = ({ parentPathname }) => {
  return (
    <>
      <ServicePage>
        <CustomDialog parentPathName={parentPathname}>
          {(props) => (
            <>
              <IAMNForm
                type="create"
                onCompleteSubmit={props.handleClose}
                onClickCancelButton={props.handleClose}
              />
            </>
          )}
        </CustomDialog>
      </ServicePage>
    </>
  );
};

export default IAMNCreatePage;
