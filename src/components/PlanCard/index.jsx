import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './styles';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';


const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  plan: PropTypes.object.isRequired,
};


function PlanCard({plan}) {
  const classes = useStyles();

  return (
    <Paper elevation={4} className={clsx(classes.planContainer, classes[plan.key])}>
      <Grid container alignContent={'space-between'} className={classes.h100}>
        <Grid item>
          <Typography variant={'h2'} className={classes.text}>
            {plan.title}
          </Typography>
          <Typography variant={'h5'} className={classes.text} gutterBottom>
            {plan.subtitle}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={clsx(classes.text, classes.description)}>
            {plan.description}
          </Typography>
          <Typography className={classes.price}>
            {`${plan.price} US$`}
          </Typography>
          <Button className={clsx(plan.contained && classes.contained, classes.button)}>
            {plan.button}
          </Button>
          <Typography className={clsx(classes.text, classes.footer)}>
            {plan.footer}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

PlanCard.propTypes = propTypes;

export default PlanCard;
