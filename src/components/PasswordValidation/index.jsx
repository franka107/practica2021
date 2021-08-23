import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { CheckOutlined } from '@material-ui/icons';
import clsx from 'clsx';


const propTypes = {
  footer: PropTypes.bool,
  customClasses: PropTypes.object,
};

function PasswordValidation({value}) {
  const classes = useStyles();

  const [passwordRules, setPasswordRules] = useState(
    {
      '1': {
        valid: false,
        text: 'Al menos 8 caracteres'
      },
      '2': {
        valid: false,
        text: 'Contiene al menos una letra minúscula y mayúscula',
      },
      '3': {
        valid: false,
        text: 'Contiene al menos un número',
      },
      '4': {
        valid: false,
        text: 'Contiene al menos un caracter especial',
      },
    },
  );

  useEffect(() => {
    setPasswordRules({
      '1': {
        valid: value.length >= 8,
        text: 'Al menos 8 caracteres'
      },
      '2': {
        valid: /^(?=.*[a-z])(?=.*[A-Z]).*$/gm.test(value),
        text: 'Contiene al menos una letra minúscula y mayúscula',
      },
      '3': {
        valid: value && /.*[0-9].*/gm.test(value),
        text: 'Contiene al menos un número',
      },
      '4': {
        valid: /^(?=.*[`~!@#$%^&*()_°¬|+\-=?;:'",.<>{}[\]\\/]).*$/gm.test(value),
        text: 'Contiene al menos un caracter especial',
      }
    });
  }, [value]);

  return (
    <Grid item container className={classes.passwordContainer}>
      {Object.keys(passwordRules).map(rule =>
        <Grid key={`rule-${rule}`} item className={clsx(passwordRules[rule].valid && classes.active, classes.password)}
              xs={12}>
          <CheckOutlined />
          <Typography variant={'caption'}>{passwordRules[rule].text}</Typography>
        </Grid>)}
    </Grid>
  );
};

PasswordValidation.propTypes = propTypes;

export default PasswordValidation;
