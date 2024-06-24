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

const Feedback = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [feedback, setFeedback] = useState('');

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

  console.log({ anchorEl });

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
        <Stack>
          <TextField
            label="Feedback"
            multiline
            rows={6}
            sx={{ width: '18rem' }}
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            variant="outlined"
            style={{ margin: '16px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ margin: '16px' }}
          >
            Submit
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
