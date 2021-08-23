import React, { useState } from "react";
import { Close, SearchRounded } from "@material-ui/icons";
import { Dialog, Grid, Typography, TextField } from "@material-ui/core";
import { useStyles } from "./styles";
import { dateForm, searchForm } from "./constants";

function SearchAnimals({
  setSearch,
  setAnimalsList,
  setFilter,
  handleChangePage,
}) {
  const classes = useStyles();
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [gender, setGender] = useState("");
  const [valuesSubmit, setValuesSubmit] = useState({});

  const handleSearch = (value) => {
    setAdvancedSearch(false);
    const temp = {};
    const { startDate, endDate, reproductiveStatus, isReproductive } = value;

    if (startDate && endDate) {
      temp.startDate = startDate;
      temp.endDate = endDate;
    }

    if (gender) {
      temp.gender = gender;
    }

    if (reproductiveStatus) {
      temp.reproductiveStauts = reproductiveStatus;
    }

    if (isReproductive && isReproductive !== "2") {
      temp.isReproductive = isReproductive;
    } else if (isReproductive === "2") {
      temp.isReproductive = false;
    }

    setFilter(temp);
    handleChangePage(null, 0);
    setAnimalsList();
    setValuesSubmit({});
  };

  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        container
        alignItems="flex-end"
        justifyContent={"space-between"}
      >
        <Grid item sm={9} xs={11} className={classes.searchInputContainer}>
          <TextField
            variant="filled"
            name={"search"}
            label={"Buscar por identificador o nombre"}
            defaultValue={""}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              disableUnderline: true,
              className: classes.searchInput,
              endAdornment: <SearchRounded className={classes.searchIcon} />,
            }}
          />
        </Grid>
        <Grid
          item
          md={3}
          sm={3}
          xs={12}
          container
          alignItems="flex-end"
          justifyContent={"flex-end"}
          className={classes.extraFields}
        >
          <div
            className={classes.advancedSearch}
            onClick={() => setAdvancedSearch(true)}
          >
            Búsqueda avanzada
          </div>
          <Typography
            className={classes.clearFields}
            align={"right"}
            onClick={() => {
              setAdvancedSearch(false);
              setSearch("");
              setFilter({});
              setAnimalsList();
              setValuesSubmit({});
            }}
          >
            Limpiar
          </Typography>
        </Grid>
      </Grid>
      {/* <Dialog
        open={Boolean(advancedSearch)}
        fullWidth
        onClose={() => setAdvancedSearch(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{paperFullWidth: classes.modal}}
      >
        <Close className={classes.closeBtn} onClick={() => setAdvancedSearch(false)} />
        <Typography variant={'subtitle1'} gutterBottom>
          Búsqueda avanzada
        </Typography>
        <CustomForm
          setFormSubmit={handleSearch}
          sections={[
            {
              title: 'Sexo',
              form: searchForm(gender, setGender),
            },
            {
              title: 'Fecha de hato',
              form: dateForm(setValuesSubmit),
            }
          ]}
          submitButton={{
            size: {xs: 12},
            label: 'Aplicar',
            classes: classes.loginBtn
          }}
          valuesSubmit={valuesSubmit}
        >
        </CustomForm>
      </Dialog> */}
    </React.Fragment>
  );
}

export default SearchAnimals;
