import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography, IconButton, Dialog } from "@material-ui/core";
import AnimalDescription from "./AnimalDescription";
import AnimalCharts from "./AnimalCharts";
import AddAnimals from "./AddAnimals";
import { useStyles } from "./styles";
import { columnsToMuiTable } from "./constants";
import { Delete, Edit, Visibility, Close } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { animalActions } from "../../redux/actions/animal.actions";
import { ROUTES_DICT } from "../../routes/routesDict";
import { Formik } from "formik";
import * as yup from "yup";
import SelectFieldFormik from "../../components/Inputs/SelectFieldFormik";
import DatePickerFieldFormik from "../../components/Inputs/DatePickerFieldFormik";
import ButtonFormik from "../../components/Inputs/ButtonFormik";
import AddIndividual from "./AddAnimals/AddIndividual";
import ACTION_TYPES from "../../redux/types";
import CustomMuiTable from "../../components/CustomMuiTable";
import RaceActions from "../../redux/actions/race.actions";
import { deleteOptions } from "../../constants";

function AnimalControlPage() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [dialogOption, setDialogOption] = useState("");
  const [animalId, setAnimalId] = useState("");
  const dispatch = useDispatch();
  const { list: animals } = useSelector((state) => state.animal);
  const { current: currentAgribusiness } = useSelector(
    (state) => state.agribusiness
  );
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.ANIMAL.UPDATE_CURRENT, payload: null });
  }, [dispatch]);

  useEffect(() => {
    dispatch(RaceActions.listRace());
    if (currentAgribusiness) {
      dispatch(animalActions.listAll(currentAgribusiness._id));
    }
  }, [dispatch, currentAgribusiness]);

  const [initValues] = useState({
    motive: "",
    activeUpdatedOn: new Date(),
  });

  const handleSubmit = (values) => {
    values._id = animalId;
    console.log(values);
    dispatch(animalActions.deleteElement(values)).then(
      (data) => {
        history.push(ROUTES_DICT.animalControl);
      },
      (error) => {}
    );
  };
  const validationSchema = yup.object({});

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
          <>
            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="edit"
              onClick={() => {
                history.push(
                  `${ROUTES_DICT.animalDetail}/${animals[dataIndex]._id}`
                );
              }}
            >
              <Visibility fontSize="small" />
            </IconButton>
            {/* </Link> */}
            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="edit"
              onClick={() => {
                setOpen(true);
                setDialogOption("update");
                setAnimalId(animals[dataIndex]._id);
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="delete"
              onClick={() => {
                setOpen(true);
                setDialogOption("delete");
                setAnimalId(animals[dataIndex]._id);
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
    <Grid item container xs={12}>
      <Typography variant={"h6"}>Control Ganadero</Typography>
      <AnimalDescription />
      <AnimalCharts />
      <AddAnimals searchText={searchText} setSearchText={setSearchText} />
      <Grid item xs={12} className={classes.registerContainer}>
        <CustomMuiTable
          data={animals}
          columns={[...columnsToMuiTable, actionColumn]}
          options={options}
        />
        {/* 
        <CustomMaterialTable
          data={animals}
          columns={[
            ...columnsToCustomMaterialTable,
            {
              field: "outstanding",
              title: "",
              render: (data) => (
                <>
                  <IconButton
                    style={{ color: "#C25560" }}
                    size="small"
                    aria-label="delete"
                    onClick={() => {
                      // data.outstanding = !data.outstanding;
                      // setAnimalsList(data);
                    }}
                  >
                    {data.outstanding === false && <Star fontSize="small" />}
                    {data.outstanding === true && (
                      <StarBorder fontSize="small" />
                    )}
                  </IconButton>
                </>
              ),
            },
          ]}
        />
        */}
      </Grid>
      <Dialog
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
      </Dialog>
    </Grid>
  );
}
export default AnimalControlPage;
