import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import NativeSelect from '@mui/material/NativeSelect';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { availableCafes } from '../../actions/cafeAction';
import { displayOptions } from '../../utils/helper';
import LinearProgress from '../LinearProgress';

const useStyles = makeStyles({
    genderDropDown: {
        display: 'flex !important'
    }
});

export default function CreateEmployeeModal(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { availableCafesList } = useSelector(state => state.cafe);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { open, closeModal, handleInputChange, isLoading, handleCreateEmployee  } = props;

  React.useEffect(() => {
    dispatch(availableCafes())
  }, [dispatch]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add Employee"}
        </DialogTitle>
        <DialogContent>
            <div>
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
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label className='label'>Phone</label>
                            <TextField
                                type="number"
                                name="phoneNumber"
                                fullWidth 
                                id="standard-basic" 
                                variant="standard" 
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label className='label'>Gender</label>
                            <NativeSelect
                                name="gender"
                                className={classes.genderDropDown}
                                onChange={handleInputChange}
                            >
                                <option>Select Gender</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </NativeSelect>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label className='label'>Assigned Cafe</label>
                            <NativeSelect
                                name="cafeId"
                                className={classes.genderDropDown}
                                onChange={handleInputChange}
                            >
                                <option>Select Cafe</option>
                                {displayOptions(availableCafesList)}
                            </NativeSelect>
                        </Grid>
                     </Grid>
            </div>
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={closeModal}>
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={handleCreateEmployee}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}