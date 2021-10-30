import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
// import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import IdeasCloudApi from "../../../helpers/ideascloudApi";
import { useDispatch, useSelector } from "react-redux";
import AgribusinessActions from "../../../redux/actions/agribusiness.actions";
import { farmActions } from "../../../redux/actions/farm.actions";

const defaultInitValues = {
  imageUpload: null,
};

const HaciendaImageForm = ({
  initValues = defaultInitValues,
  from = "agribusiness",
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const currentFarm = useSelector((state) => state.farm.current);
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const response = await IdeasCloudApi.fetch("uploadImage", {
      farmId: currentFarm._id,
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", values.imageUpload.type);
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: values.imageUpload,
      redirect: "follow",
    };

    const iO = response.url.indexOf("?X");
    const newURL = response.url.substring(0, iO);

    delete values.imageUpload;

    await fetch(response.url, requestOptions).then((response) => {
      if (from === "agribusiness") {
        dispatch(AgribusinessActions.update({ ...values, imageUrl: newURL }));
      }
      if (from === "farm") {
        dispatch(farmActions.update({ ...values, imageUrl: newURL }));
      }
      onCompleteSubmit();
    });
  };

  const validationSchema = yup.object({});

  const fileData = (values) => {
    if (values.imageUpload) {
      return (
        <Grid item container xs={8} justifyContent="center">
          <p>{values.imageUpload.name}</p>
        </Grid>
      );
    } else {
      return (
        <Grid item container xs={8} justifyContent="center">
          <h4>Ningun archivo seleccionado</h4>
        </Grid>
      );
    }
  };

  return (
    <Formik
      initialValues={initValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Typography variant={"subtitle1"} gutterBottom>
            Subir Imagen
          </Typography>
          <Grid container spacing={1}>
            <Button
              variant="contained"
              component="label"
              style={{ boxShadow: "none" }}
            >
              Cargar Imagen
              <input
                type="file"
                hidden
                name="imageUpload"
                onChange={(event) => {
                  props.setFieldValue(
                    "imageUpload",
                    event.currentTarget.files[0]
                  );
                }}
              />
            </Button>
            {fileData(props.values)}
          </Grid>

          <Grid item container justifyContent={"flex-end"} xs={12}>
            <Grid item xs={3} style={{ marginRight: "1rem" }}>
              <ButtonFormik
                xs={3}
                label="Cancelar"
                type="cancel"
                onClick={onClickCancelButton}
              />
            </Grid>
            <Grid item xs={3}>
              <ButtonFormik xs={3} label="Guardar" type="submit" />
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default HaciendaImageForm;
