import React, { useEffect } from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ChipList from "../../../components/ChipList";
import CustomMuiTable from "../../../components/CustomMuiTable";
import { serviceRouteOptions, columnsToMuiTable } from "../constants";
import ServiceIAMNActions from "../../../redux/actions/serviceIAMN.actions";

const ServicePage = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const serviceIAMNList = useSelector((state) => state.serviceIAMN.list);
  const options = {
    selectableRows: "none",
    search: false,
  };

  useEffect(() => {
    dispatch(ServiceIAMNActions.listByAgribusiness());
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
              onClick={() => {}}
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
          data={serviceIAMNList}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ServicePage);
