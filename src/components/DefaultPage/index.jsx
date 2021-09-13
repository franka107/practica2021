import { Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import ChipList from "../ChipList";

const DefaultPage = ({ children }) => {
  const [title, setTitle] = useState("Title");
  const [chipList, setChipList] = useState([]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <ChipList routes={chipList}></ChipList>
      </Grid>
      {children({ setTitle, setChipList })}
    </>
  );
};

export default DefaultPage;
