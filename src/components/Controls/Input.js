import React from 'react'
import { TextField } from '@material-ui/core';
import { useStyles } from './styles';
import clsx from 'clsx';

export default function Input(props) {
  const classes = useStyles();

  const {
    name,
    type,
    label,
    defaultValue,
    value,
    error = null,
    onChange,
    onBlur,
    disabled,
    customClasses,
    customInputBoxClasses,
    customInputClasses,
    endIcon
  } = props;

  return (
    <TextField
      id={name}
      type={type}
      variant="filled"
      defaultValue={defaultValue}
      label={label}
      name={name}
      value={value}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      className={customClasses}
      {...(Boolean(error) && {error: true, helperText: error})}
      InputLabelProps={{
        classes: {
          input: classes.labelInput,
        }
      }}
      InputProps={{
        disableUnderline: true,
        className: customInputBoxClasses,
        endAdornment: endIcon,
        classes: {input: clsx(type === 'number' ? classes.inputNumber : null, customInputClasses)}
      }}
    />
  )
}
