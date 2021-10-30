import CustomDialog from "../../../components/CustomDialog";
import QrForm from "../Forms/QRForm";

const QrViewPage = ({ parentPathname }) => {
  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="sm">
        {(props) => <QrForm />}
      </CustomDialog>
    </>
  );
};

export default QrViewPage;
