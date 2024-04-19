import React from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Stack,
} from '@mui/material';
import { deleteCanvasItem } from '@/redux/reducers/canvas';
import { closeModal, updateDeleteAlertShow } from '@/redux/reducers/elements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { CheckBox } from '@mui/icons-material';

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
        {"Are you sure?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {canvasList.length === 1
            ? 'You cannot delete the only slide.'
            : `You want to delete slide ${canvasJS.id}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack
          direction='row'
          spacing={5}
          mt={-1}
          ml={1}
        >
          <Stack>
            <FormControlLabel control={<Checkbox size="small" onChange={(e) => dispatch(updateDeleteAlertShow(!e.target.checked))} />} label="Don't show me again"/>
          </Stack>
          <Stack direction='row'>
            <Button color="primary" onClick={() => dispatch(closeModal())}>Cancel</Button>
            <Button color="secondary" onClick={handleDelete} disabled={canvasList.length === 1}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpModal;
