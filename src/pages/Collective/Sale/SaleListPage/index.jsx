import React, { useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  generatePath,
} from "react-router-dom";
import { Grid } from "@material-ui/core";
import { columns } from "./constants";
import { saleRouteOptions } from "../constants";
import { useStyles } from "../styles";
import CustomMuiTable from "../../../../components/CustomMuiTable";
import { ROUTES_DICT } from "../../../../routes/routesDict";
import TableButtons from "../../../../components/TableButtons";
import { useDispatch, useSelector } from "react-redux";
import SaleActions from "../../../../redux/actions/sale.actions";
import SearchContainer from "../../../../components/SearchContainer";

/**
 * @component
 * @description Componente, tabla que contiene la lista de ventas de animales
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const SaleListPage = ({ children, setTitle, setChipList }) => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchText, setSearchText] = useState();

  const listSaleControl = useSelector((state) => state.sale.list);

  useEffect(() => {
    setTitle("Colectiva / Ventas");
    setChipList(saleRouteOptions(location));
    if (!listSaleControl || listSaleControl.length === 0) {
      dispatch(SaleActions.list());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = {
    selectableRows: "none",
    searchText,
    search: false,
  };
  const actionColumn = {
    label: "Acciones",
    name: "actions",
    options: {
      searchable: false,
      filter: false,
      sort: false,
      customBodyRenderLite: (dataIndex, rowIndex) => {
        return (
          <TableButtons
            onClickDeleteButton={() => {
              history.push(
                generatePath(ROUTES_DICT.collective.sale.delete, {
                  ...params,
                  _id: listSaleControl[dataIndex]._id,
                })
              );
            }}
            onClickEditButton={() => {
              history.push(
                generatePath(ROUTES_DICT.collective.sale.update, {
                  ...params,
                  _id: listSaleControl[dataIndex]._id,
                })
              );
            }}
          />
        );
      },
    },
  };
  return (
    <Grid container xs={12}>
      <SearchContainer searchText={searchText} setSearchText={setSearchText} />

      <Grid item xs={12} className={classes.registerContainer}>
        <CustomMuiTable
          data={listSaleControl}
          columns={[...columns, actionColumn]}
          options={options}
        />
      </Grid>
      {children()}
    </Grid>
  );
};

export default SaleListPage;
