import { Grid, Paper } from "@material-ui/core";
import { useStyles } from "../../styles";

const CustomPaper = ({ ...props }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} {...props}>
      <Paper elevation={1} className={classes.dataContainer__container2}>
        {props.children}
      </Paper>
    </Grid>
  );
};

export default CustomPaper;
