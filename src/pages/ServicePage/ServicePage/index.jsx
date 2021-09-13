import React, { useEffect } from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ChipList from "../../../components/ChipList";
import CustomMuiTable from "../../../components/CustomMuiTable";
import { serviceRouteOptions, columnsToMuiTable } from "../constants";
import serviceActions from "../../../redux/actions/service.actions";
import AnimalActions from "../../../redux/actions/animal.actions";
import { ROUTES_DICT } from "../../../routes/routesDict";

const ServicePage = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const serviceList = useSelector((state) => state.service.list);
  const animalList = useSelector((state) => state.animal.list);
  const options = {
    selectableRows: "none",
    search: false,
  };

  useEffect(() => {
    if (!animalList || animalList.length === 0) {
      dispatch(AnimalActions.listAll());
    }
    if (!serviceList || serviceList.length === 0) {
      dispatch(serviceActions.listByAgribusiness());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const actionColumn = {
    label: "Acciones",
    name: "actions",
    options: {
      searchable: false,
      filter: false,
      sort: false,
      customBodyRenderLite: (dataIndex, rowIndex) => {
        return (
          <>
            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="edit"
              onClick={() => {
                if (serviceList[dataIndex].serviceType === "EM_TR") {
                  let parentPathName = ROUTES_DICT.embryoTransferUpdate.replace(
                    ":id",
                    serviceList[dataIndex]._id
                  );
                  history.push(parentPathName);
                } else {
                  let parentPathName = ROUTES_DICT.iamnUpdate.replace(
                    ":id",
                    serviceList[dataIndex]._id
                  );
                  history.push(parentPathName);
                }
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="delete"
              onClick={() => {}}
            >
              <Delete fontSize="small" />
            </IconButton>
          </>
        );
      },
    },
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">Servicios</Typography>
      </Grid>
      <ChipList routes={serviceRouteOptions(location)}></ChipList>
      {props.children}
      <Grid item xs={12}>
        <CustomMuiTable
          columns={[...columnsToMuiTable, actionColumn]}
          data={serviceList}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

export default ServicePage;
