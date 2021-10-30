import { Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import ChipList from "../ChipList";
import PropTypes from "prop-types";

const DefaultPage = ({ children, ...props }) => {
  const [title, setTitle] = useState(props.title || "Title");
  const [chipList, setChipList] = useState(props.chipList || []);

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

DefaultPage.propTypes = {
  title: PropTypes.string,
  chipList: PropTypes.array,
};

export default DefaultPage;
