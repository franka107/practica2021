import React from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';

import { useStyles } from './styles';
import { FormControl, FormHelperText } from '@material-ui/core';

export default function PhoneNumber(props) {
  const classes = useStyles();
  const {name, value, onChange, error, customClasses} = props;

  const handleOnChange = (value) => {
    if (value !== '+') {
      onChange(null, name, value);
    } else {
      onChange(null, name, '');
    }
  };

  return (
    <FormControl name={name} value={value} className={classes.margin} error={Boolean(error)}>
      <MuiPhoneNumber
        onlyCountries={['us', 'pe', 'cl', 'ar', 'co', 'br']}
        regions={['north-america', 'south-america', 'central-america', 'carribean', 'european-union', 'middle-east']}
        defaultCountry={'pe'}
        disableAreaCodes
        autoFormat={false}
        value={value === '' ? '+' : value}
        onChange={handleOnChange}
        inputClass={customClasses || classes.phoneInputDefault}
        InputProps={{
          className: classes.phoneInputDefaultText
        }}
      />
      {Boolean(error) && <FormHelperText className={classes.errorPhone}>{error}</FormHelperText>}
    </FormControl>
  );
};
