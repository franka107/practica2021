import React, { useImperativeHandle, useState } from "react";
import { useStyles } from "./styles";
import { Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import Controls from "../Controls/Controls";
import { units, unitWeightOptions } from "./constants";
import clsx from "clsx";

const propTypes = {
  handleNext: PropTypes.func,
  formRef: PropTypes.object,
  coin: PropTypes.string,
};

function ConfigureAnimals({
  barnName,
  coin,
  handleNext,
  formRef,
  customClasses,
  saveValues,
  saveAnimals,
}) {
  const classes = useStyles();
  const [animal, setAnimal] = useState(parseInt(saveAnimals.animal, 10) || 7);
  const [novilla, setNovilla] = useState(
    parseInt(saveAnimals.novilla, 10) || 15
  );
  const [price, setPrice] = useState(
    saveAnimals.price || {
      1: parseFloat("1").toFixed(2),
      2: parseFloat("1").toFixed(2),
    }
  );
  const [cost, setCost] = useState(
    saveAnimals.cost || {
      1: parseFloat("1").toFixed(2),
      2: parseFloat("1").toFixed(2),
    }
  );
  const [currentUnit, setUnit] = useState({
    1: units["1"][0].id,
    2: units["2"][0].id,
  });

  const handleChange = () => {
    saveValues({
      animal,
      novilla,
      price,
      cost,
      currentUnit,
    });
  };

  const handleOnClick = () => {
    const values = {
      animal,
      novilla,
      currentUnit,
      price,
      cost,
    };
    handleNext(values);
    return values;
  };

  useImperativeHandle(formRef, () => ({
    handleSubmit() {
      return handleOnClick();
    },
  }));

  return (
    <div>
      {barnName && (
        <div className={classes.barnName}>
          <Typography color={"primary"} variant={"h6"}>
            {barnName}
          </Typography>
        </div>
      )}
      <Grid container className={clsx(classes.modal, customClasses)}>
        <Grid item>
          <Typography variant={"subtitle1"} gutterBottom>
            Configure sus animales
          </Typography>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={12} container>
            <Grid item container>
              <Typography
                variant={"body2"}
                gutterBottom
                className={classes.subtitle}
              >
                Categorizar
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={12}
              className={classes.containerCategory}
              spacing={2}
            >
              <Grid
                container
                item
                sm={6}
                xs={12}
                alignItems={"flex-end"}
                className={classes.animalItem}
              >
                <Grid item sm={6} xs={12}>
                  <Typography
                    variant={"body2"}
                    gutterBottom
                    className={classes.animalTitleBold}
                  >
                    Definir cria:
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  sm={6}
                  xs={12}
                  justify={"flex-end"}
                  alignItems={"flex-end"}
                >
                  <Typography
                    variant={"body2"}
                    gutterBottom
                    className={classes.animalTitle}
                  >
                    Hasta
                  </Typography>
                  <div className={classes.numberInputText}>
                    <Controls.Input
                      name={"animal"}
                      label={null}
                      type={"number"}
                      defaultValue={animal}
                      value={animal}
                      customInputClasses={classes.inputNumberText}
                      onBlur={(e) => {
                        setAnimal(e.target.value < 1 ? 1 : e.target.value);
                      }}
                      onChange={(e) => {
                        setAnimal(e.target.value < 1 ? 1 : e.target.value);
                        handleChange();
                      }}
                    />
                  </div>
                  <Typography
                    variant={"body2"}
                    gutterBottom
                    className={classes.animalTitle}
                  >
                    meses
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                item
                sm={6}
                xs={12}
                alignItems={"flex-end"}
                className={classes.animalItem}
              >
                <Grid item sm={6} xs={12}>
                  <Typography
                    variant={"body2"}
                    gutterBottom
                    className={classes.animalTitleBold}
                  >
                    Definir novilla:
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  sm={6}
                  xs={12}
                  justify={"flex-end"}
                  alignItems={"flex-end"}
                >
                  <Typography
                    variant={"body2"}
                    gutterBottom
                    className={classes.animalTitle}
                  >
                    Desde
                  </Typography>
                  <div className={classes.numberInputText}>
                    <Controls.Input
                      name={"animal"}
                      label={null}
                      type={"number"}
                      defaultValue={novilla}
                      value={novilla}
                      customInputClasses={classes.inputNumberText}
                      onBlur={(e) => {
                        setNovilla(e.target.value < 1 ? 1 : e.target.value);
                      }}
                      onChange={(e) => {
                        setNovilla(e.target.value < 1 ? 1 : e.target.value);
                        handleChange();
                      }}
                    />
                  </div>
                  <Typography
                    variant={"body2"}
                    gutterBottom
                    className={classes.animalTitle}
                  >
                    meses
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container className={classes.costContainer}>
            <Typography
              variant={"body2"}
              gutterBottom
              className={classes.subtitle}
            >
              Costos y precios
            </Typography>
            <Grid item container className={classes.container}>
              {unitWeightOptions.map((unit) => (
                <Grid
                  key={`unit-${unit.id}`}
                  container
                  item
                  xs={12}
                  alignItems={"flex-end"}
                  justify={"space-between"}
                  className={classes.animalItem}
                >
                  <div className={classes.numberInput}>
                    <Controls.Select
                      name={"unitType"}
                      defaultValue={currentUnit[unit.id]}
                      value={currentUnit[unit.id]}
                      options={units[unit.id]}
                      onChange={(e) => {
                        setUnit({ ...currentUnit, [unit.id]: e.target.value });
                        handleChange();
                      }}
                    />
                  </div>
                  <Typography
                    variant={"body2"}
                    gutterBottom
                    className={classes.animalTitle}
                  >
                    {`de ${unit.object}:`}
                  </Typography>
                  <div className={classes.input}>
                    <Controls.Input
                      name={"priceEstimed"}
                      label={"Precio estimado"}
                      type={"input"}
                      defaultValue={""}
                      value={price[unit.id]}
                      onBlur={() => {
                        setPrice({
                          ...price,
                          [unit.id]: parseFloat(price[unit.id]).toFixed(2),
                        });
                      }}
                      onChange={({ target: { value } }) => {
                        const regex = /^\d+(.\d{0,2})?$/;

                        if (regex.test(value)) {
                          setPrice({ ...price, [unit.id]: value });
                          handleChange();
                        }
                      }}
                      customInputClasses={classes.rightText}
                    />
                  </div>
                  <div className={classes.input}>
                    <Controls.Input
                      name={"costEstimed"}
                      label={"Costo estimado"}
                      type={"input"}
                      defaultValue={""}
                      value={cost[unit.id]}
                      onBlur={() => {
                        setCost({
                          ...cost,
                          [unit.id]: parseFloat(cost[unit.id]).toFixed(2),
                        });
                      }}
                      onChange={({ target: { value } }) => {
                        const regex = /^\d+(.\d{0,2})?$/;

                        if (regex.test(value)) {
                          setCost({ ...cost, [unit.id]: value });
                          handleChange();
                        }
                      }}
                      customInputClasses={classes.rightText}
                    />
                  </div>
                  <Typography
                    variant={"body2"}
                    gutterBottom
                    className={classes.animalTitle}
                  >
                    {coin}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

ConfigureAnimals.propTypes = propTypes;

ConfigureAnimals.defaultProps = {
  handleNext: () => {},
  coin: "USD",
  formRef: {},
};

export default ConfigureAnimals;
