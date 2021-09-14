import React from "react";
import { SearchRounded } from "@material-ui/icons";
import { Grid, TextField } from "@material-ui/core";
import { useStyles } from "../../styles";

function SearchContainer({ setSearchText, searchText }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        container
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          className={classes.searchContainer_container}
        >
          <TextField
            variant="filled"
            name={"search"}
            label={"Buscar por identificador o nombre"}
            defaultValue={""}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              disableUnderline: true,
              className: classes.searchContainer__input,
              endAdornment: <SearchRounded className={classes.searchIcon} />,
            }}
          />
        </Grid>
        {/* 
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
          <div className={classes.advancedSearch}>Búsqueda avanzada</div>
          <Typography
            className={classes.clearFields}
            align={"right"}
            onClick={() => {}}
          >
            Limpiar
          </Typography>
        </Grid>
        */}
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

export default SearchContainer;
