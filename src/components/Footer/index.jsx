import React from 'react';
import {useStyles} from './styles';
import {Grid, Typography} from '@material-ui/core';
import {menu} from './constants';
import {Facebook, Instagram, Twitter} from '@material-ui/icons';
import Logo from '../Logo';


const propTypes = {};


function Footer() {
    const classes = useStyles();

    return (
        <Grid container item alignContent={'center'} justify={'space-between'}>
            <Grid item md={2} xs={12} className={classes.logoContainer}>
                <Logo footer/>
            </Grid>
            <Grid container item md={5} sm={12} alignContent={'center'} justify={'space-around'}>
                {menu.map(item =>
                    <Grid
                        key={`footer-${item.key}`}
                        item md={2} sm={3} xs={11}
                        container
                        alignContent={'space-between'}
                        className={classes.footerItem}
                    >
                        <Typography color={'primary'} gutterBottom className={classes.footerText}>
                            {item.title}
                        </Typography>
                        <Typography color={'primary'} className={classes.description}>
                            {item.description}
                        </Typography>
                    </Grid>
                )}
            </Grid>
            <Grid container item lg={4} md={4} sm={12} alignContent={'flex-start'} justify={'center'} className={classes.rightContainer}>
                <Grid container item
                      lg={6} md={12} sm={12}
                      alignContent={'flex-start'} justify={'center'}>
                    <div className={classes.iconContainer}>
                        <Facebook color={'primary'} className={classes.icon}/>
                        <Twitter color={'primary'} className={classes.icon}/>
                        <Instagram color={'primary'} className={classes.icon}/>
                    </div>
                </Grid>
                <Grid container item lg={6} md={12} sm={12} justify={'flex-end'} className={classes.copyright}>
                    <Typography variant={'caption'} color={'primary'}>
                        conTigoⒸ2020 All right reserved.
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

Footer.propTypes = propTypes;

export default Footer;
