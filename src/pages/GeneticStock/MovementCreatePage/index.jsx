import { useParams, useLocation } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import { ROUTES_DICT, ROUTES_SLUGS } from "../../../routes/routesDict";
import MovementForm from "../Forms/MovementForm";
import MovementPage from "../MovementPage";

const MovementCreatePage = ({ parentPathname }) => {
  const params = useParams();
  const parentPathnameParsed = parentPathname.replace(
    ":geneticType",
    params.geneticType
  );

  return (
    <>
      <CustomDialog parentPathname={parentPathnameParsed}>
        {(props) => (
          <MovementForm
            type="create"
            onClickCancelButton={props.handleClose}
            geneticType={
              params.geneticType === ROUTES_SLUGS.embryo ? "EMBRYO" : "SEMEN"
            }
          />
        )}
      </CustomDialog>
    </>
  );
};

export default MovementCreatePage;
