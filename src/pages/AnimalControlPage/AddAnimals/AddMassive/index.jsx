// import React, { useState } from 'react';
// import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
// import { useStyles } from './styles';
// import { useMutation } from '@apollo/client';
// import { REGISTER_ANIMAL_MASSIVE } from '../../../../graphql/mutations/Animals';

// const propTypes = {};

// function AddMassive({handleAddMassive, setOpen, agribusinessId}) {
//   const classes = useStyles();
//   const [addMassive] = useMutation(REGISTER_ANIMAL_MASSIVE);
//   const [errors, setErrors] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   function handleOnChange({target: {validity, files}}) {

//     if (validity.valid) {
//       setLoading(true);
//       addMassive({
//         variables: {
//           excelFile: files[0],
//           agribusiness: agribusinessId
//         },
//       }).then(({data}) => {
//         const {massiveCreate = {}} = data;
//         const {errors = [], message = 'Error en', successMessage} = massiveCreate;
//         if (!errors.length) {
//           setSuccess(successMessage);
//         } else {
//           const temp = {};
//           errors.forEach(error => {
//             temp[error.field] = error.messages.join(', ');
//           });
//           setErrors({
//             message,
//             list: temp
//           });
//           setSuccess(successMessage);
//         }
//         handleAddMassive();
//         setLoading(false);
//       }).catch(error => console.log('error', error));
//     }
//   }

//   return (
//     <Grid className={classes.modal}>
//       <Typography variant={'subtitle1'}>
//         Registro masivo
//       </Typography>
//       <Typography variant={'subtitle2'}>
//         Para registro masivo de animales, descargar el siguiente documento.
//       </Typography>
//       <div className={classes.alignBtn}>
//         <div className={classes.root}>
//           <input
//             accept="xlsx/*"
//             className={classes.input}
//             id="contained-button-file"
//             type="file"
//             onChange={handleOnChange}
//           />
//           <label htmlFor="contained-button-file">
//             <Button
//               variant="contained"
//               color="primary"
//               component="span"
//               className={classes.btn}
//               endIcon={loading && <CircularProgress size={20} />}
//             >
//               Registro masivo.xlsx
//             </Button>
//           </label>
//           <input accept="xlsx/*" className={classes.input} id="icon-button-file" type="file" />
//         </div>

//         <Grid item xs={12} container className={classes.errorsContainer}>
//           {success}
//         </Grid>
//         {errors && <Grid item container className={classes.errorsContainer}>
//           {errors.message}
//           <Grid item container className={classes.errorsContainerScroll}>
//             {Object.keys(errors.list).map(error => <Grid item xs={12}>
//                 <Typography variant={'caption'}>
//                   {`${error}: ${errors.list[error]}`}
//                 </Typography>
//               </Grid>
//             )}
//           </Grid>
//         </Grid>}
//       </div>
//     </Grid>
//   );
// };

// AddMassive.propTypes = propTypes;

// export default AddMassive;
