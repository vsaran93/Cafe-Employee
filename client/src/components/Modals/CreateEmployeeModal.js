import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import NativeSelect from '@mui/material/NativeSelect';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import TextField from '../TextField';
import TextFieldLabel from '../TextFieldLabel';
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
  const { open, closeModal, handleInputChange, isLoading, handleCreateEmployee, formErrors  } = props;

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
                            <TextFieldLabel name="Name" />
                            <TextField
                                name="name"
                                onChange={handleInputChange}
                                error={formErrors.name || false}
                                helperText={formErrors.name || ''}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldLabel name="Email" />
                            <TextField 
                                name="emailAddress"
                                onChange={handleInputChange}
                                error={formErrors.emailAddress || false}
                                helperText={formErrors.emailAddress || ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldLabel name="Phone" />
                            <TextField
                                name="phoneNumber"
                                onChange={handleInputChange}
                                error={formErrors.phoneNumber || false}
                                helperText={formErrors.phoneNumber || ''}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldLabel name="Gender" />
                            <NativeSelect
                                name="gender"
                                className={classes.genderDropDown}
                                onChange={handleInputChange}
                                error={formErrors.gender || false}
                            >
                                <option>Select Gender</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </NativeSelect>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldLabel name="Assigned Cafe" />
                            <NativeSelect
                                name="cafeId"
                                className={classes.genderDropDown}
                                onChange={handleInputChange}
                                error={formErrors.cafeId || false}
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