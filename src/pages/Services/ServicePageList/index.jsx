import React, { useEffect, useState } from "react";
import { Grid, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { shallowEqual, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CustomMuiTable from "../../../components/CustomMuiTable";
import { columnsToMuiTable } from "../constants";
import serviceActions from "../../../redux/actions/service.actions";
import AnimalActions from "../../../redux/actions/animal.actions";
import { ROUTES_DICT } from "../../../routes/routesDict";
import SearchContainer from "../../../components/SearchContainer";

/**
 * @component
 * @description Componente, renderiza una tabla con la lista de servicios
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const ServicePageList = (props) => {
  // const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const serviceList = useSelector(
    (state) =>
      state.service.list.filter((e) =>
        params._id ? e.animalId === params._id : e.animalId
      ),
    shallowEqual
  );
  const animalList = useSelector((state) => state.animal.list);
  const [searchText, setSearchText] = useState();
  const options = {
    selectableRows: "none",
    search: false,
    searchText,
  };

  useEffect(() => {
    if (!animalList || animalList.length === 0) {
      dispatch(AnimalActions.list());
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
                  const parentPathName = ROUTES_DICT.service.updateET.replace(
                    ":_id",
                    serviceList[dataIndex]._id
                  );
                  history.push(parentPathName);
                } else {
                  const parentPathName = ROUTES_DICT.service.updateIAMN.replace(
                    ":_id",
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
              onClick={() => {
                const parentPathName = ROUTES_DICT.service.delete.replace(
                  ":_id",
                  serviceList[dataIndex]._id
                );
                history.push(parentPathName);
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </>
        );
      },
    },
  };

  return (
    <Grid container spacing={2}>
      <SearchContainer searchText={searchText} setSearchText={setSearchText} />
      <Grid item xs={12}>
        <CustomMuiTable
          columns={[...columnsToMuiTable, actionColumn]}
          data={serviceList.slice(0, 10)}
          options={options}
        />
      </Grid>
      {props.children()}
    </Grid>
  );
};

export default ServicePageList;
