import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

import TextField from '../TextField';
import TextFieldLabel from '../TextFieldLabel';
import LinearProgress from '../LinearProgress';


export default function CreateCafeModal(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { open, closeModal, handleInputChange, handleCreateCafe, 
    isLoading, formErrors } = props;
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add Cafe"}
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
                            autoFocus
                            onChange={handleInputChange}
                            error={!!formErrors.name}
                            helperText={formErrors.name || ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextFieldLabel name="Location" />
                        <TextField 
                            name="location"
                            onChange={handleInputChange}
                            error={!!formErrors.location}
                            helperText={formErrors.location || ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextFieldLabel name="Description" />
                        <TextField 
                            name="description"
                            onChange={handleInputChange}
                            error={!!formErrors.description}
                            helperText={formErrors.description || ''}
                        />
                    </Grid>
                </Grid>
            </div>
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={closeModal}>
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={handleCreateCafe}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}