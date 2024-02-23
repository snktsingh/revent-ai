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
import { useEffect, useState } from 'react';
import { setNewTheme, setThemeCode, setThemeName } from '@/redux/reducers/theme';
import { fetchSlideImg, getAllThemes } from '@/redux/thunk/thunk';
import { setOriginalSlide, setRequestData } from '@/redux/reducers/canvas';
import { useCanvasComponent } from '../canvasComponent/container';
import CircularProgress from '@mui/material/CircularProgress';
import { request } from 'http';
import { toast } from 'react-toastify';

export default function Templates() {
  const { getElementsData, customFabricProperties } = useCanvasComponent();
  const element = useAppSelector(state => state.element);
  const toggleTheme = useAppSelector(state => state.slideTheme.themeCode);
  const dispatch = useAppDispatch();
  const thunk = useAppSelector(state => state.thunk);
  const { requestData } = useAppSelector(state => state.apiData);
  const { canvasList, originalCanvasSlide } = useAppSelector(
    state => state.canvas
  );
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

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = (themeCode: string, themeName : string) => {
    console.log({themeCode,themeName})
    dispatch(setThemeName(themeName));
    setOpen(true);
    setTimeout(() => {
      getElementsData(originalCanvasSlide.objects, themeCode, themeName);
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setThemeCode(''));
  };

  useEffect(() => {
    dispatch(getAllThemes());
  }, []);

  const changeThemeRequest = () => {
    if (requestData?.elements.length == 0) {
      toast.warning('Canvas is empty');
    } else {
      dispatch(fetchSlideImg(requestData));
    }
    setOpen(false);
  };

  return (
    <Drawer
      sx={{
        width: '14vw',
        flexShrink: 3,
        '& .MuiDrawer-paper': {
          width: '17vw',
          padding: '0vh 2vh 14vh 2vh',
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
        {thunk.isThemeLoading ? (
          <h4>Loading...</h4>
        ) : (
          <>
            {thunk.themesList.map(themes => {
              return (
                <ListSlideCard
                  onClick={() => handleClickOpen(themes.themeColor, themes.company)}
                >
                  <img src={themes.thumbnailUrl} width="100%" height="100%" />
                </ListSlideCard>
              );
            })}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <>
                <DialogTitle id="alert-dialog-title">
                  {'Are you sure ?'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Selecting this theme will change the current slide contents
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button autoFocus onClick={changeThemeRequest}>
                    Yes
                  </Button>
                </DialogActions>
              </>
            </Dialog>
          </>
        )}
      </SingleSliderContainer>
    </Drawer>
  );
}
