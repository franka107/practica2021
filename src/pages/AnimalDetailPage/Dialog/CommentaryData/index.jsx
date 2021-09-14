import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { CustomForm } from "../../../../Components/CustomForm";
import { commentaryForm } from "./constants";
import { useStyles } from "./styles";

/**
 * @component
 * @description Componente, renderiza un dialog
 * @author Emerson Puma Quispe <emerson.puma@ideascloud.io>
 */

function CommentaryData({ setOpen, setAnimalsList, agribusinessId }) {
  const classes = useStyles();
  const [sections] = useState([
    {
      title: "",
      form: commentaryForm(),
    },
  ]);

  return (
    <Grid className={classes.modal}>
      <Typography variant={"subtitle1"}>Comentario</Typography>
      <CustomForm sections={sections} handlePrev={true}></CustomForm>
    </Grid>
  );
}

export default CommentaryData;
