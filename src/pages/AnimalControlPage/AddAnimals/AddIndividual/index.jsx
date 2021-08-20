import React, { useEffect, useState } from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from './styles';
import * as yup from "yup";
import { Formik } from "formik";
import TextFieldFormik from "../../../../components/Inputs/TextFieldFormik";
import ButtonFormik from "../../../../components/Inputs/ButtonFormik";
import DatePickerFieldFormik from "../../../../components/Inputs/DatePickerFieldFormik";
import SelectFieldFormik from "../../../../components/Inputs/SelectFieldFormik";
import CheckboxFormik from "../../../../components/Inputs/CheckboxFormik";

import { sexOptions, categoryOptions, raceOptions } from "./constants"

const propTypes = {};

function AddIndividual({ setOpen, setAnimalsList, agribusinessId }) {
    const classes = useStyles();
    const letters = ['A', 'B', 'C', 'D'];
    const [animalRace, setAnimalRace] = useState({
        'A': { type: '1', percentage: '100%' },
    });

    const [errors, setErrors] = useState([]);
    const [raceType, setRaceType] = useState({
        'A': '',
        'B': '',
        'C': '',
        'D': '',
        raceType: '',
        raceTypeText: '',
    });

    const [errorPercentage, setErrorPercentage] = useState('');

    const validationSchema = yup.object({});
    const initValues = {
        identifier: "",
        name: "",
        birthDate: "",
        herdDate: "",
        registerNumber: "",
        gender: "",
        category: "",
        father: "",
        mother: "",
        racial1: "",
        percentageRacial1: "",
        typeRacial: "",
        color: "",
    };

    const handleCheckPercentage = (list = []) => {
        let total = 0;

        Object.keys(list).forEach(animal => {
            const percentage = list[animal].percentage.replace('%', '');
            total = total + parseFloat(percentage);
        });

        if (total !== 100) {
            setErrorPercentage('El porcentaje total debe ser 100%. Porfavor ajuste sus cantidades');
        } else {
            setErrorPercentage('');
        }
    };

    const handleAddRace = () => {
        const races = { ...animalRace };

        if (letters[Object.keys(races).length]) {
            races[letters[Object.keys(races).length]] = { type: '1', percentage: '0%' };

            setAnimalRace(races);
            handleCheckPercentage(races);
        }
    };

    const handleRemoveRace = (id) => {
        const races = { ...animalRace };
        delete races[id];

        setAnimalRace(races);
        handleCheckPercentage(races);
    };

    const handleSubmit = (values, actions) => { };



    // const handleSubmit = (values) => {
    //     const races = [];
    //     const percentages = [];
    //     Object.keys(animalRace).forEach(race => {
    //         races.push(parseInt(animalRace[race].type, 10));
    //         percentages.push(parseFloat(animalRace[race].percentage.replace('%', '')));
    //     });

    //     const {
    //         identifier, name, birthDate, herdDate, reproductiveStatus,
    //         gender, isReproductive, father, mother
    //     } = values;

    //     const input = {
    //         identifier,
    //         name,
    //         birthDate,
    //         herdDate,
    //         gender,
    //         isReproductive: gender === 'MA' ? Boolean(isReproductive) : '',
    //         father,
    //         mother,
    //         racialType: raceType.raceType,
    //         percentages,
    //         color,
    //         race: races,
    //         agribusiness: agribusinessId
    //     };

    //     if (gender === 'FE') {
    //         input.reproductiveStatus = reproductiveStatus;
    //     }
    // };

    const AnimalForm = ({
        handleChange,
        handleSubmit,
        isSubmitting,
        resetForm,
        values,
        errors,
        touched,
    }) => {
        return (
            <form onSubmit={handleSubmit} className={classes.formStyle}>
                <Grid container spacing={1} className={classes.formStyle}>
                    <Grid item>
                        <Typography variant={"subtitle2"}>
                            Datos Generales
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <TextFieldFormik
                        label="Identificación del animal (Número de Arete)"
                        name="identifier"
                        type="text"
                        onChange={handleChange}
                        xs={12}
                    ></TextFieldFormik>
                    <TextFieldFormik
                        label="Nombre"
                        name="name"
                        type="text"
                        onChange={handleChange}
                        xs={12}
                    ></TextFieldFormik>
                    <DatePickerFieldFormik
                        label="Fecha de nacimiento"
                        name="birthDate"
                        onChange={handleChange}
                        lg={6}
                        sm={6}
                        xs={12}
                    ></DatePickerFieldFormik>
                    <DatePickerFieldFormik
                        label="Entrada de hato"
                        name="herdDate"
                        onChange={handleChange}
                        lg={6}
                        sm={6}
                        xs={12}
                    ></DatePickerFieldFormik>
                    <TextFieldFormik
                        label="Nro de registro"
                        name="registerNumber"
                        disabled
                        type="text"
                        onChange={handleChange}
                        xs={12}
                    ></TextFieldFormik>
                    <SelectFieldFormik
                        onChange={handleChange}
                        options={sexOptions}
                        label="Sexo"
                        name="gender"
                        lg={6}
                        sm={6}
                        xs={12}
                    ></SelectFieldFormik>
                    <Grid
                        lg={6}
                        sm={6}
                        xs={12}
                        container
                        justifyContent="center"
                        alignContent="center"
                        alignItems="center"
                    >
                        <CheckboxFormik
                            label="Categoria"
                            name="category"
                            options={categoryOptions}
                            onChange={handleChange}
                        ></CheckboxFormik>
                    </Grid>
                    <TextFieldFormik
                        label="Padre"
                        type="text"
                        name="father"
                        onChange={handleChange}
                        lg={6}
                        sm={6}
                        xs={12}
                    ></TextFieldFormik>
                    <TextFieldFormik
                        label="Madre"
                        type="text"
                        name="mother"
                        onChange={handleChange}
                        lg={6}
                        sm={6}
                        xs={12}
                    ></TextFieldFormik>
                </Grid>
                <Grid container spacing={1} className={classes.formStyle}>
                    <Grid item>
                        <Typography variant={"subtitle2"}>Raza</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} container className={classes.border}>
                    {Object.keys(animalRace).map((raceItem, index) => (
                        <Grid item xs={12} container key={`race-option-${raceItem}`} spacing={1}
                            className={classes.raceContainer}>
                            <Grid item xs={12}>
                                <Typography variant={'body2'} gutterBottom className={classes.subtitle}>
                                    {`Raza ${raceItem}`}
                                </Typography>
                            </Grid>
                            <Grid item container sm={8} xs={12}>
                                <SelectFieldFormik
                                    name='race'
                                    label='Raza'
                                    options={raceOptions}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item container sm={4} xs={12} alignItems={'center'} justify={'center'}>
                                <Grid item xs={11}>
                                    <TextFieldFormik
                                        name={'percentage'}
                                        label={'Porcentaje'}
                                        value={animalRace[raceItem].percentage}
                                        onBlur={() => {
                                            const temp = animalRace[raceItem].percentage.replace('%', '');
                                            const formatPercentage = parseFloat(temp).toFixed(2);
                                            const list = {
                                                ...animalRace,
                                                [raceItem]: {
                                                    percentage: `${formatPercentage > 100 ? 100 : formatPercentage}%`,
                                                    type: animalRace[raceItem].type
                                                }
                                            };

                                            setAnimalRace(list);
                                            handleCheckPercentage(list);
                                        }}
                                        onChange={handleChange}
                                        customInputClasses={classes.rightText}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    {Boolean(index) && <DeleteIcon color={'secondary'} className={classes.deleteIcon}
                                        onClick={() => handleRemoveRace(raceItem)} />}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                    <Grid item xs={12} className={classes.errorMessage}>
                        <Typography variant={'caption'} gutterBottom>
                            {errorPercentage}
                        </Typography>
                    </Grid>
                    <AddCircle color={'secondary'} className={classes.addBtn} onClick={handleAddRace} />
                </Grid>
                <Grid container spacing={1}>
                    <TextFieldFormik
                        label="Tipo Racial"
                        name="racialType"
                        type="text"
                        onChange={handleChange}
                        lg={6}
                        sm={6}
                        xs={12}
                        disabled
                    ></TextFieldFormik>
                    <TextFieldFormik
                        label="Color"
                        type="text"
                        name="color"
                        onChange={handleChange}
                        lg={6}
                        sm={6}
                        xs={12}
                    ></TextFieldFormik>
                </Grid>
                <Grid item container justifyContent={"flex-end"} xs={12}>
                    {/* <Grid item xs={3} className={classes.paddingButton}>
                                <ButtonFormik xs={3} label="Cancelar" type="cancel" />
                            </Grid> */}
                    <Grid item xs={3}>
                        <ButtonFormik xs={3} label="Guardar" type="submit" onClick={() => {
                            console.log('init', values);
                        }} />
                    </Grid>
                </Grid>
            </form>
        )
    }

    return (
        <Grid className={classes.modal}>
            <Typography variant={'subtitle1'} gutterBottom>
                Registro de animal
            </Typography>
            {/* <Divider /> */}
            <Formik
                initialValues={initValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {(props) => <AnimalForm {...props} />}
            </Formik>
        </Grid>
    );
};

AddIndividual.propTypes = propTypes;

export default AddIndividual;
