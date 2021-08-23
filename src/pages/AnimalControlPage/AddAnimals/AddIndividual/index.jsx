import React, { useEffect, useState } from 'react';
import { Grid, Typography, Divider, CircularProgress } from '@material-ui/core';
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
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTES_DICT } from "../../../../routes/routesDict"
import { animalActions } from "../../../../redux/actions/animal.actions";
import { sexOptions, categoryOptions, raceOptions, stateOptions } from "./constants"
import ACTION_TYPES from '../../../../redux/types';

const propTypes = {};

function AddIndividual({ setOpen, setAnimalsList, agribusinessId, typeAccion = "create", animalId = "" }) {

    const classes = useStyles();
    const history = useHistory();

    const letters = ['A', 'B', 'C', 'D'];
    const [animalRace, setAnimalRace] = useState({
        'A': { type: '1', percentage: '100%' },
    });
    const dispatch = useDispatch();
    const { current: currentAnimal } = useSelector((state) => state.animal);
    const { current: currentAgribusiness } = useSelector(
        (state) => state.agribusiness
    );

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
    const [initValues, setInitValues] = useState({
        identifier: "",
        name: "",
        birthDate: "",
        herdDate: "",
        registerNumber: "",
        gender: "MA",
        isReproductive: "",
        category: "",
        father: "",
        mother: "",
        racial1: "",
        percentageRacial1: "",
        racial2: "",
        percentageRacial2: "",
        racial3: "",
        percentageRacial3: "",
        racial4: "",
        percentageRacial4: "",
        typeRacial: "",
        color: "",
        repructiveStatus: ""
    });


    useEffect(() => {
        if (typeAccion === "update") {
            if (!currentAnimal) {
                dispatch(animalActions.listById({ _id: animalId }))
                console.log("asd");
            }
        }
    }, []);

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
                    {values.gender === "MA" ?
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
                                name="isReproductive"
                                options={categoryOptions}
                                onChange={handleChange}
                            ></CheckboxFormik>
                        </Grid>
                        :
                        <SelectFieldFormik
                            onChange={handleChange}
                            options={stateOptions}
                            label="Estado"
                            name="repructiveStatus"
                            lg={6}
                            sm={6}
                            xs={12}
                        ></SelectFieldFormik>
                    }
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
                                    name={`racial${index + 1}`}
                                    label='Raza'
                                    options={raceOptions}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item container sm={4} xs={12} alignItems={'center'} justify={'center'}>
                                <Grid item xs={11}>
                                    <TextFieldFormik
                                        name={`percentageRacial${index + 1}`}
                                        label='Porcentaje'
                                        onChange={handleChange}
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
                            if (typeAccion === "create") {
                                if (values.isReproductive) values.category = "REPROODUCTOR"
                                values.agribusinessId = currentAgribusiness._id
                                dispatch(animalActions.createElement(values));
                                setOpen(false)
                                console.log('init', values);
                            }
                            if (typeAccion === "update") {
                                if (values.isReproductive) values.category = "REPROODUCTOR"
                                else values.category = ""
                                values.agribusinessId = currentAgribusiness._id
                                dispatch(animalActions.updateElement(values))
                                    .then((data) => {
                                        console.log(data);
                                        dispatch({ type: ACTION_TYPES.ANIMAL.UPDATE_CURRENT, payload: null })
                                    })
                                setOpen(false)
                            }
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

            {typeAccion === "update" && currentAnimal ?
                <Formik
                    initialValues={currentAnimal}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {(props) => <AnimalForm {...props} />}
                </Formik>
                :
                <Grid container justifyContent="center">
                    <CircularProgress color="secondary" />
                </Grid>
            }
            {typeAccion === "create" &&
                <Formik
                    initialValues={initValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {(props) => <AnimalForm {...props} />}
                </Formik>
            }
        </Grid>
    );
};

AddIndividual.propTypes = propTypes;

export default AddIndividual;
