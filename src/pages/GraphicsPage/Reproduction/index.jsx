import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "../styles";

const Reproduction = () => {
  const classes = useStyles();

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
              0
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
              0 %
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
              0 %
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
              0 %
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
              0 %
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
              0 %
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
              0
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
              0 %
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
              0 %
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
              #Serv. x Vaca
            </Typography>
            <Typography
              color={"primary"}
              align={"center"}
              className={classes.userItemNumber}
            >
              0
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
              0 %
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
              0 %
            </Typography>
            <Typography
              variant={"body2"}
              align={"center"}
              className={classes.userItemText}
            >
              Eficiencia
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Reproduction;
