import { Grid, Paper, Typography } from "@material-ui/core";
import { differenceInDays } from "date-fns";
import { sum } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { useStyles } from "../styles";

const Reproduction = () => {
  const classes = useStyles();
  const animalList = useSelector((state) => state.animal.list);
  const birthList = useSelector((state) => state.birth.list);
  const listWeightControl = useSelector((state) => state.weight.list);
  const listZealControl = useSelector((state) => state.zeal.list);
  const listPalpationControl = useSelector((state) => state.palpation.list);
  const listDryingControl = useSelector((state) => state.drying.list);

  // const listAnimalDeads = useSelector((state) => state.animal.listDeads);

  const openDays = () => {
    const filterD = animalList
      .filter((e) => e.births && e.births.length > 0)
      .map((e) => {
        const diference = differenceInDays(
          new Date(),
          new Date(e.births[0]?.birthDate)
        );
        return diference;
      });
    return (sum(filterD) / filterD.length).toFixed(0) || 0;
  };

  const maleBirth = () => {
    const mal = animalList.filter((e) => e.gender === "MALE");
    const filterD = animalList.filter(
      (e) => e.gender === "MALE" && e.status.type === "MALE_BREEDING"
    );
    return ((filterD.length * 100) / mal.length).toFixed(0) || 0;
  };

  const birthRate = () => {
    const birth = birthList.filter((e) => e.birthType !== "ABORTION");
    return ((birth.length * 100) / birthList.length).toFixed(0) || 0;
  };

  const birthNotRate = () => {
    const birth = birthList.filter((e) => e.birthType === "ABORTION");
    return ((birth.length * 100) / birthList.length).toFixed(0) || 0;
  };

  const firstBirth = () => {
    const fml = animalList.filter((e) => e.gender === "FEMALE");
    const fmlBirth = animalList.filter((e) => e.birthsLength > 0);

    return ((fmlBirth.length * 100) / fml.length).toFixed(0) || 0;
  };

  const weightBirth = () => {
    const filterWeigt = listWeightControl
      .filter((e) => e.controlType === "BIRTH")
      .map((e) => e.weight);
    console.log(filterWeigt);
    return (sum(filterWeigt) / filterWeigt.length).toFixed(0) || 0;
  };

  const femalePregnant = () => {
    const female = animalList.filter((e) => e.gender === "FEMALE");
    const animalFilter = animalList.filter((e) => e.isPregnant);

    return ((animalFilter.length * 100) / female.length).toFixed(0) || 0;
  };

  const obsZeal = () => {
    const filterZeal = listZealControl.filter(
      (e) => e.observation && e.observation !== "" && e.observation !== " "
    );
    return ((filterZeal.length * 100) / listZealControl.length).toFixed(0) || 0;
  };

  const prenatalMortality = () => {
    const filterPalpation = listPalpationControl.filter(
      (e) => e.state === "EMPTY"
    );
    return (
      ((filterPalpation.length * 100) / listPalpationControl.length).toFixed(
        0
      ) || 0
    );
  };

  const dryingMortality = () => {
    const filter = listDryingControl.filter((e) => e.reason === "ABORTION");
    return ((filter.length * 100) / listDryingControl.length).toFixed(0) || 0;
  };

  const animalPerService = () => {
    const avg = [];
    animalList
      .filter((e) => e.services && e.services.length > 0)
      .forEach((a) => {
        avg.push(a.services.length);
      });
    return (sum(avg) / avg.length).toFixed(0) || 0;
  };

  const animalPerIA = () => {
    const filter = animalList.filter(
      (e) =>
        e.isPregnant &&
        e.services &&
        e.services.length > 0 &&
        e.services[0].serviceType === "AR_IN"
    );

    return filter.length || 0;
  };

  return (
    <>
      <Typography
        color={"primary"}
        align={"center"}
        className={classes.titleGraphics}
        // style={{ fontSize: 30, color: "black", paddingBottom: 20 }}
      >
        Reproducción
      </Typography>
      <Grid item container xs={12} justifyContent="space-around">
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Días Abiertos
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {openDays()}
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Días
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Machos Nacidos
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {maleBirth()} %
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Animales
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Mort. Destete
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {dryingMortality()} %
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Animales
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Mort. Parto
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {birthNotRate()} %
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Animales
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Mort. Pre-Nat
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {prenatalMortality()} %
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Animales
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Natalidad
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {birthRate()} %
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Animales
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Pesos al nacer
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {weightBirth()}
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Kg
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Vacas Preñadas
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {femalePregnant()} %
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Animales
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Primer Parto
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {firstBirth()} %
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Animales
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Serv. x Vaca
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {animalPerService()}
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Servicios
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Vacas Obs. Celo
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {obsZeal()} %
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Animales
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={3} xs={12}>
          <Paper elevation={1} className={classes.userItemContainer}>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.titleGraphics2}
            >
              #Vaca Preñada x Inseminación
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              {animalPerIA()}
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Animales
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Reproduction;
