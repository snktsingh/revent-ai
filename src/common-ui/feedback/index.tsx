import React, { useEffect, useState } from 'react';
import {
  Fab,
  Menu,
  MenuItem,
  TextField,
  Button,
  Stack,
  Backdrop,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { FeedbackContainer } from './style';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/endpoint';

const Feedback = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [feedback, setFeedback] = useState('');

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = () => {
    console.log(feedback);
    handleClose();
  };


  return (
    <FeedbackContainer >
      <Fab color="primary" aria-label="feedback" onClick={handleClick}>
        <HelpOutlineIcon style={{ width: '80%', height: '80%' }} />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: -1.5, 
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
              top: '100%',
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
        <Stack width={'100%'} direction={'column'} >
          <Stack sx={{ width: '100%', p: '5px 16px 5px 16px' }} spacing={1.2}>
          <p style={{color:'#333333'}}>Let us know what you think!</p>
          <TextField
            label="Feedback"
            multiline
            rows={6}
            sx={{ width: '18rem', m: '0 16px 5px 16px' }}
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            variant="outlined"
          />
          </Stack>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ margin: '16px' }}
          >
            Send Feedback
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ m: '5px 16px' }}
            endIcon={<OpenInNewIcon />}
            onClick={() => {
              handleClose();
              navigate(ROUTES.TUTORIALS)
            }}
          >
            Tutorials
          </Button>
        </Stack>
      </Menu>
      {anchorEl && (
        <Backdrop
          open={Boolean(anchorEl)}
          onClick={handleClose}
          sx={{
            zIndex: theme => theme.zIndex.drawer - 1,
          }}
        />
      )}
    </FeedbackContainer>
  );
};

export default Feedback;
