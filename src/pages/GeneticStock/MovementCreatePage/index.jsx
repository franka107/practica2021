import { useParams } from "react-router";
import CustomDialog from "../../../components/CustomDialog";
import { ROUTES_DICT } from "../../../routes/routesDict";
import MovementForm from "../Forms/MovementForm";
import MovementPage from "../MovementPage";

const MovementCreatePage = () => {
  const params = useParams();
  const parentPathName = ROUTES_DICT.movements.replace(
    ":geneticType",
    params.geneticType
  );
  //http://localhost:3000/#/dashboard/genetic-stock/embryo/movements/

  return (
    <>
      <MovementPage>
        <CustomDialog parentPathName={parentPathName}>
          {(props) => (
            <MovementForm
              type="create"
              onClickCancelButton={props.handleClose}
            />
          )}
        </CustomDialog>
      </MovementPage>
    </>
  );
};

export default MovementCreatePage;
