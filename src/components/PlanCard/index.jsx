import React from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";
import {
  Button,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Check, Clear } from "@material-ui/icons";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { ROUTES_DICT } from "../../routes/routesDict";

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  plan: PropTypes.object.isRequired,
};

function PlanCard({ plan }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper
      elevation={4}
      className={clsx(classes.planContainer, classes[plan.key])}
    >
      <Grid container alignContent={"space-between"} className={classes.h100}>
        <Grid item>
          <Typography variant={"h2"} className={classes.text}>
            {plan.title}
          </Typography>
          <Typography variant={"h5"} className={classes.text} gutterBottom>
            {plan.subtitle}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={clsx(classes.text, classes.description)}>
            {plan.description}
          </Typography>
          <Typography className={classes.price}>
            {plan.price !== 0 ? `${plan.price} US$` : "GRATIS"}
          </Typography>
          <List dense>
            {plan.list.map((item, index) => (
              <ListItem>
                <ListItemIcon>
                  {item.bol ? (
                    <Check style={{ color: "#0075C8" }} />
                  ) : (
                    <Clear style={{ color: "red" }} />
                  )}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
          <Button
            className={clsx(
              plan.contained && classes.contained,
              classes.button
            )}
            onClick={() => {
              history.push(ROUTES_DICT.account);
            }}
          >
            {plan.button}
          </Button>
          {/* <Typography className={clsx(classes.text, classes.footer)}>
            {plan.footer}
          </Typography> */}
        </Grid>
      </Grid>
    </Paper>
  );
}

PlanCard.propTypes = propTypes;

export default PlanCard;
