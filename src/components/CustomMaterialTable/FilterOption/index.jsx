import {
  Typography,
  Popover,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";
import { useStyles } from "../styles";

function FilterOption({ field, type, title }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const renderSwitch = (type) => {
    switch (type) {
      case "text":
        return (
          <>
            <Typography variant="overline">Busqueda:</Typography>
            <TextField variant="filled" label={title} color="secondary" />
          </>
        );
      case "select":
        return (
          <>
            <InputLabel id="demo-simple-select-readonly-label">
              <Typography variant="overline">Busqueda:</Typography>
            </InputLabel>

            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem value={10}>Tensads </MenuItem>
              <MenuItem value={20}>Twenty asd</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </>
        );
      case "date":
        return (
          <>
            <div>
              <Typography variant="overline">De:</Typography>
              <KeyboardDatePicker
                inputVariant="filled"
                color="secondary"
                variant="inline"
                disableToolbar
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="date-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                className={classes.datePicker}
              />
              <Typography variant="overline">Hasta:</Typography>
              <KeyboardDatePicker
                inputVariant="filled"
                color="secondary"
                variant="inline"
                disableToolbar
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="date-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </div>
          </>
        );
      default:
        return <Typography>Invalid type</Typography>;
    }
  };

  return (
    <>
      <div className={classes.filterOption} onClick={handleClick}>
        <Typography variant="body1">{title}</Typography>
        <span className={classes.filterIcon + ` material-icons`}>
          expand_more
        </span>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={classes.popoverContainer}>{renderSwitch(type)}</div>
      </Popover>
    </>
  );
}

export default FilterOption;
