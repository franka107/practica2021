import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import RegisterAgribusinessForm from "../../../components/Forms/RegisterAgribusinessForm";
// import agribusinessActions from "../../../redux/actions/agribusiness.actions";

const AgribusinessUpdatePage = ({ parentPathname }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [currentAgribusiness, setCurrentAgribusiness] = useState(null);
  const listAgribusiness = useSelector((state) => state.agribusiness.list);

  useEffect(() => {
    if (!currentAgribusiness || currentAgribusiness._id !== params._id) {
      if (listAgribusiness) {
        const ind = _.findIndex(listAgribusiness, function (o) {
          return o._id === params._id;
        });
        setCurrentAgribusiness(listAgribusiness[ind]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, listAgribusiness]);

  return (
    <>
      <CustomDialog parentPathname={parentPathname} maxWidth="md">
        {(props) => (
          <>
            {currentAgribusiness &&
              currentAgribusiness._id &&
              currentAgribusiness._id === params._id && (
                <RegisterAgribusinessForm
                  type="update"
                  initValues={currentAgribusiness}
                  onClickCancelButton={props.handleClose}
                  onCompleteSubmit={props.handleClose}
                />
              )}
          </>
        )}
      </CustomDialog>
    </>
  );
};

export default AgribusinessUpdatePage;
