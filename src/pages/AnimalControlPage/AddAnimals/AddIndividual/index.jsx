// import React, { useEffect, useState } from 'react';
// import { Grid, Typography } from '@material-ui/core';
// import { AddCircle } from '@material-ui/icons';
// import DeleteIcon from '@material-ui/icons/Delete';
// import { useMutation, useQuery } from '@apollo/client';
// import { CustomForm } from '../../../../Components/CustomForm';
// import { contactForm } from './constants';
// import Controls from '../../../../Components/Controls/Controls';
// import { REGISTER_ANIMAL } from '../../../../graphql/mutations/Animals';
// import { GET_ANIMALS_RACES } from '../../../../graphql/queries/Animals';
// import { useStyles } from './styles';
// import { isNull } from '../../../../utils/tools';

// const propTypes = {};

// function AddIndividual({setOpen, setAnimalsList, agribusinessId}) {
//   const classes = useStyles();
//   const letters = ['A', 'B', 'C', 'D'];
//   const [animalRace, setAnimalRace] = useState({
//     'A': {type: '1', percentage: '100%'},
//   });

//   const [breeder, setBreeder] = useState(false);
//   const [bornDate, setBornDate] = useState('');
//   const [valuesSubmit, setValuesSubmit] = useState([]);
//   const [color, setColor] = useState('');
//   const [errors, setErrors] = useState([]);
//   const [raceType, setRaceType] = useState({
//     'A': '',
//     'B': '',
//     'C': '',
//     'D': '',
//     raceType: '',
//     raceTypeText: '',
//   });
//   const [sections] = useState([{
//     title: 'Datos generales',
//     form: contactForm(classes, setBreeder, setBornDate, setValuesSubmit)
//   }]);
//   const [errorPercentage, setErrorPercentage] = useState('');
//   const [addAnimal] = useMutation(REGISTER_ANIMAL);
//   const {data: raceTypes = {}} = useQuery(GET_ANIMALS_RACES);

//   useEffect(() => {
//     if (raceTypes.getRace && raceTypes.getRace.length) {
//       const valueTemp = raceTypes.getRace[0].id;
//       setAnimalRace({
//         'A': {type: valueTemp, percentage: '100%'},
//       });
//       handleCheckRaceType('A', valueTemp);
//     }
//     // eslint-disable-next-line
//   }, [raceTypes]);

//   const handleCheckPercentage = (list = []) => {
//     let total = 0;

//     Object.keys(list).forEach(animal => {
//       const percentage = list[animal].percentage.replace('%', '');
//       total = total + parseFloat(percentage);
//     });

//     if (total !== 100) {
//       setErrorPercentage('El porcentaje total debe ser 100%. Porfavor ajuste sus cantidades');
//     } else {
//       setErrorPercentage('');
//     }
//   };

//   const handleAddRace = () => {
//     const races = {...animalRace};

//     if (letters[Object.keys(races).length]) {
//       races[letters[Object.keys(races).length]] = {type: '1', percentage: '0%'};

//       setAnimalRace(races);
//       handleCheckPercentage(races);
//     }
//   };

//   const handleRemoveRace = (id) => {
//     const races = {...animalRace};
//     delete races[id];

//     setAnimalRace(races);
//     handleCheckPercentage(races);
//   };

//   useEffect(() => {
//     if (bornDate) {
//       // herdDate field
//       sections[0].form[3].rules = (value) => {
//         return new Date(value) >= new Date(bornDate);
//       };
//     }
//   }, [bornDate, sections]);

//   if (breeder) {
//     // isReproductive field
//     sections[0].form[6].gridClass = classes.hidden;
//     // state field
//     sections[0].form[7].gridClass = null;
//   } else {
//     sections[0].form[6].gridClass = null;
//     sections[0].form[7].gridClass = classes.hidden;
//   }

//   const handleCheckRaceType = (item, id) => {
//     const calculateRaceType = raceTypes.getRace.filter(race => race.id === id);
//     const raceTypeTemp = calculateRaceType[0].racialType;
//     const race = {...raceType};
//     race[item] = raceTypeTemp;

//     const taurus = Object.keys(race).filter(rc => race[rc] === 'BU');
//     const indicus = Object.keys(race).filter(rc => race[rc] === 'ZE');

//     if (taurus.length > 0 && indicus.length) {
//       race.raceType = 'HB';
//       race.raceTypeText = 'Media Sangre';
//     } else if (taurus.length > 0) {
//       race.raceType = 'BU';
//       race.raceTypeText = 'Taurino';
//     } else {
//       race.raceType = 'ZE';
//       race.raceTypeText = 'Cebuino';
//     }

//     setRaceType(race);
//   };

//   const handleSubmit = (values) => {
//     const races = [];
//     const percentages = [];
//     Object.keys(animalRace).forEach(race => {
//       races.push(parseInt(animalRace[race].type, 10));
//       percentages.push(parseFloat(animalRace[race].percentage.replace('%', '')));
//     });

//     const {
//       identifier, name, birthDate, herdDate, reproductiveStatus,
//       gender, isReproductive, father, mother
//     } = values;

