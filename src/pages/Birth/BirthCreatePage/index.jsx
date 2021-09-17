import CustomDialog from "../../../components/CustomDialog";
import BirthForm from "../Forms/BirthForm";

const BirthCreatePage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog maxWidth="md" parentPathname={parentPathname}>
        {(props) => <BirthForm type="create" />}
      </CustomDialog>
    </>
  );
};

export default BirthCreatePage;
