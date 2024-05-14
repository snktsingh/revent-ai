import ThumbnailPreview from '@/common-ui/thumbnailPreview';
import { Add } from '@/constants/media';
import { toggleTemplateVisibility } from '@/redux/reducers/elements';
import {
  setNewTheme,
  setThemeCode,
  setThemeId
} from '@/redux/reducers/theme';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  getAllThemes,
  toggleThemeChange,
  updatePresentationTheme
} from '@/redux/thunk/thunk';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useCanvasData from '../canvasComponent/canvasDataExtractor';
import { useCanvasComponent } from '../canvasComponent/container';
import { ListSlideCard } from '../style';
import { ThemesSliderContainer } from './style';

export default function Templates() {
  const { customFabricProperties } = useCanvasComponent();
  const { getElementsData } = useCanvasData();
  const [tempCode, setTempCode] = useState('');
  const element = useAppSelector(state => state.element);
  const { selectedThemeId, themeId } = useAppSelector(
    state => state.slideTheme
  );
  const dispatch = useAppDispatch();
  const thunk = useAppSelector(state => state.thunk);
  const { requestData } = useAppSelector(state => state.apiData);
  const { canvasJS, originalCanvasSlide, canvasList } = useAppSelector(
    state => state.canvas
  );
  const [currentTheme, setCurrentTheme] = useState<any>({});
  const [canvasIndex, setCanvasIndex] = useState<number>(0);
  const [hasVariantsInCanvasList, setIsVariantsAvailable] =
    useState<boolean>(false);
  const theme = useTheme();

  const handleDrawerClose = () => {
    dispatch(toggleTemplateVisibility());
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    margin: 'auto',
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
    width: '15vw',
    background: 'white',
  }));

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = (theme: any) => {
    setCurrentTheme(theme);
    dispatch(setThemeId(theme.themeId));

    if (hasVariantsInCanvasList) {
      setOpen(true);
    } else {
      dispatch(setThemeId(theme.themeId));
    }
    getElementsData((canvasJS.originalSlideData as any).objects, theme.themeId).catch(error => {
      console.error('An error occurred:', error);
    });
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setThemeCode(''));
  };

  useEffect(() => {
    dispatch(getAllThemes());
  }, []);

  useEffect(() => {
    const hasVariants = canvasList.some(item => item.variants.length > 0);
    setIsVariantsAvailable(hasVariants);
    const index = canvasList.findIndex(canvas => canvas.id === canvasJS.id);
    if (index) {
      setCanvasIndex(index);
    }
  }, [canvasJS.canvas]);

  // useEffect(()=>{},[selectedThemeId]);
  const changeThemeRequest = () => {
    dispatch(toggleThemeChange());
    dispatch(setThemeId(currentTheme.themeId));
    if (requestData?.elements && requestData?.elements.length == 0) {
      toast.warning('Canvas is empty');
    } else {
      console.log({ changeTheme: canvasJS.originalSlideData });
      console.log(themeId);
      dispatch(
        updatePresentationTheme({
          pptId: thunk.presentationId,
          themeId: themeId,
        })
      ).then((res: any) => {
        console.log(res);
        if (res.payload.status == 200) {
          window.location.reload();
          toast.success('Theme Updated ');
        } else {
          dispatch(toggleThemeChange());
          toast.error('Theme updating failed');
        }
      });
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
      <ThemesSliderContainer>
        <Button onClick={() => dispatch(setNewTheme(true))}>
          <Stack direction="row" spacing={1}>
            <img src={Add} />
            <span>Create new theme</span>
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
                    handleClickOpen(themes);
                  }}
                  key={themes.themeId}
                  className={themeId === themes.themeId ? 'clicked-card' : ''}
                >
                  <ThumbnailPreview
                    src={themes.thumbnailUrl}
                    alt={themes.themeId}
                    style={{ width: '100%', height: 'auto' }}
                    componentTitle="slideThemes"
                  />
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
                    Selecting this theme will change theme for whole
                    presentation
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <>
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
                  </>
                </DialogActions>
              </>
            </Dialog>
          </>
        )}
      </ThemesSliderContainer>
    </Drawer>
  );
}
