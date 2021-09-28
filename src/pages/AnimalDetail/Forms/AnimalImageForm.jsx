import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
// import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import IdeasCloudApi from "../../../helpers/ideascloudApi";
import { useSelector } from "react-redux";

const AnimalImageForm = ({
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const currentFarm = useSelector((state) => state.farm.current);

  const handleSubmit = async (values, actions) => {
    console.log(values);
    const response = await IdeasCloudApi.fetch("uploadImage", {
      farmId: currentFarm._id,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", values.imageUpload.type);

    // var file = await toBase64(values.imageUpload);

    // const file = new Buffer(values.imageUpload, "binary").toString("base64");

    const fileReader = new FileReader();
    const file = fileReader.readAsArrayBuffer(values.imageUpload);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: file,
      redirect: "follow",
    };

    fetch(response.url, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const validationSchema = yup.object({});

  const initValues = {
    imageUpload: null,
  };

  // const toBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });

  // const convertDataURIToBinary = (dataURI) => {
  //   var BASE64_MARKER = ";base64,";
  //   var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  //   var base64 = dataURI.substring(base64Index);
  //   var raw = window.atob(base64);
  //   var rawLength = raw.length;
  //   var array = new Uint8Array(new ArrayBuffer(rawLength));

  //   for (let i = 0; i < rawLength; i++) {
  //     array[i] = raw.charCodeAt(i);
  //   }
  //   return array;
  // };

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
