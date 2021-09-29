import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
// import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import IdeasCloudApi from "../../../helpers/ideascloudApi";
import { useDispatch, useSelector } from "react-redux";
import AnimalActions from "../../../redux/actions/animal.actions";

const AnimalImageForm = ({
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const currentFarm = useSelector((state) => state.farm.current);
  const currentAnimal = useSelector((state) => state.animal.current);
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

    await fetch(response.url, requestOptions).then((response) => {
      dispatch(AnimalActions.update({ ...currentAnimal, imageURL: newURL }));
      onCompleteSubmit();
    });
  };

  const validationSchema = yup.object({});

  const initValues = {
    imageUpload: null,
  };

  const fileData = (values) => {
    if (values.imageUpload) {
      return (
        <div style={{ paddingLeft: "0.5rem" }}>
          <p>File Name: {values.imageUpload.name}</p>
        </div>
      );
    } else {
      return (
        <div style={{ paddingLeft: "0.5rem" }}>
          <h4>Choose before Pressing the Upload button</h4>
        </div>
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

export default AnimalImageForm;
