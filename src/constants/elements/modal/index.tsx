import { closeModal } from '@/redux/reducers/elements';
import { deleteSlide } from '@/redux/reducers/slide';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface IPopUpModal {
  content: number;
}
const PopUpModal = (props: IPopUpModal) => {
  const isVisible = useAppSelector(state => state.element);
  const slideKey = useAppSelector(state => state.slide.slideKey);
  const dispatch = useAppDispatch();
  return (
    <Dialog
      open={isVisible.isModalVisible}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <h3>Are you sure ?</h3>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You want to delete the slide {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
        <Button
          onClick={() => {
            dispatch(closeModal());
            dispatch(deleteSlide(slideKey));
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default PopUpModal;
