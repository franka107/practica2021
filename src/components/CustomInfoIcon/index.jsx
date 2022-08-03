import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { Info } from "@material-ui/icons";
import { useStyles } from "../../styles";

const CustomInfoIcon = ({ title, placement = "right", xs = 1 }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={xs} className={classes.grid__center}>
        <Tooltip title={title} placement={placement} arrow>
          <IconButton size="small">
            <Info style={{ color: "#0075C9" }}></Info>
          </IconButton>
        </Tooltip>
      </Grid>
    </>
  );
};

export default CustomInfoIcon;
