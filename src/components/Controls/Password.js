import React, { useState } from 'react';
import { FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useStyles } from './styles';

export default function Password(props) {
  const classes = useStyles();

  const {name, label, value, error = null, onChange} = props;
  const [showPassword, handleShowPassword] = useState(false);

  return (
    <FormControl name={name} className={classes.margin} variant="filled" error={Boolean(error)}>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <FilledInput
        id={name}
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => handleShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        disableUnderline
      />
      {Boolean(error) && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
};