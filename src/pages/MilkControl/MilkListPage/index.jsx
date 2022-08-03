import React, { useEffect, useState } from "react";
import { useHistory, useParams, generatePath } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { columns } from "./constants";
import { useStyles } from "../styles";
import CustomMuiTable from "../../../components/CustomMuiTable";
import { ROUTES_DICT } from "../../../routes/routesDict";
import TableButtons from "../../../components/TableButtons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import MilkActions from "../../../redux/actions/milkControl.actions";
import SearchContainer from "../../../components/SearchContainer";

const MilkListPage = ({ children, setTitle, setChipList }) => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchText, setSearchText] = useState();

  const listMilkControl = useSelector(
    (state) =>
      state.milk.list.filter((e) =>
        params._id ? e.animalId === params._id : e.animalId
      ),
    shallowEqual
  );

  useEffect(() => {
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
            // onClickStarButton={() => {
            //   dispatch(
            //     geneticStockActions.updateGeneticStock({
            //       ...geneticStockList[dataIndex],
            //       isFeatured: !Boolean(geneticStockList[dataIndex].isFeatured),
            //     })
            //   );
            // }}
            // starButtonFeatured={geneticStockList[dataIndex].isFeatured}
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
          data={listMilkControl.slice(1, 11)}
          columns={[...columns(listMilkControl), actionColumn]}
          options={options}
        />
      </Grid>
      {children()}
    </Grid>
  );
};

export default MilkListPage;
