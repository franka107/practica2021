import CustomDialog from "../../../components/CustomDialog";
import QrForm from "../Forms/QRForm";

/**
 * @component
 * @description Componente, dialog o modal que contiene el formulario para visualizar el qr de un animal
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

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
