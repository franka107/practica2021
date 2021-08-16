import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Typography, } from '@material-ui/core';
import { useStyles } from './styles';
import { terms } from './constants';


const propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};


function TermsAndConditions({open, setOpen}) {
  const classes = useStyles();

  const descriptionElementRef = React.useRef(null);

  useEffect(() => {
    if (open) {
      const {current: descriptionElement} = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Términos y Condiciones</DialogTitle>
        <DialogContent dividers={'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            className={classes.contentDialog}
          >
            {terms.map(term => <div key={`term-${term.id}`}>
              <Typography variant={'subtitle1'}>
                {term.title}
              </Typography>
              <Typography variant={'body2'} gutterBottom className={classes.description}>
                {term.description}
              </Typography>
            </div>)}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

TermsAndConditions.propTypes = propTypes;

export default TermsAndConditions;
