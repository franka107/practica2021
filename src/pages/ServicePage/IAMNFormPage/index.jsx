import CustomDialog from "../../../components/CustomDialog";
import { ROUTES_DICT } from "../../../routes/routesDict";
import IAMNForm from "../Forms/IAMNForm";
import ServiceTablePage from "../ServiceTablePage";

const ServiceFormPage = () => {
  const parentPathName = ROUTES_DICT.service;
  //http://localhost:3000/#/dashboard/genetic-stock/embryo/movements/

  return (
    <>
      <ServiceTablePage>
        <CustomDialog parentPathName={parentPathName}>
          {(props) => (
            <IAMNForm type="create" onClickCancelButton={props.handleClose} />
          )}
        </CustomDialog>
      </ServiceTablePage>
    </>
  );
};

export default ServiceFormPage;
