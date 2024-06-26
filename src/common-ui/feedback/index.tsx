import React, { useEffect, useState } from 'react';
import {
  Fab,
  Menu,
  MenuItem,
  TextField,
  Button,
  Stack,
  Backdrop,
  IconButton,
  Tooltip,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { FeedbackContainer } from './style';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/endpoint';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { postFeedbackApi } from '@/redux/thunk/user';
import EmailIcon from '@mui/icons-material/Email';
import { customStyles } from '@/constants/theme';

const Feedback: React.FC<{ anchorEl: HTMLElement | null, handleClose: () => void }> = ({ anchorEl, handleClose }) => {
  const [feedback, setFeedback] = useState('');
  const dispatch = useAppDispatch();
  const { userDetails } = useAppSelector((state) => state.manageUser);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (feedback.length !== 0) {
      dispatch(postFeedbackApi({ username: `${userDetails?.login}`, email: userDetails?.email!, message: feedback })).then((res: any) => {
        if (res.payload.status >= 200 && res.payload.status < 300) { }
      })
    }
    handleClose();
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 18,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <Stack width={'100%'} direction={'column'}>
          <Stack sx={{ width: '100%', p: '5px 16px 5px 16px' }} spacing={1.2}>
            <Stack
              sx={{ width: '100%', height:'1.2rem' }}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <p
                style={{
                  color: 'gray',
                  fontFamily: `${customStyles.fonts.robotoSansSerif}`,
                }}
              >
                Let us know what you think!
              </p>
              <Tooltip title="Tutorials">
                <IconButton
                  color="primary"
                  onClick={() => navigate(ROUTES.TUTORIALS)}
                  sx={{ width: '1rem', height: '1rem' }}
                >
                  <HelpOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>

            <TextField
              label="Feedback"
              multiline
              rows={6}
              sx={{ width: '18rem', m: '0px 16px 5px 16px'}}
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              variant="outlined"
            />
          </Stack>
          <Stack direction={'row'} justifyContent={'right'} alignItems={'center'} sx={{ width: '100%', p: '5px 16px 5px 16px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              size='small'
              sx={{ mr: 1 }}
            >
              Close
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size='small'
            >
              Send Feedback
            </Button>
          </Stack>
        </Stack>
      </Menu>
    </>
  );
};

export default Feedback;
