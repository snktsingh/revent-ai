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
import { Add } from '@/constants/media';
import { useEffect, useState } from 'react';
import {
  setNewTheme,
  setSelectedTheme,
  setThemeCode,
  setThemeId,
} from '@/redux/reducers/theme';
import { fetchSlideImg, getAllThemes } from '@/redux/thunk/thunk';
import { useCanvasComponent } from '../canvasComponent/container';
import { toast } from 'react-toastify';
import ThumbnailPreview from '@/common-ui/thumbnailPreview';
import useCanvasData from '../canvasComponent/canvasDataExtractor';
import { ThemesSliderContainer } from './style';

export default function Templates() {
  const {  customFabricProperties } = useCanvasComponent();
  const { getElementsData } = useCanvasData();
  const [tempCode, setTempCode] = useState('');
  const element = useAppSelector(state => state.element);
  const { selectedThemeId } = useAppSelector(state => state.slideTheme);
  const dispatch = useAppDispatch();
  const thunk = useAppSelector(state => state.thunk);
  const { requestData } = useAppSelector(state => state.apiData);
  const { canvasJS, originalCanvasSlide } = useAppSelector(
    state => state.canvas
  );
  const theme = useTheme();

  const handleDrawerClose = () => {
    dispatch(toggleTemplateVisibility());
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
    width: '14vw',
    background: 'white',
  }));

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = (themeCode: string, themeId: number) => {
    dispatch(setThemeId(themeId));
    dispatch(setSelectedTheme(tempCode));
    setOpen(true);

    getElementsData(
      (canvasJS.originalSlideData as any).objects,
      themeCode,
      themeId
    )
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
      console.log({ changeTheme: canvasJS.originalSlideData })
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
      <DrawerHeader >
        <h4>Themes</h4>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <ThemesSliderContainer>
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
            {thunk.themesList.map((themes, i) => {
              return (
                <ListSlideCard
                  onClick={() => {
                    handleClickOpen(themes.themeColor, themes.themeId);
                    setTempCode(themes.themeId);
                  }}
                  key={themes.themeId}
                  className={
                    selectedThemeId === themes.themeId
                      ? 'clicked-card'
                      : ''
                  }
                >
                  <ThumbnailPreview src={themes.thumbnailUrl} alt={themes.themeId} style={{width:'14vw',height:'15vh'}} />
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
                  <Button
                    autoFocus
                    onClick={() => {
                      changeThemeRequest();
                      // dispatch(setSelectedTheme(tempCode));
                    }}
                  >
                    Yes
                  </Button>
                </DialogActions>
              </>
            </Dialog>
          </>
        )}
      </ThemesSliderContainer>
    </Drawer>
  );
}