//     const input = {
//       identifier,
//       name,
//       birthDate,
//       herdDate,
//       gender,
//       isReproductive: gender === 'MA' ? Boolean(isReproductive) : '',
//       father,
//       mother,
//       racialType: raceType.raceType,
//       percentages,
//       color,
//       race: races,
//       agribusiness: agribusinessId
//     };

//     if(gender === 'FE') {
//       input.reproductiveStatus = reproductiveStatus;
//     }

//     addAnimal({
//       variables: {
//         input
//       }
//     }).then(response => {
//       const {createAnimal = {}} = response.data;
//       const {errors = []} = createAnimal;

//       if (isNull(errors)) {
//         setOpen(false);
//         setAnimalsList(values);
//       } else {
//         setErrors([{
//           name: 'identifier',
//           message: errors[0].messages[0]
//         }]);
//       }
//     });
//   };

//   return (
//     <Grid className={classes.modal}>
//       <Typography variant={'subtitle1'} gutterBottom>
//         Registro de animal
//       </Typography>
//       <CustomForm
//         sections={sections}
//         setFormSubmit={(value) => {
//           handleSubmit(value);
//         }}
//         valuesSubmit={valuesSubmit}
//         errorSubmit={errors}
//       >
//         <Typography variant={'subtitle2'} gutterBottom>
//           Raza
//         </Typography>
//         <Grid item xs={12} container className={classes.border}>
//           {Object.keys(animalRace).map((raceItem, index) => (
//             <Grid item xs={12} container key={`race-option-${raceItem}`} spacing={1}
//                   className={classes.raceContainer}>
//               <Grid item xs={12}>
//                 <Typography variant={'body2'} gutterBottom className={classes.subtitle}>
//                   {`Raza ${raceItem}`}
//                 </Typography>
//               </Grid>
//               <Grid item container sm={8} xs={12}>
//                 <Controls.Select
//                   name={'race'}
//                   label={'Raza'}
//                   type={'select'}
//                   defaultValue={animalRace[raceItem].type}
//                   value={animalRace[raceItem].type}
//                   options={raceTypes ? raceTypes.getRace : []}
//                   onChange={(e) => {
//                     setAnimalRace({
//                       ...animalRace, [raceItem]: {
//                         type: e.target.value,
//                         percentage: animalRace[raceItem].percentage,
//                       }
//                     });
//                     // Calculate race type
//                     handleCheckRaceType(raceItem, e.target.value);
//                   }}
//                 />
//               </Grid>
//               <Grid item container sm={4} xs={12} alignItems={'center'} justify={'center'}>
//                 <Grid item xs={11}>
//                   <Controls.Input
//                     name={'percentage'}
//                     label={'Porcentaje'}
//                     type={'input'}
//                     value={animalRace[raceItem].percentage}
//                     onBlur={() => {
//                       const temp = animalRace[raceItem].percentage.replace('%', '');
//                       const formatPercentage = parseFloat(temp).toFixed(2);
//                       const list = {
//                         ...animalRace,
//                         [raceItem]: {
//                           percentage: `${formatPercentage > 100 ? 100 : formatPercentage}%`,
//                           type: animalRace[raceItem].type
//                         }
//                       };

//                       setAnimalRace(list);
//                       handleCheckPercentage(list);
//                     }}
//                     onChange={({target: {value}}) => {
//                       const regex = /^\d+(.\d{0,2})?$/;
//                       let newValue = '';

//                       if (regex.test(value)) {
//                         setAnimalRace({
//                           ...animalRace, [raceItem]: {
//                             percentage: value,
//                             type: animalRace[raceItem].type
//                           }
//                         });

//                         newValue = value;
//                       }
//                       const list = {
//                         ...animalRace, [raceItem]: {
//                           percentage: newValue,
//                           type: animalRace[raceItem].type
//                         }
//                       };
//                       setAnimalRace(list);
//                       handleCheckPercentage(list);
//                     }}
//                     customInputClasses={classes.rightText}
//                   />
//                 </Grid>
//                 <Grid item xs={1}>
//                   {Boolean(index) && <DeleteIcon color={'secondary'} className={classes.deleteIcon}
//                                                  onClick={() => handleRemoveRace(raceItem)} />}
//                 </Grid>
//               </Grid>
//             </Grid>
//           ))}
//           <Grid item xs={12} className={classes.errorMessage}>
//             <Typography variant={'caption'} gutterBottom>
//               {errorPercentage}
//             </Typography>
//           </Grid>
//           <AddCircle color={'secondary'} className={classes.addBtn} onClick={handleAddRace} />
//         </Grid>
//         <Grid container spacing={1}>
//           <Grid item sm={6} xs={12}>
//             <Controls.Input
//               name={'raceType'}
//               label={'Tipo Racial'}
//               disabled
//               value={raceType.raceTypeText}
//             />
//           </Grid>
//           <Grid item sm={6} xs={12}>
//             <Controls.Input
//               name={'color'}
//               label={'Color'}
//               onChange={(e) => setColor(e.target.value)}
//             />
//           </Grid>
//         </Grid>
//       </CustomForm>
//     </Grid>
//   );
// };

// AddIndividual.propTypes = propTypes;

// export default AddIndividual;
