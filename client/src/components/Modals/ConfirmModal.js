import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LinearProgress from '../LinearProgress';

export default function ConfirmModal(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { open, closeModal, handleDelete, isLoading } = props;
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete?"}
        </DialogTitle>
        <DialogContent>
          <LinearProgress loading={isLoading} />
          <DialogContentText>
            Are you sure you wish to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={closeModal}>
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={handleDelete}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}