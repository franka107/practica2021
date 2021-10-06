import React, { useState, useEffect } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  generatePath,
} from "react-router-dom";
import { Grid } from "@material-ui/core";
import AnimalDescription from "../AnimalDescription";
import AnimalCharts from "../AnimalCharts";
import AddAnimals from "../AddAnimals";
import { useStyles } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import CustomMuiTable from "../../../components/CustomMuiTable";
import TableButtons from "../../../components/TableButtons";
import RaceActions from "../../../redux/actions/race.actions";
import { animalRouteOptions } from "../constants";
import { columns } from "./constants";
import { ROUTES_DICT } from "../../../routes/routesDict";
import AnimalActions from "../../../redux/actions/animal.actions";

const AnimalPageList = ({ children, setTitle, setChipList }) => {
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const listAnimal = useSelector((state) => state.animal.list);
  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    setTitle("Control Ganadero");
    setChipList(animalRouteOptions(location));
    if (!listAnimal || listAnimal.length === 0) {
      dispatch(AnimalActions.list());
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
            onClickEyeButton={() => {
              history.push(
                generatePath(ROUTES_DICT.animalDetail.detail, {
                  ...params,
                  _id: listAnimal[dataIndex]._id,
                })
              );
            }}
            onClickDeleteButton={() => {
              history.push(
                generatePath(ROUTES_DICT.animal.delete, {
                  ...params,
                  _id: listAnimal[dataIndex]._id,
                })
              );
            }}
            onClickEditButton={() => {
              history.push(
                generatePath(ROUTES_DICT.animal.update, {
                  ...params,
                  _id: listAnimal[dataIndex]._id,
                })
              );
            }}
            onClickStarButton={() => {
              dispatch(
                AnimalActions.update({
                  ...listAnimal[dataIndex],
                  isFeatured: !Boolean(listAnimal[dataIndex].isFeatured),
                })
              );
            }}
            starButtonFeatured={listAnimal[dataIndex].isFeatured}
          />
        );
      },
    },
  };

  return (
    <Grid item container xs={12}>
      <AnimalDescription />
      <AnimalCharts />
      <AddAnimals searchText={searchText} setSearchText={setSearchText} />
      <Grid item xs={12} className={classes.registerContainer}>
        <CustomMuiTable
          data={listAnimal}
          columns={[...columns, actionColumn]}
          options={options}
        />
      </Grid>
      {children()}
      {/* <Dialog
        open={Boolean(open)}
        fullWidth
        onClose={() => {
          setOpen(false);
          dispatch({ type: ACTION_TYPES.ANIMAL.UPDATE_CURRENT, payload: null });
        }}
        aria-labelledby="alert-dialog-title"
        maxWidth={dialogOption === "delete" ? "xs" : "sm"}
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close
          className={classes.closeBtn}
          onClick={() => {
            setOpen(false);
            dispatch({
              type: ACTION_TYPES.ANIMAL.UPDATE_CURRENT,
              payload: null,
            });
          }}
        />
        {dialogOption === "delete" && (
          <Grid className={classes.modal}>
            <Typography variant={"subtitle1"} gutterBottom>
              Eliminar Registro
            </Typography>
            <Formik
              initialValues={initValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <Grid container spacing={1}>
                    <SelectFieldFormik
                      label="Motivo"
                      name="motive"
                      onChange={props.handleChange}
                      options={deleteOptions}
                      xs={6}
                    />
                    <DatePickerFieldFormik
                      label="Fecha"
                      name="activeUpdatedOn"
                      onChange={props.handleChange}
                      xs={6}
                    />
                    <TextFieldFormik
                      label="Detalles"
                      name="motiveDetail"
                      type="text"
                      multiline
                      rows={3}
                      onChange={props.handleChange}
                      xs={12}
                    ></TextFieldFormik>
                  </Grid>
                  <Grid item container justifyContent={"flex-end"} xs={12}>
                    <Grid item xs={4} className={classes.paddingButton}>
                      <ButtonFormik xs={4} label="Cancelar" type="cancel" />
                    </Grid>
                    <Grid item xs={4}>
                      <ButtonFormik xs={4} label="Confirmar" type="submit" />
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        )}
        {dialogOption === "update" && (
          <AddIndividual
            setOpen={setOpen}
            typeAccion="update"
            animalId={animalId}
          />
        )}
      </Dialog> */}
    </Grid>
  );
};
export default AnimalPageList;
