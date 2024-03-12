import { Alert } from '@mui/material';
import { useState } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

interface State extends SnackbarOrigin {
  open: boolean;
}

const MessagePopup = ({ message }:string) => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={1500}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
