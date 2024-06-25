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
import { deleteSlide, setActiveSlideId, setCanvas, updateCanvasList } from '@/redux/reducers/canvas';
import { closeModal, updateDeleteAlertShow } from '@/redux/reducers/elements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { CheckBox } from '@mui/icons-material';
import { setUserPreferences } from '@/redux/thunk/user';
import { isSlideDeleteAlert } from '@/constants/userPreferences';
import { CanvasItem } from '@/interface/storeTypes';
import { addNewSlideApi, deleteSlideApi } from '@/redux/thunk/slidesThunk';
import { useParams } from 'react-router-dom';

const PopUpModal = () => {
  const isVisible = useAppSelector(state => state.element);
  const { canvasJS, canvasList } = useAppSelector(state => state.canvas);
  const dispatch = useAppDispatch();

  const params = useParams<{ id: string }>(); 
  const pptId = Number(params.id?.split('-')[0]);

  const handleDelete = () => {
    dispatch(closeModal());

    const newSlide: CanvasItem = {
      id: 1,
      canvas: {
        "version": "5.3.0",
        "objects": [],
        "background": "#fff"
      },
      notes: '',
      variants: [],
      originalSlideData: {},
      listImages: [],
      slideId: 1,
      presentationId: 1,
      lastVariant: '',
      selectedOriginalCanvas: false,
      slideShape: '',
    }
    if (canvasList && canvasList.length == 1) {
      let lastCanvas = canvasJS;
      dispatch(
        deleteSlideApi({
          pId: canvasJS.presentationId,
          slideID: canvasJS.slideId,
        })
      ).then((res: any) => {
        if (res.payload.status >= 200 && res.payload.status < 300) {
          dispatch(addNewSlideApi({pId : lastCanvas.presentationId, slideNo : 1})).then((response: any) => {
            if (response.payload.status >= 200 && response.payload.status < 300) {
              const slideNew : CanvasItem = {...newSlide, presentationId : lastCanvas.presentationId, slideId : response.payload.data.slideId}
              dispatch(setCanvas(slideNew));
              dispatch(setActiveSlideId(1));
              dispatch(updateCanvasList([slideNew]))
            }
            return;
          });
          const slideNew : CanvasItem = {...newSlide, presentationId : lastCanvas.presentationId}
          dispatch(setCanvas(slideNew));
          dispatch(setActiveSlideId(1));
          dispatch(updateCanvasList([slideNew]))
        }
      });
    }

    if (canvasList && canvasList.length > 1) {
      dispatch(deleteSlideApi({pId : pptId, slideID : canvasJS.slideId})).then((res: any) => {
        if (res.payload.status >= 200 && res.payload.status < 300) {
          dispatch(deleteSlide(canvasJS.id));
        }
      })
    }
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
        {"Permanently delete this slide?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Once deleted, you may not be able to recover the slide`}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{mt:'-10px'}}>
        <Stack
          direction='row'
          width={'100%'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{ml:'4%'}}
        >
          <Stack>
            <FormControlLabel control={<Checkbox size="small" onChange={handleSlideDelCheckBox} />} label="Don't show this again"/>
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
