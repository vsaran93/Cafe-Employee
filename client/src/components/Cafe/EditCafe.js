import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import Header from '../Header';

const useStyles = makeStyles({
    actionBtn: {
        marginLeft: '10px !important',
        marginRight: '10px !important'
    },
    btnContainer: {
        margin: '25px auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
const EditCafe = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <Header />
            <Container>
                <Box
                    component="form"
                    className='edit-form'
                    sx={{ flexFlow: 1 }}
                    noValidate
                    autoComplete="off"
                >
                     <Typography component="h1" variant="h4" align="center">
                        Edit Cafe 
                    </Typography>
                     <Grid 
                        container 
                        spacing={{ xs: 2, md: 3 }} 
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        style={{ marginTop: 10 }}
                    >
                        <Grid item xs={12} sm={6}>
                            <label className='label'>Name</label>
                            <TextField fullWidth id="standard-basic" variant="standard" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label className='label'>Location</label>
                            <TextField fullWidth id="standard-basic" variant="standard" />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <label className='label'>description</label>
                            <TextField fullWidth id="standard-basic" variant="standard" />
                        </Grid>
                     </Grid>
                     <div className={classes.btnContainer}>
                        <Button className={classes.actionBtn} variant="contained" color="error">Cancel</Button>
                        <Button className={classes.actionBtn} variant="contained">Save</Button>
                     </div>
                </Box>
            </Container>
        </Fragment>
    );
};

export default EditCafe;
