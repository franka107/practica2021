import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Chip,
  Dialog,
  IconButton,
  Button,
  Paper,
  Divider,
} from "@material-ui/core";
import { Delete, Edit, Close, Star, StarBorder } from "@material-ui/icons";
import { columns, columns2 } from "./constants";
import { useStyles } from "./styles";
import clsx from "clsx";
import FormEmbryo from "./Forms/FormEmbryo";
import FormMove from "./Forms/FormMove";
import CustomMuiTable from "../../../components/CustomMuiTable";
import { useDispatch, useSelector } from "react-redux";
import GeneticStockActions from "../../../redux/actions/geneticStock.actions";
import { animalActions } from "../../../redux/actions/animal.actions";
import ACTION_TYPES from "../../../redux/types";
import geneticStockActions from "../../../redux/actions/geneticStock.actions";

function Embryo() {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState("");
  const [ind, setInd] = useState("1");
  const [geneticStockId, setGeneticStockId] = useState("");
  const [searchText] = useState();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { list: geneticStockList } = useSelector((state) => state.geneticStock);
  const { list: animalList } = useSelector((state) => state.animal);
  const { current: currentAgribusiness } = useSelector(
    (state) => state.agribusiness
  );

  useEffect(() => {
    if (!animalList) {
      dispatch(animalActions.listAll(currentAgribusiness._id));
    }
    console.log("Current", currentAgribusiness._id);
    dispatch(
      GeneticStockActions.listGeneticStockByAgribusiness({
        geneticType: "EMBRYO",
      })
    );
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
          <>
            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="edit"
              onClick={() => {
                setOpen(true);
                setDialog("update");
                setGeneticStockId(geneticStockList[dataIndex]._id);
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
                setDialog("delete");
                setGeneticStockId(geneticStockList[dataIndex]._id);
              }}
            >
              <Delete fontSize="small" />
            </IconButton>

            <IconButton
              style={{ color: "#C25560" }}
              size="small"
              aria-label="delete"
              onClick={() => {
                // data.outstanding = !data.outstanding;
                // setAnimalsList(data);
                dispatch(
                  geneticStockActions.updateGeneticStock({
                    ...geneticStockList[dataIndex],
                    isFeatured: !Boolean(
                      geneticStockList[dataIndex].isFeatured
                    ),
                  })
                ).then((data) => {
                  dispatch({
                    type: ACTION_TYPES.GENETICSTOCK.UPDATE_CURRENT,
                    payload: null,
                  });
                  dispatch(
                    geneticStockActions.listGeneticStockByAgribusiness({
                      geneticType: "EMBRYO",
                    })
                  );
                });
              }}
            >
              {Boolean(geneticStockList[dataIndex].isFeatured) === true && (
                <Star fontSize="small" />
              )}

              {Boolean(geneticStockList[dataIndex].isFeatured) === false && (
                <StarBorder fontSize="small" />
              )}
            </IconButton>
          </>
        );
      },
    },
  };
  const deleteItem = () => {
    dispatch(
      GeneticStockActions.deleteGenticStock({
        _id: geneticStockId,
      })
    ).then(
      (data) => {
        dispatch(
          GeneticStockActions.listGeneticStockByAgribusiness({
            geneticType: "EMBRYO",
          })
        );
        setOpen(false);
      },
      (err) => {}
    );
  };

  return (
    <Grid container xs={12}>
      <Grid item container xs={12}>
        <Typography variant={"h6"}>Embriones</Typography>
        <Grid container spacing={2} className={classes.optionContainer}>
          <Grid item>
            <Chip
              label={"Inventario"}
              onClick={() => {
                setInd("1");
              }}
              className={clsx(classes.option, ind === "1" && classes.active)}
            />
          </Grid>
          <Grid item>
            <Chip
              label={"Nuevo embrión"}
              onClick={() => {
                setOpen(true);
                setDialog("Embryo");
              }}
              className={clsx(classes.option)}
            />
          </Grid>
          <Grid item>
            <Chip
              label={"Movimiento"}
              onClick={() => {
                setInd("2");
              }}
              className={clsx(classes.option, ind === "2" && classes.active)}
            />
          </Grid>
          <Grid item>
            <Chip
              label={"Nuevo movimiento"}
              onClick={() => {
                setOpen(true);
                setDialog("Move");
              }}
              className={clsx(classes.option)}
            />
          </Grid>
        </Grid>
      </Grid>
      {ind === "1" && (
        <>
          <Grid item xs={12} className={classes.charts}>
            <Paper className={classes.paper}>
              <Typography variant={"overline"}>
                Registro de nacimiento
              </Typography>
              <Divider className={classes.divider} />
            </Paper>
          </Grid>
          <Grid item xs={12} className={classes.registerContainer}>
            <CustomMuiTable
              data={geneticStockList}
              columns={[...columns, actionColumn]}
              options={options}
            />
          </Grid>
        </>
      )}
      {ind === "2" && (
        <Grid item xs={12} className={classes.registerContainer}>
          <CustomMuiTable
            data={[]}
            columns={[...columns2, actionColumn]}
            options={options}
          />
        </Grid>
      )}
      <Dialog
        open={Boolean(open)}
        fullWidth
        onClose={() => {
          setOpen(false);
          dispatch(GeneticStockActions.clearCurrentGenticStock());
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={dialog === "delete" ? "xs" : "md"}
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close
          className={classes.closeBtn}
          onClick={() => {
            setOpen(false);
            dispatch(GeneticStockActions.clearCurrentGenticStock());
          }}
        />
        {dialog === "Embryo" && <FormEmbryo setOpen={setOpen} />}
        {dialog === "Move" && <FormMove setOpen={setOpen} />}
        {dialog === "update" && (
          <FormEmbryo
            setOpen={setOpen}
            type="update"
            geneticStockId={geneticStockId}
          />
        )}
        {dialog === "delete" && (
          <Grid className={classes.modal}>
            <Typography variant={"subtitle1"} gutterBottom>
              Eliminar Registro
            </Typography>
            <Typography variant={"subtitle2"} gutterBottom>
              ¿Desea eliminar el registro?
            </Typography>
            <Grid item container justifyContent={"flex-end"} xs={12}>
              <Grid item xs={4} className={classes.paddingButton}>
                <Button
                  variant={"contained"}
                  label="Cancelar"
                  onClick={() => setOpen(false)}
                  className={classes.buttonCancel}
                  style={{ boxShadow: "none" }}
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant={"contained"}
                  label="Confirmar"
                  color="primary"
                  onClick={deleteItem}
                  className={classes.buttonSubmit}
                  style={{ boxShadow: "none" }}
                >
                  Confirmar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Dialog>
    </Grid>
  );
}

export default Embryo;
