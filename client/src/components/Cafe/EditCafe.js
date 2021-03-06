import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '../TextField';
import TextFieldLabel from '../TextFieldLabel';
import MainLayout from '../../Layouts/MainLayout';
import { setLoading } from '../../actions/spinnerAction';
import { getCafeDetails, updateCafe } from '../../actions/cafeAction';
import LinearProgress from '../LinearProgress';
import { validateCafe } from '../../utils/helper';


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
const EditCafe = (props) => {
    const [ cafe, setCafe ] = useState({});
    const [ formErrors, setFormErrors ] = useState({});
    const classes = useStyles();
    const dispatch = useDispatch();
    const { cafeDetails } = useSelector(state => state.cafe);
    const { isLoading } = useSelector(state => state.spinner);
    const params = useParams();
    const { navigate } = props;

    const goBack = () => {  
        navigate('/');
    };


    useEffect(() => {
        dispatch(getCafeDetails(params.id))
    }, [dispatch, params.id]);

    useEffect(() => {
        setCafe(cafeDetails);
    }, [cafeDetails]);

    const handleChange = (e) => {
        setCafe({
            ...cafe,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        const { isValid, errors } = validateCafe(cafe);
        if (!isValid) {
            setFormErrors(errors);
            return;
        }
        dispatch(setLoading());
        dispatch(updateCafe({
            name: cafe.name,
            description: cafe.description,
            logo: cafe.logo,
            location: cafe.location
        }, params.id, () => {
            goBack();
        }))
    };

    return (
        <MainLayout>
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
                <LinearProgress loading={isLoading} />
                <Grid 
                    container 
                    spacing={{ xs: 2, md: 3 }} 
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    style={{ marginTop: 10 }}
                >
                    <Grid item xs={12} sm={6}>
                        <TextFieldLabel name="Name"/>
                        <TextField
                            name="name"
                            value={cafe.name || ''}
                            onChange={handleChange}
                            autoFocus
                            error={!!formErrors.name}
                            helperText={formErrors.name || ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextFieldLabel name="Location"/>
                        <TextField 
                            name="location"
                            value={cafe.location || ''}
                            onChange={handleChange}
                            error={!!formErrors.location}
                            helperText={formErrors.location || ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextFieldLabel name="Description"/>
                        <TextField 
                            name="description"
                            value={cafe.description || ''}
                            onChange={handleChange}
                            inputProps={{
                                maxlength: 256
                            }}
                            error={!!formErrors.description}
                            helperText={formErrors.description || ''}
                        />
                    </Grid>
                </Grid>
                <div className={classes.btnContainer}>
                    <Button
                        onClick={goBack}
                        className={classes.actionBtn} 
                        variant="contained"
                        color="error"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className={classes.actionBtn} 
                        variant="contained"
                        disabled={isLoading}
                    >
                        Save
                    </Button>
                </div>
            </Box>
        </MainLayout>
    );
};

export default EditCafe;
