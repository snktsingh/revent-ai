import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  Stack,
  styled,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ListSlideCard, SingleSliderContainer } from '../style';
import { useTheme } from '@mui/material/styles';
import { toggleTemplateVisibility } from '@/redux/reducers/elements';
import { Add, Theme1, Theme2, Theme3 } from '@/constants/media';
import { useState } from 'react';
import { setNewTheme } from '@/redux/reducers/theme';

export default function Templates() {
  const element = useAppSelector(state => state.element);
  const toggleTheme = useAppSelector(state => state.slideTheme);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const handleDrawerClose = () => {
    dispatch(toggleTemplateVisibility());
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  }));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      sx={{
        width: '14vw',
        flexShrink: 3,
        '& .MuiDrawer-paper': {
          width: '17vw',
          padding: '0vh 2vh',
          marginTop: '13.5vh',
        },
      }}
      variant="persistent"
      anchor="left"
      open={element.openTemplates}
    >
      <DrawerHeader>
        <h4>Themes</h4>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <SingleSliderContainer>
        <Button onClick={() => dispatch(setNewTheme(true))}>
          <Stack direction="row" spacing={1}>
            <img src={Add} />
            <span>Add New Theme</span>
          </Stack>
        </Button>
        <br />
        <ListSlideCard onClick={handleClickOpen}>
          <img src={Theme1} width="100%" height="100%" />
        </ListSlideCard>
        <br />
        <ListSlideCard onClick={handleClickOpen}>
          <img src={Theme2} width="100%" height="100%" />
        </ListSlideCard>
        <br />
        <ListSlideCard onClick={handleClickOpen}>
          <img src={Theme3} width="100%" height="100%" />
        </ListSlideCard>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Are you sure ?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Selecting this theme will change the current slide contents
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleClose} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </SingleSliderContainer>
    </Drawer>
  );
}
