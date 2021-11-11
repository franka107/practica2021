import React from "react";
import { Grid, Typography, Button, IconButton } from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import ButtonFormik from "../../../components/Inputs/ButtonFormik";
import IdeasCloudApi from "../../../helpers/ideascloudApi";
import { useDispatch, useSelector } from "react-redux";
import AnimalActions from "../../../redux/actions/animal.actions";
import CustomPaper from "../../../components/CustomPaper";
import { Close } from "@material-ui/icons";
import _ from "lodash";

const defaultInitValues = {
  imageUrl: null,
};

/**
 * @component
 * @description Componente, formulario para crear o editar animales
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

const AnimalImageForm = ({
  initValues = defaultInitValues,
  onClickCancelButton,
  onCompleteSubmit = () => {},
}) => {
  const currentFarm = useSelector((state) => state.farm.current);
  const currentAnimal = useSelector((state) => state.animal.current);
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    let finalArray = [];
    const arrayImages = [];

    if (values.imageUrl && values.imageUrl.length !== 0) {
      for (let index = 0; index <= values.imageUrl.length - 1; index++) {
        const response = await IdeasCloudApi.fetch("uploadImage", {
          farmId: currentFarm._id,
        });
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", values.imageUrl[`${index}`].type);
        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: values.imageUrl[`${index}`],
          redirect: "follow",
        };

        const iO = response.url.indexOf("?X");
        const newURL = response.url.substring(0, iO);

        await fetch(response.url, requestOptions).then((response) => {
          arrayImages.push(newURL);
        });
      }
    }

    if (values.images && values.images.length !== 0) {
      finalArray = _.concat(values.images, arrayImages);
    } else {
      finalArray = arrayImages;
    }

    dispatch(
      AnimalActions.update({
        ...currentAnimal,
        imageURL: finalArray[0],
        images: finalArray,
      })
    );
    onCompleteSubmit();
  };

  const validationSchema = yup.object({});

  const fileData = (values) => {
    if (values.imageUrl) {
      return (
        <Grid container justifyContent="center" item xs={8}>
          <h4>{values.imageUrl.length} archivos seleccionados.</h4>
        </Grid>
      );
    } else {
      return (
        <Grid container justifyContent="center" item xs={8}>
          <h4> 0 archivos seleccionados.</h4>
        </Grid>
      );
    }
  };

  const deleteImage = (values = [], index, setField = () => {}) => {
    values.splice(index, 1);
    setField("images", values);
    // console.log(values[index]);
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
          {props.values.images && (
            <Grid
              item
              container
              xs={12}
              spacing={1}
              style={{ paddingBottom: "1rem" }}
            >
              {props.values.images &&
                props.values.images.length !== 0 &&
                props.values.images.map((image, i) => (
                  <CustomPaper xs={4} key={i}>
                    <Grid container justifyContent="flex-end">
                      <Grid item xs={1}>
                        <IconButton
                          size="small"
                          onClick={() => {
                            deleteImage(
                              props.values.images,
                              i,
                              props.setFieldValue
                            );
                          }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <img
                      src={image}
                      alt={`img${i}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "150px",
                        display: "block",
                        left: "0",
                        right: "0",
                        top: "0",
                        bottom: "0",
                        margin: "auto",
                      }}
                      border="0"
                    />
                  </CustomPaper>
                ))}
            </Grid>
          )}
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
                name="imageUrl"
                multiple
                onChange={(event) => {
                  props.setFieldValue("imageUrl", event.currentTarget.files);
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
