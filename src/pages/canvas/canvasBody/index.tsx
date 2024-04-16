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
import { Slide, ToastContainer } from 'react-toastify';
import CanvasComponent from './canvasComponent';
import { CanvasNotes } from './canvasNotes';
import { ContentElements, elementData } from './elementData';
import SlideList from './slideList';
import {
  BodyContainer,
  EditSlideContainer,
  ElementContainer,
  ElementSearchInput,
  ElementSubtitle,
  ElementTitle,
  LikeButton,
} from './style';
import Templates from './themes';
import { useCanvasComponent } from './canvasComponent/container';
import useCanvasData from './canvasComponent/canvasDataExtractor';
import useVariants from './canvasVariant/container';
import { Images, listImages } from '@/data/data';

const CanvasBody = () => {
  const slide = useAppSelector(state => state.slide);
  const [redirectAlert, setRedirectAlert] = useState<boolean>(false);

  const openRedirectAlert = () => {
    setRedirectAlert(true);
  };

  const closeRedirectAert = () => {
    setRedirectAlert(false);
  };
  const { getElementsData } = useCanvasData();
  const dispatch = useAppDispatch();
  const { canvasJS, canvasList, selectedOriginalCanvas, variantImage } =
    useAppSelector(state => state.canvas);
  const { isRegenerateDisabled } = useAppSelector(state => state.slide);
  const { isLoading } = useAppSelector(state => state.thunk);
  const { requestData } = useAppSelector(state => state.apiData);
  const { enabledElements } = useAppSelector(state => state.element);
  const [activeLike, setActiveLike] = useState(false);
  const [activeDislike, setActiveDislike] = useState(false);
  const [elementName, setElementName] = useState<string>('');
  const [elementsDisable, setElementsDisable] = useState<boolean>(false);
  const [variantsIsEmpty, setVariantsIsEmpty] = useState<boolean>(false);
  const { handleApplyOriginalAsMain } = useVariants();
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



  const handleRequest = () => {
    const currentCanvas = {
      ...canvasJS,
      originalSlideData: canvasList[canvasJS.id - 1].canvas,
    };
    dispatch(updateCurrentCanvas(currentCanvas));
    const isListImagesPresent = requestData?.elements.some((canvas => canvas.shape === 'List'));
    const isImagesPresent = requestData?.elements.some((canvas => canvas.shape === 'Images'));
    if(isListImagesPresent){
      let blob = new Blob([JSON.stringify(requestData)], {type : 'application/json'});
      let formData = new FormData();
      formData.append('data', blob);
      const listImagesArray = listImages.find((el) => el.canvasId == canvasJS.id);
      if(listImagesArray){
        for(let i=0;i<listImagesArray.images.length;i++){
          formData.append("images", listImagesArray.images[i].file);
        }
        dispatch(fetchSlideImg(formData));
        dispatch(toggleSelectedOriginalCanvas(false));
      }
      return;
    }
    if(isImagesPresent){
      let blob = new Blob([JSON.stringify(requestData)], {type : 'application/json'});
      let formData = new FormData();
      formData.append('data', blob);
      const ImagesArray = Images.find((el) => el.canvasId == canvasJS.id);
      if(ImagesArray){
        for(let i=0;i<ImagesArray.images.length;i++){
          formData.append("images", ImagesArray.images[i].file);
        }
        dispatch(fetchSlideImg(formData));
        dispatch(toggleSelectedOriginalCanvas(false));
      }
      return;
    }
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
      setVariantsIsEmpty(canvasJS.variants.length === 0);
      if (variantsIsEmpty && canvasIsEmpty) {
        dispatch(toggleRegenerateButton(true)); 
      } else if (selectedOriginalCanvas) {
        dispatch(toggleRegenerateButton(false)); 
      } else if (!variantsIsEmpty && !selectedOriginalCanvas) {
        dispatch(toggleRegenerateButton(true)); 
      }
    }
  }, [canvasJS, dispatch, variantImage, isRegenerateDisabled,enabledElements]);

  function isDisabled(name: string): boolean {
    if (enabledElements.includes(name)) {
      return false;
    }

    return true;
  }


  return (
    <BodyContainer>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        transition={Slide}
      />
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
                {(!variantsIsEmpty && !selectedOriginalCanvas) && <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleApplyOriginalAsMain()}
                >
                  Edit
                </Button>}
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
              <ElementSearchInput
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
                    disabled={isDisabled(item.title)}
                  >
                    <Stack direction="row" width={'100%'} spacing={2} >
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
      <PopUpModal />
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
