import { Grid, Paper, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { useStyles } from "../../styles";

const DataContainer = ({ number, title, onClick = () => {}, ...props }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} {...props}>
      <Paper
        elevation={1}
        className={classes.dataContainer__container}
        onClick={onClick}
      >
        <Typography
          color={"primary"}
          align={"center"}
          className={classes.dataContainer__number}
        >
          {number}
        </Typography>
        <Typography
          variant={"body2"}
          align={"center"}
          className={classes.dataContainer__text}
        >
          {title}
        </Typography>
      </Paper>
    </Grid>
  );
};

DataContainer.propTypes = {
  number: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default DataContainer;
