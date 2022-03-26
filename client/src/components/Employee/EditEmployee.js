import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NativeSelect from '@mui/material/NativeSelect';

import MainLayout from '../../Layouts/MainLayout';
import { setLoading } from '../../actions/spinnerAction';
import { getEmployeeById, updateEmployee } from '../../actions/employeeAction';
import { availableCafes } from '../../actions/cafeAction';
import LinearProgress from '../LinearProgress';
import { displayOptions } from '../../utils/helper';

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
    },
    genderDropDown: {
        display: 'flex !important'
    }
});

const employeeData = {
    name: '',
    emailAddress: '',
    phoneNumber: '',
    gender: '',
    cafeId: ''
};

const EditEmployee = (props) => {
    const [ employee, setEmployee ] = useState(employeeData);
    const classes = useStyles();
    const dispatch = useDispatch();
    const { employeeDetails } = useSelector(state => state.employee);
    const { availableCafesList } = useSelector(state => state.cafe);
    const { isLoading } = useSelector(state => state.spinner);
    const params = useParams();
    const { navigate } = props;

    const goBack = () => {  
        navigate('/employee');
    };

    useEffect(() => {
        dispatch(getEmployeeById(params.id));
        dispatch(availableCafes());
    }, [dispatch, params.id]);

    
    useEffect(() => {
        setEmployee(employeeDetails);
    }, [employeeDetails]);

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(setLoading());
        dispatch(updateEmployee(params.id, {
            name: employee.name,
            emailAddress: employee.emailAddress,
            phoneNumber: employee.phoneNumber,
            gender: employee.gender,
            cafeId: employee.cafeId
        }, () => {
            goBack()
        }));
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
                    Edit Employee 
                </Typography>
                <LinearProgress loading={isLoading} />
                <Grid 
                    container 
                    spacing={{ xs: 2, md: 3 }} 
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    style={{ marginTop: 10 }}
                >
                    <Grid item xs={12} sm={6}>
                        <label className='label'>Name</label>
                        <TextField
                            name="name"
                            fullWidth 
                            id="standard-basic" 
                            variant="standard"
                            value={employee.name || ''}
                            onChange={handleChange}
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label className='label'>Email</label>
                        <TextField 
                            name="emailAddress"
                            fullWidth 
                            id="standard-basic" 
                            variant="standard"
                            value={employee.emailAddress || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label className='label'>Phone</label>
                        <TextField 
                            name="phoneNumber"
                            fullWidth 
                            id="standard-basic" 
                            variant="standard" 
                            value={employee.phoneNumber || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label className='label'>Gender</label>
                        <NativeSelect
                            name="gender"
                            className={classes.genderDropDown}
                            value={employee.gender || ''}
                            onChange={handleChange}
                        >
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </NativeSelect>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label className='label'>Assigned Cafe</label>
                        <NativeSelect
                            name="cafeId"
                            value={employee.cafeId || ''}
                            className={classes.genderDropDown}
                            onChange={handleChange}
                        >
                            <option>Select Cafe</option>
                            {displayOptions(availableCafesList)}
                        </NativeSelect>
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

export default EditEmployee;
