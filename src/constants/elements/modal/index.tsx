import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { deleteCanvasItem } from '@/redux/reducers/canvas';
import { closeModal } from '@/redux/reducers/elements';
import { useAppDispatch, useAppSelector } from '@/redux/store';

const PopUpModal = () => {
  const isVisible = useAppSelector(state => state.element);
  const { canvasJS, canvasList } = useAppSelector(state => state.canvas);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(closeModal());
    dispatch(deleteCanvasItem(canvasJS.id));
  };
  
  return (
    <Dialog
      open={isVisible.isModalVisible}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <h3>Are you sure?</h3>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {canvasList.length === 1
            ? 'You cannot delete the only slide.'
            : `You want to delete slide ${canvasJS.id}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
        <Button onClick={handleDelete} disabled={canvasList.length === 1}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpModal;
