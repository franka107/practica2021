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
import CustomMuiTable from "../../../components/CustomMuiTable";
import { ROUTES_DICT } from "../../../routes/routesDict";
import TableButtons from "../../../components/TableButtons";
import { useDispatch, useSelector } from "react-redux";
import MilkActions from "../../../redux/actions/milkControl.actions";

const MilkListPage = ({ children, setTitle, setChipList }) => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchText] = useState();

  const listMilkControl = useSelector((state) => state.milk.list);

  useEffect(() => {
    setTitle("Control lechero");
    setChipList(saleRouteOptions(location));
    if (!listMilkControl || listMilkControl.length === 0) {
      dispatch(MilkActions.list());
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
                generatePath(ROUTES_DICT.milk.delete, {
                  ...params,
                  _id: listMilkControl[dataIndex]._id,
                })
              );
            }}
            onClickEditButton={() => {
              history.push(
                generatePath(ROUTES_DICT.milk.update, {
                  ...params,
                  _id: listMilkControl[dataIndex]._id,
                })
              );
            }}
            onClickStarButton={() => {
              // dispatch(
              //   geneticStockActions.updateGeneticStock({
              //     ...geneticStockList[dataIndex],
              //     isFeatured: !Boolean(geneticStockList[dataIndex].isFeatured),
              //   })
              // );
            }}
            // starButtonFeatured={geneticStockList[dataIndex].isFeatured}
          />
        );
      },
    },
  };
  return (
    <Grid container xs={12}>
      <Grid item xs={12} className={classes.registerContainer}>
        <CustomMuiTable
          data={listMilkControl}
          columns={[...columns, actionColumn]}
          options={options}
        />
      </Grid>
      {children()}
    </Grid>
  );
};

export default MilkListPage;
