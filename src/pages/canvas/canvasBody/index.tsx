import PopUpModal from '@/constants/elements/modal';
import { AddElement, Copy, Delete } from '@/constants/media';
import canvas, {
  copyCanvasCopy,
  setCanvas,
  setVariantImageAsMain,
  toggleSelectedOriginalCanvas,
  updateCanvasInList,
  updateCurrentCanvas,
} from '@/redux/reducers/canvas';
import { openModal, setMenuItemKey } from '@/redux/reducers/elements';
import { searchElement, toggleRegenerateButton } from '@/redux/reducers/slide';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchSlideImg } from '@/redux/thunk/thunk';
import { ThumbDownAltRounded } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import CanvasComponent from './canvasComponent';
import { CanvasNotes } from './canvasNotes';
import { ContentElements, elementData } from './elementData';
import SlideList from './slideList';
import {
  BodyContainer,
  EditSlideContainer,
  ElementContainer,
  ElementSubtitle,
  ElementTitle,
  LikeButton,
} from './style';
import Templates from './themes';
import { useCanvasComponent } from './canvasComponent/container';

const CanvasBody = () => {
  const slide = useAppSelector(state => state.slide);
  const [redirectAlert, setRedirectAlert] = useState<boolean>(false);

  const openRedirectAlert = () => {
    setRedirectAlert(true);
  };

  const closeRedirectAert = () => {
    setRedirectAlert(false);
  };
  const { getElementsData } = useCanvasComponent();
  const dispatch = useAppDispatch();
  const { canvasJS, canvasList, selectedOriginalCanvas, variantImage } =
    useAppSelector(state => state.canvas);
  const { isRegenerateDisabled } = useAppSelector(state => state.slide);
  const { isLoading } = useAppSelector(state => state.thunk);
  const { requestData } = useAppSelector(state => state.apiData);
  const [activeLike, setActiveLike] = useState(false);
  const [activeDislike, setActiveDislike] = useState(false);
  const [elementName, setElementName] = useState<string>('');

  const handleLike = () => {
    setActiveLike(!activeLike);
    setActiveDislike(false);
  };

  const handleDislike = () => {
    setActiveDislike(!activeDislike);
    setActiveLike(false);
  };

  const handleRegeneration = (item: any) => {
    if (canvasJS.variants.length === 0) {
      handleClose();
      item.onClick();
      dispatch(setMenuItemKey(item.key));
    } else {
      handleClose();
      openRedirectAlert();
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [filteredList, setFilteredList] = useState(elementData);

  const filterData = (searchValue: string) => {
    const filtered = elementData.filter(item =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredList(filtered);
  };
  const handleElementSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchElement(e.target.value));
    filterData(slide.listSearch);
  };
  const handleSlideListClose = () => {
    dispatch(searchElement(''));
    setFilteredList(elementData);
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  // elementData[6].onClick = () => {
  //   ContentElements.handleOpenTable();
  // };
  // elementData[8].onClick = () => {
  //   ContentElements.handleCycle();
  // };
  // elementData[9].onClick = () => {
  //   ContentElements.handleProcess();
  // };
  // elementData[10].onClick = () => {
  //   ContentElements.handleTimeline();
  // };
  // elementData[11].onClick = () => {
  //   ContentElements.handleFunnel();
  // };
  // elementData[12].onClick = () => {
  //   ContentElements.handlePyramid();
  // };

  const handleRequest = () => {
    const currentCanvas = {
      ...canvasJS,
      originalSlideData: canvasList[canvasJS.id - 1].canvas,
    };
    dispatch(updateCurrentCanvas(currentCanvas));
    dispatch(fetchSlideImg(requestData));
    dispatch(toggleSelectedOriginalCanvas(false));
  };

  const handleRedirect = () => {
    // dispatch(setVariantImageAsMain(''));
    dispatch(toggleSelectedOriginalCanvas(true));
    dispatch(
      updateCanvasInList({
        id: canvasJS.id,
        updatedCanvas: canvasJS.originalSlideData,
      })
    );
    let canvas = { ...canvasJS, canvas: canvasJS.originalSlideData };
    dispatch(setCanvas(canvas));
    setRedirectAlert(false);
  };
  useEffect(() => {
    if (canvasJS) {
      const canvasIsEmpty =
        (canvasList[canvasJS.id - 1].canvas as any).objects.length === 0;
      const variantsIsEmpty = canvasJS.variants.length === 0;
      console.log({ variantsIsEmpty, canvasIsEmpty });
      if (variantsIsEmpty && canvasIsEmpty) {
        dispatch(toggleRegenerateButton(true)); // Disable the button
      } else if (selectedOriginalCanvas) {
        dispatch(toggleRegenerateButton(false)); // Enable the button
      } else if (!variantsIsEmpty && !selectedOriginalCanvas) {
        dispatch(toggleRegenerateButton(true)); // Enable the button
      }
    }
    console.log({ isRegenerateDisabled });
  }, [canvasJS, dispatch, variantImage, isRegenerateDisabled]);

  return (
    <BodyContainer>
      <ToastContainer autoClose={800} />
      <Grid container>
        <Grid xs={2}>
          <SlideList />
        </Grid>
        <Grid xs={8}>
          <EditSlideContainer>
            <Stack
              direction="row"
              justifyContent="space-between"
              width={'91.51%'}
            >
              <span>
                <IconButton onClick={() => dispatch(openModal())}>
                  <img src={Delete} />
                </IconButton>
                <IconButton
                  onClick={() => dispatch(copyCanvasCopy(canvasJS.id))}
                >
                  <img src={Copy} />
                </IconButton>
                <IconButton onClick={handleClick}>
                  <img src={AddElement} />
                </IconButton>
              </span>
              <span>
                {/* <IconButton onClick={handleLike}>
                  <LikeButton
                    fontSize="small"
                    className={
                      activeLike
                        ? 'likeDislikeActiveButton'
                        : '"likeDislikeInActiveButton"'
                    }
                  />
                </IconButton>
                <IconButton onClick={handleDislike}>
                  <ThumbDownAltRounded
                    fontSize="small"
                    className={
                      activeDislike
                        ? 'likeDislikeActiveButton'
                        : '"likeDislikeInActiveButton"'
                    }
                  />
                </IconButton>{' '} */}
                &nbsp;
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleRequest()}
                  disabled={isRegenerateDisabled}
                >
                  Regenerate
                </Button>
              </span>
            </Stack>
            <CanvasComponent />
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              style={{
                height: '60vh',
              }}
            >
              <InputBase
                placeholder="Search...."
                size="small"
                value={slide.listSearch}
                onChange={handleElementSearch}
              />
              {filteredList.map((item, index) => {
                return (
                  <MenuItem
                    onClick={() => handleRegeneration(item)}
                    style={{ display: 'flex', flexDirection: 'column' }}
                    key={index}
                  >
                    <Stack direction="row" width={'100%'} spacing={2}>
                      <img src={item.icon} width="30vh" />
                      <ElementContainer>
                        <ElementTitle>{item.title}</ElementTitle>
                        <ElementSubtitle>{item.subtitle}</ElementSubtitle>
                      </ElementContainer>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Menu>
          </EditSlideContainer>
          <CanvasNotes />
        </Grid>
      </Grid>
      <Templates />
      <PopUpModal content={slide.slideKey} />
      <Dialog
        open={redirectAlert}
        onClose={closeRedirectAert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Modification Detected !'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Changes cannot be applied on the current design. If you want to make
            modifications Please visit the original slide from variants section.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRedirectAert}>Close</Button>
          <Button onClick={handleRedirect} autoFocus>
            Make Modifications
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: theme => theme.zIndex.drawer + 1,
          top: '14%',
          left: '17%',
          bottom: '6%',
          display: 'flex',
          flexDirection: 'column',
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
        <p>Regenerating the slide...</p>
      </Backdrop>
    </BodyContainer>
  );
};
export default CanvasBody;
