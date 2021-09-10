import { useEffect } from "react";
import CustomDialog from "../../../components/CustomDialog";
import { ROUTES_DICT } from "../../../routes/routesDict";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import IAMNForm from "../Forms/IAMNForm";
import ServiceTablePage from "../ServiceTablePage";
import serviceActions from "../../../redux/actions/service.actions.js";
import { useSelector } from "react-redux";

const defaultInitValues = {
  agribusinessId: "",
  animalId: "",
  name: "",
  serviceDate: new Date(),
  serviceTime: "",
  serviceType: "",
  reproductorAnimalId: null,
  geneticStockId: null,
  userId: null,
  strawQuantity: 0,
  strawGender: "",
  isIatf: false,
  observation: "",
};

const ServiceFormPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const parentPathName = ROUTES_DICT.service;
  const serviceCurrent = useSelector((state) => state.service.current);
  //http://localhost:3000/#/dashboard/genetic-stock/embryo/movements/

  useEffect(() => {
    if (params.id) {
      dispatch(serviceActions.listById({ _id: params.id }));
    }
  }, [dispatch, params]);

  return (
    <>
      <ServiceTablePage>
        <CustomDialog parentPathName={parentPathName}>
          {(props) => (
            <>
              {serviceCurrent && params.id && (
                <IAMNForm
                  type="update"
                  onClickCancelButton={props.handleClose}
                  initValues={serviceCurrent}
                />
              )}
              {!params.id && (
                <IAMNForm
                  type="create"
                  onClickCancelButton={props.handleClose}
                  initValues={defaultInitValues}
                />
              )}
            </>
          )}
        </CustomDialog>
      </ServiceTablePage>
    </>
  );
};

export default ServiceFormPage;
