import React, { useEffect } from 'react';
import {
  Checkbox as MuiCheckbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel
} from '@material-ui/core';
import { useStyles } from './styles';
import clsx from 'clsx';

export default function Checkbox(props) {
  const classes = useStyles();
  const {name, label, onChange, error = null, options, customClasses, value} = props;

  const [state, setState] = React.useState(() => {
    const stateTemp = {};
    options.forEach((option, index) => {
      return stateTemp[option.id] = false;
    });
    return stateTemp;
  });

  useEffect(() => {
    if (value) {
      const newState = {...state};

      value.forEach(val => {
        newState[val] = true;
      });
      setState(newState);
    }
    // eslint-disable-next-line
  }, [value]);

  const handleChange = (event) => {
    const newState = {...state, [event.target.name]: event.target.checked};
    const validate = Object.keys(newState).filter(option => newState[option]);

    setState(newState);
    onChange(null, name, validate.length ? validate : false);
  };

  return (
    <FormControl name={name} required error={Boolean(error)} component="fieldset"
                 className={clsx(classes.checkBoxFormControl, customClasses)}>
      {label && <FormLabel className={classes.checkBoxLabelForm}>{label}</FormLabel>}
      <FormGroup className={classes.formControlContainer}>
        {options.map(option =>
          <FormControlLabel
            key={`checkbox-${option.id}`}
            control={<MuiCheckbox
              name={option.id}
              error
              color="secondary"
              checked={state[option.id]}
              onChange={handleChange}
              className={classes.checkBox}
            />}
            label={<div className={classes.checkBoxLabel}>{option.name}</div>}
          />
        )}
      </FormGroup>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
