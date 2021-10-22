import React, { useState, useEffect } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  generatePath,
} from "react-router-dom";
import { Grid, Switch, Typography } from "@material-ui/core";
import AnimalDescription from "../AnimalDescription";
import AnimalCharts from "../AnimalCharts";
import AddAnimals from "../AddAnimals";
import { useStyles } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import CustomMuiTable from "../../../components/CustomMuiTable";
import TableButtons from "../../../components/TableButtons";
import { animalRouteOptions } from "../constants";
import { columns } from "./constants";
import { ROUTES_DICT } from "../../../routes/routesDict";
import AnimalActions from "../../../redux/actions/animal.actions";
import { differenceInDays, differenceInMonths } from "date-fns";

/**
 * @component
 * @description Componente, tabla que contiene la lista de animales
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const AnimalPageList = ({ children, setTitle, setChipList }) => {
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const listAnimal = useSelector((state) => state.animal.list);
  const listAnimalDeads = useSelector((state) => state.animal.listDeads);
  const currentAgribusiness = useSelector(
    (state) => state.agribusiness.current
  );
  const [searchText, setSearchText] = useState();
  const [listType, setListType] = useState(true);

  useEffect(() => {
    setTitle("Control Ganadero");
    setChipList(animalRouteOptions(location));
    if (!listAnimal || listAnimal.length === 0) {
      dispatch(AnimalActions.list());
    }
    if (!listAnimalDeads || listAnimalDeads.length === 0) {
      dispatch(AnimalActions.listDeads());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listType]);

  const options = {
    selectableRows: "none",
    searchText,
    search: false,
  };

  const claseColumn = {
    label: "Clase",
    name: "gender",
    options: {
      filter: false,
      customBodyRenderLite: (dataIndex) => {
        // isBreeding => Cria
        // isHeifer => Novilla
        switch (true) {
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) < currentAgribusiness.isBreeding:
            return "Cria Hembra";
          case listAnimal[dataIndex].gender === "MALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) < currentAgribusiness.isBreeding:
            return "Cria Macho";
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= currentAgribusiness.isBreeding &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) < currentAgribusiness.isHeifer:
            return "Hembra Levante";
          case listAnimal[dataIndex].gender === "MALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= currentAgribusiness.isBreeding &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) < currentAgribusiness.isHeifer:
            return "Macho Levante";
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= currentAgribusiness.isHeifer &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) < 24 &&
            listAnimal[dataIndex].reproductiveStatus === "EMPTY":
            return "Vaquillona Vacia";
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= currentAgribusiness.isHeifer &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) < 24 &&
            listAnimal[dataIndex].reproductiveStatus === "PREGNANT":
            const pregnatDayHeifer = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].pregnantDate)
            );
            const nDayHeifer =
              pregnatDayHeifer === 0
                ? " dias preñez"
                : pregnatDayHeifer === 1
                ? " dia de preñez"
                : " dias de preñez";
            return `Vaquillona Preñada, ${pregnatDayHeifer} ${nDayHeifer}`;
          case listAnimal[dataIndex].gender === "MALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= currentAgribusiness.isHeifer &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) < 24 &&
            listAnimal[dataIndex].category !== "REPRODUCTOR":
            return "Novillo para Engorda";
          case listAnimal[dataIndex].gender === "MALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= currentAgribusiness.isHeifer &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) < 24 &&
            listAnimal[dataIndex].category === "REPRODUCTOR":
            return "Torete";
          case listAnimal[dataIndex].gender === "MALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= 24 &&
            listAnimal[dataIndex].category === "REPRODUCTOR":
            return "Toro Reproductor";
          // mayor que 24 meses
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= 24 &&
            listAnimal[dataIndex].lastBirth &&
            !listAnimal[dataIndex].isDried &&
            listAnimal[dataIndex].reproductiveStatus === "EMPTY":
            const openDayEMPTY24 = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].lastBirth.birthDate)
            );
            const nDayEMPTY24 =
              openDayEMPTY24 === 0
                ? " dias abiertos"
                : openDayEMPTY24 === 1
                ? " dia de abierto"
                : " dias de abiertos";
            return `Vaca Parida, ${openDayEMPTY24} ${nDayEMPTY24}`;
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= 24 &&
            listAnimal[dataIndex].lastBirth &&
            !listAnimal[dataIndex].isDried &&
            listAnimal[dataIndex].reproductiveStatus === "PREGNANT":
            const DayPREGNANT24 = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].pregnantDate)
            );
            const nDayPREGNANT24 =
              DayPREGNANT24 === 0
                ? " dias de preñez"
                : DayPREGNANT24 === 1
                ? " dia de preñez"
                : " dias de preñez";
            return `Vaca Preñada, ${DayPREGNANT24} ${nDayPREGNANT24}`;
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= 24 &&
            listAnimal[dataIndex].lastBirth &&
            listAnimal[dataIndex].isDried &&
            listAnimal[dataIndex].reproductiveStatus === "EMPTY":
            const openDayE24 = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].lastBirth.birthDate)
            );
            const nDayE24 =
              openDayE24 === 0
                ? " dias abiertos"
                : openDayE24 === 1
                ? " dia de abierto"
                : " dias de abiertos";
            return `Vaca Seca, ${openDayE24} ${nDayE24}`;
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= 24 &&
            listAnimal[dataIndex].isDried &&
            listAnimal[dataIndex].reproductiveStatus === "PREGNANT":
            const DayP24 = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].pregnantDate)
            );
            const nDayP24 =
              DayP24 === 0
                ? " dias de preñez"
                : DayP24 === 1
                ? " dia de preñez"
                : " dias de preñez";
            return `Vaca Seca,  ${DayP24} ${nDayP24}`;
          default:
            return "Indeterminado";
        }
      },
    },
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
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Animales Muertos</Grid>
          <Grid item>
            <Switch
              label
              checked={listType}
              onChange={(e) => {
                setListType(!listType);
              }}
            />
          </Grid>
          <Grid item>Animales Vivos</Grid>
        </Grid>
      </Typography>

      <Grid item xs={12} className={classes.registerContainer}>
        <CustomMuiTable
          data={listType ? listAnimal : listAnimalDeads}
          columns={[...columns, claseColumn, actionColumn]}
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
