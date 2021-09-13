import { useEffect } from "react";
import CustomDialog from "../../../components/CustomDialog";
import { ROUTES_DICT } from "../../../routes/routesDict";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import IAMNForm from "../Forms/IAMNForm";
import serviceActions from "../../../redux/actions/service.actions.js";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";

const IAMNUpdatePage = ({ parentPathname }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const parentPathName = ROUTES_DICT.service;
  const serviceCurrent = useSelector((state) => state.service.current);
  //http://localhost:3000/#/dashboard/genetic-stock/embryo/movements/

  useEffect(() => {
    if (!serviceCurrent || serviceCurrent._id !== params.id) {
      dispatch(serviceActions.listById({ _id: params.id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <>
      <CustomDialog parentPathName={parentPathName}>
        {(props) => (
          <>
            {serviceCurrent && serviceCurrent._id === params.id && (
              <IAMNForm
                type="update"
                initValues={serviceCurrent}
                onClickCancelButton={props.handleClose}
                onCompleteSubmit={props.handleClose}
              />
            )}
            {!serviceCurrent && serviceCurrent._id !== params.id && (
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                alignItems="center"
              >
                <CircularProgress color="secondary" />
              </Grid>
            )}
          </>
        )}
      </CustomDialog>
    </>
  );
};

export default IAMNUpdatePage;
