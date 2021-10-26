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
        let spDay = "";
        let iDay = 0;
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
            iDay = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].pregnantDate)
            );
            spDay =
              iDay === 0
                ? " dias preñez"
                : iDay === 1
                ? " dia de preñez"
                : " dias de preñez";
            return `Vaquillona Preñada, ${iDay} ${spDay}`;
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
            iDay = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].lastBirth.birthDate)
            );
            spDay =
              iDay === 0
                ? " dias abiertos"
                : iDay === 1
                ? " dia abierto"
                : " dias abiertos";
            return `Vaca Parida, ${iDay} ${spDay}`;
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= 24 &&
            listAnimal[dataIndex].lastBirth &&
            !listAnimal[dataIndex].isDried &&
            listAnimal[dataIndex].reproductiveStatus === "PREGNANT":
            iDay = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].pregnantDate)
            );
            spDay =
              iDay === 0
                ? " dias de preñez"
                : iDay === 1
                ? " dia de preñez"
                : " dias de preñez";
            return `Vaca Preñada, ${iDay} ${spDay}`;
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= 24 &&
            listAnimal[dataIndex].lastBirth &&
            listAnimal[dataIndex].isDried &&
            listAnimal[dataIndex].reproductiveStatus === "EMPTY":
            iDay = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].lastBirth.birthDate)
            );
            spDay =
              iDay === 0
                ? " dias abiertos"
                : iDay === 1
                ? " dia de abierto"
                : " dias de abiertos";
            return `Vaca Seca, ${iDay} ${spDay}`;
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= 24 &&
            listAnimal[dataIndex].lastBirth &&
            listAnimal[dataIndex].isDried &&
            listAnimal[dataIndex].reproductiveStatus === "PREGNANT":
            iDay = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].pregnantDate)
            );
            spDay =
              iDay === 0
                ? " dias de preñez"
                : iDay === 1
                ? " dia de preñez"
                : " dias de preñez";
            return `Vaca Seca,  ${iDay} ${spDay}`;
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= 24 &&
            listAnimal[dataIndex].lastBirthDate &&
            !listAnimal[dataIndex].isDried &&
            listAnimal[dataIndex].reproductiveStatus === "EMPTY":
            iDay = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].lastBirthDate)
            );
            spDay =
              iDay === 0
                ? " dias abiertos"
                : iDay === 1
                ? " dia de abierto"
                : " dias de abiertos";
            return `Vaca Parida, ${iDay} ${spDay}`;
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= 24 &&
            listAnimal[dataIndex].lastBirthDate &&
            !listAnimal[dataIndex].isDried &&
            listAnimal[dataIndex].reproductiveStatus === "PREGNANT":
            iDay = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].pregnantDate)
            );
            spDay =
              iDay === 0
                ? " dias de preñez"
                : iDay === 1
                ? " dia de preñez"
                : " dias de preñez";
            return `Vaca Preñada, ${iDay} ${spDay}`;
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= 24 &&
            listAnimal[dataIndex].lastBirthDate &&
            listAnimal[dataIndex].isDried &&
            listAnimal[dataIndex].reproductiveStatus === "EMPTY":
            iDay = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].lastBirthDate)
            );
            spDay =
              iDay === 0
                ? " dias abiertos"
                : iDay === 1
                ? " dia abierto"
                : " dias abiertos";
            return `Vaca Seca, ${iDay} ${spDay}`;
          case listAnimal[dataIndex].gender === "FEMALE" &&
            differenceInMonths(
              new Date(),
              new Date(listAnimal[dataIndex]?.birthDate)
            ) >= 24 &&
            listAnimal[dataIndex].lastBirthDate &&
            listAnimal[dataIndex].isDried &&
            listAnimal[dataIndex].reproductiveStatus === "PREGNANT":
            iDay = differenceInDays(
              new Date(),
              new Date(listAnimal[dataIndex].pregnantDate)
            );
            spDay =
              iDay === 0
                ? " dias de preñez"
                : iDay === 1
                ? " dia de preñez"
                : " dias de preñez";
            return `Vaca Seca,  ${iDay} ${spDay}`;
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
          <Grid item>Animales Desactivados</Grid>
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
