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
import { deleteSlide } from '@/redux/reducers/canvas';
import { closeModal, updateDeleteAlertShow } from '@/redux/reducers/elements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { CheckBox } from '@mui/icons-material';
import { setUserPreferences } from '@/redux/thunk/user';
import { isSlideDeleteAlert } from '@/constants/userPreferences';

const PopUpModal = () => {
  const isVisible = useAppSelector(state => state.element);
  const { canvasJS, canvasList } = useAppSelector(state => state.canvas);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(closeModal());
    dispatch(deleteSlide(canvasJS.id));
  };

  const handleSlideDelCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserPreferences({key: isSlideDeleteAlert, value : e.target.checked}))
  }

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
          {`You want to permanently delete this slide ${canvasJS.id} ?`}
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
            <FormControlLabel control={<Checkbox size="small" onChange={handleSlideDelCheckBox} />} label="Don't show me again"/>

          </Stack>
          <Stack direction='row'>
            <Button color="primary" onClick={() => dispatch(closeModal())}>Cancel</Button>
            <Button color='error' onClick={handleDelete} >
              Delete
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default PopUpModal;
