import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import CustomMuiTable from "../../../components/CustomMuiTable";
import { userColumns } from "./constants";
import { userRouteOptions } from "../constants";
import {
  useHistory,
  useLocation,
  useParams,
  generatePath,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableButtons from "../../../components/TableButtons";
import { ROUTES_DICT } from "../../../routes/routesDict";
import SearchContainer from "../../../components/SearchContainer";
import UserActions from "../../../redux/actions/user.actions";

function UserListPage({ children, setTitle, setChipList }) {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState();

  const listUser = useSelector((state) => state.user.list);

  useEffect(() => {
    setTitle("Lista de usuarios");
    setChipList(userRouteOptions(location));
    if (!listUser || listUser.length === 0) {
      dispatch(UserActions.list());
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
                generatePath(ROUTES_DICT.users.delete, {
                  ...params,
                  _id: listUser[dataIndex]._id,
                })
              );
            }}
            onClickEditButton={() => {
              history.push(
                generatePath(ROUTES_DICT.users.update, {
                  ...params,
                  _id: listUser[dataIndex]._id,
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

      <Grid item xs={12} style={{ marginTop: "2rem" }}>
        <CustomMuiTable
          data={listUser}
          columns={[...userColumns, actionColumn]}
          options={options}
        />
      </Grid>
      {children()}
    </Grid>
  );
}

export default UserListPage;
