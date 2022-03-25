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
import LinearProgress from '../LinearProgress';


export default function CreateCafeModal(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { open, closeModal, handleInputChange, handleCreateCafe, isLoading } = props;
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Create Cafe"}
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
                            autoFocus
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label className='label'>Location</label>
                        <TextField 
                            name="location"
                            fullWidth 
                            id="standard-basic" 
                            variant="standard"
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <label className='label'>description</label>
                        <TextField 
                            name="description"
                            fullWidth 
                            id="standard-basic" 
                            variant="standard"
                            onChange={handleInputChange}
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