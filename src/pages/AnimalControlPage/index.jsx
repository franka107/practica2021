import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  IconButton,
  Dialog,
  Button,
} from "@material-ui/core";
import AnimalDescription from "./AnimalDescription";
import AnimalCharts from "./AnimalCharts";
import AddAnimals from "./AddAnimals";
import CustomMaterialTable from "../../components/CustomMaterialTable";
import { useStyles } from "./styles";
import { columnsToCustomMaterialTable } from "./constants";
import {
  Delete,
  Edit,
  Visibility,
  Star,
  StarBorder,
  Close,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { animalActions } from "../../redux/actions/animal.actions";
import routesDictionary from "../../routers/routesDict";

function AnimalControlPage() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const dispatch = useDispatch();
  const { animals } = useSelector((state) => state.animal);
  useEffect(() => {
    dispatch(animalActions.listAll());
  }, []);

  return (
    <Grid item container xs={12}>
      <Typography variant={"h6"}>Control Ganadero</Typography>
      <AnimalDescription />
      <AnimalCharts />
      <AddAnimals />
      <Grid item xs={12} className={classes.registerContainer}>
        <CustomMaterialTable
          data={animals}
          columns={[
            ...columnsToCustomMaterialTable,
            {
              field: "actions",
              title: "Acciones",
              render: (rowData) => (
                <>
                  <IconButton
                    style={{ color: "#C25560" }}
                    size="small"
                    aria-label="edit"
                    onClick={() => {
                      history.push({
                        pathname:
                          routesDictionary.animalDetail + "/#" + rowData._id,
                        state: {
                          _id: rowData._id,
                        },
                      });
                    }}
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                  {/* </Link> */}
                  <IconButton
                    style={{ color: "#C25560" }}
                    size="small"
                    aria-label="edit"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    style={{ color: "#C25560" }}
                    size="small"
                    aria-label="delete"
                    onClick={() => {
                      setOpen(true);
                      setIdDelete(rowData._id);
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </>
              ),
            },
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
                      // console.log(data);
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
      </Grid>
      <Dialog
        open={Boolean(open)}
        fullWidth
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        maxWidth="xs"
        aria-describedby="alert-dialog-description"
        classes={{ paperFullWidth: classes.modal }}
      >
        <Close className={classes.closeBtn} onClick={() => setOpen(false)} />
        <Grid className={classes.modal}>
          <Typography variant={"subtitle1"} gutterBottom>
            Eliminar Registro
          </Typography>
          <Typography variant={"body1"} gutterBottom>
            ¿Estas seguro de eliminar este registro?
          </Typography>
          <br />
          <Grid container justifyContent="flex-end">
            <Button
              variant="contained"
              className={classes.btnCancel}
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(animalActions.deleteElement({ _id: idDelete }));
                setOpen(false);
              }}
            >
              Confirmar
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
}
export default AnimalControlPage;
