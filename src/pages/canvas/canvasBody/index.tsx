import PopUpModal from '@/constants/elements/deleteSlideModal';
import { Add, Wand } from '@/constants/media';
import { Images, QuoteImages, listImages } from '@/data/data';
import {
  deleteSlide,
  setCanvas,
  setVariantImageAsMain,
  toggleIsVariantSelected,
  toggleSelectedOriginalCanvas,
  updateCanvasInList,
  updateCurrentCanvas,
  updateSlideIdInList,
} from '@/redux/reducers/canvas';
import { openModal, setMenuItemKey } from '@/redux/reducers/elements';
import { searchElement, toggleRegenerateButton } from '@/redux/reducers/slide';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchSlideImg } from '@/redux/thunk/thunk';
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import CanvasComponent from './canvasComponent';
import useCanvasData from './canvasComponent/canvasDataExtractor';
import { CanvasNotes } from './canvasNotes';
import useVariants from './canvasVariant/container';
import { elementData } from './elementData';
import SlideList from './slideList';
import {
  BodyContainer,
  EditSlideContainer,
  ElementContainer,
  ElementSearchInput,
  ElementSubtitle,
  ElementTitle,
} from './style';
import Templates from './themes';
import AddIcon from '@mui/icons-material/Add';
import TableGenerator from '@/components/TableInput';
import { APIRequest } from '@/interface/storeTypes';

const CanvasBody = () => {
  const slide = useAppSelector(state => state.slide);
  const [redirectAlert, setRedirectAlert] = useState<boolean>(false);
  const [modificationAlert, setModificationAlert] = useState<boolean>(false);
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const openRedirectAlert = () => {
    setRedirectAlert(true);
  };

  const closeRedirectAert = () => {
    setRedirectAlert(false);
  };
  const { getElementsData } = useCanvasData();
  const dispatch = useAppDispatch();
  const {
    canvasJS,
    canvasList,
    selectedOriginalCanvas,
    variantImage,
    isVariantSelected,
  } = useAppSelector(state => state.canvas);
  const { isRegenerateDisabled } = useAppSelector(state => state.slide);
  const { isLoading } = useAppSelector(state => state.thunk);
  const { requestData } = useAppSelector(state => state.apiData);
  const { creditAmount } = useAppSelector(state => state.manageUser);
  const { enabledElements, isDeleteAlertShow } = useAppSelector(
    state => state.element
  );
  const [activeLike, setActiveLike] = useState(false);
  const [activeDislike, setActiveDislike] = useState(false);
  const [elementName, setElementName] = useState<string>('');
  const [elementsDisable, setElementsDisable] = useState<boolean>(false);
  const [isVariantsEmpty, setIsVariantsEmpty] = useState<boolean>(true);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState<boolean>(true);
  const [isEditBtnShow, setIsEditBtnShow] = useState<boolean>(false);
  const [isReturnBtnShow, setIsReturnBtnShow] = useState<boolean>(false);
  const [canvasIndex, setCanvasIndex] = useState<number>(0);
  const { handleApplyOriginalAsMain } = useVariants();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleLike = () => {
    setActiveLike(!activeLike);
    setActiveDislike(false);
  };

  const handleDislike = () => {
    setActiveDislike(!activeDislike);
    setActiveLike(false);
  };
  const params = useParams<{ id: string }>();

  const handleAddElementsToCanvas = (item: any) => {
    const hasVariants = (canvasJS.canvas as any).objects.some(
      (obj: any) => obj.name === 'VariantImage'
    );
    if (Array.isArray(canvasJS.variants) && canvasJS.variants.length === 0) {
      handleClose();
      item.onClick();
      dispatch(setMenuItemKey(item.key));
    } else if (hasVariants) {
      openRedirectAlert();
    } else {
      handleClose();
      if (selectedOriginalCanvas) {
        item.onClick();
        return;
      }
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
    setModificationAlert(false);
    const currentCanvas = {
      ...canvasJS,
      originalSlideData: canvasList[canvasJS.id - 1].canvas,
    };
    dispatch(updateCurrentCanvas(currentCanvas));
    const slideJSON = canvasList[canvasJS.id - 1].canvas;
    const notes = canvasList[canvasJS.id - 1].notes;
    const pptId = params.id?.split('-')[0];

    const isListImagesPresent = requestData?.elements.some(
      canvas => canvas.shape === 'ImageSubtitle'
    );
    const isImagesPresent = requestData?.elements.some(
      canvas => canvas.shape === 'Images'
    );
    const isQuoteImagesPresent = requestData?.elements.some(
      canvas => canvas.shape === 'Quote'
    );

    if (isListImagesPresent && requestData) {

      let requestListData : APIRequest = requestData;
      const listData = requestData?.elements?.find((el) => el.shape === 'ImageSubtitle');
      const isTextEmpty = listData?.data?.every(obj => obj.text === "");


      if (isTextEmpty) {
        requestListData = {
          ...requestListData,
          elements: requestListData.elements.map(element => 
              element.shape === 'ImageSubtitle' 
              ? { ...element, shape: 'Images' } 
              : element
          )
      };
      }

      let blob = new Blob([JSON.stringify(requestListData)], {
        type: 'application/json',
      });
      let formData = new FormData();
      formData.append('data', blob);
      const listImagesArray = listImages.find(el => el.canvasId == canvasJS.id);
      if (listImagesArray && listImagesArray.images) {
        for (let i = 0; i < listImagesArray.images.length; i++) {
          formData.append('images', listImagesArray.images[i].imageFile);
        }

        dispatch(
          fetchSlideImg({ req: formData, slideJSON, pptId, notes })
        ).then(res => {
          if (res && res.payload.slideId) {
            setSearchParams({ slide: res.payload.slideId });
          }
        });
        dispatch(toggleSelectedOriginalCanvas(false));
      }
      return;
    }

    if (isImagesPresent) {
      let blob = new Blob([JSON.stringify(requestData)], {
        type: 'application/json',
      });
      let formData = new FormData();
      formData.append('data', blob);

      const ImagesArray = Images.find(el => el.canvasId == canvasJS.id);
      if (ImagesArray && ImagesArray.images) {
        for (let i = 0; i < ImagesArray.images.length; i++) {
          formData.append('images', ImagesArray.images[i].imageFile);
        }
        dispatch(fetchSlideImg({ req: formData, slideJSON, pptId, notes })).then((res) => {
          if (res && res.payload.slideId) {
            setSearchParams({ slide: res.payload.slideId });
          }
        });
        dispatch(toggleSelectedOriginalCanvas(false));
      }
      return;
    }
    if (isQuoteImagesPresent) {
      console.log({ requestData });
      let blob = new Blob([JSON.stringify(requestData)], {
        type: 'application/json',
      });
      let formData = new FormData();
      formData.append('data', blob);
      const QuoteImagesArray = QuoteImages.find(
        el => el.canvasId == canvasJS.id
      );

      if (QuoteImagesArray && QuoteImagesArray.images) {
        if (QuoteImagesArray.images.length !== 0) {
          for (let i = 0; i < QuoteImagesArray.images.length; i++) {
            formData.append('images', QuoteImagesArray.images[i].imageFile);
          }
          dispatch(fetchSlideImg({ req: formData, slideJSON, pptId, notes })).then((res) => {
            if (res && res.payload.slideId) {
              setSearchParams({ slide: res.payload.slideId });
            }
          });
          dispatch(toggleSelectedOriginalCanvas(false));
          return;
        }
      }
      dispatch(fetchSlideImg({ req: formData, slideJSON, pptId, notes })).then((res) => {
        if (res && res.payload.slideId) {
          setSearchParams({ slide: res.payload.slideId });
        }
      });;
      dispatch(toggleSelectedOriginalCanvas(false));
      return;
    }
    let reqData = { ...requestData };
    if (params.id?.split('-')[0] && reqData) {
      const ptId = Number(params.id?.split('-')[0]);
      reqData.presentationId = ptId;
    }
    dispatch(fetchSlideImg({ req: reqData, slideJSON, pptId, notes })).then(
      res => {
        if (res && res.payload.slideId) {
          setSearchParams({ slide: res.payload.slideId });
          dispatch(
            updateSlideIdInList({
              slideId: res.payload.slideId,
              canvasId: canvasJS.id,
            })
          );
        }
      }
    );
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

  const handleDeleteSlide = () => {
    if (isDeleteAlertShow) {
      dispatch(openModal());
    } else {
      if (canvasList && canvasList.length === 1) {
        dispatch(openModal());
        return;
      }
      dispatch(deleteSlide(canvasJS.id));
    }
  };

  useEffect(() => {
    const index = canvasList.findIndex(canvas => canvas.id === canvasJS.id);
    if (index !== -1) {
      setCanvasIndex(index);
    }
    if (canvasList && (index || index === 0) && canvasList[index].canvas) {
      const canvasIsEmpty =
        (canvasList[index].canvas as any).objects.length === 0;
      const variantsIsEmpty = canvasList[index].variants.length === 0;
      setIsCanvasEmpty(canvasIsEmpty);
      setIsVariantsEmpty(variantsIsEmpty);
      if (variantsIsEmpty && canvasIsEmpty) {
        dispatch(toggleRegenerateButton(true));
      } else if (selectedOriginalCanvas) {
        dispatch(toggleRegenerateButton(false));
      } else if (!isVariantsEmpty && !selectedOriginalCanvas) {
        dispatch(toggleRegenerateButton(true));
      } else if (!canvasIsEmpty) {
        dispatch(toggleRegenerateButton(false));
      }

      const hasVariants = (canvasList[index].canvas as any).objects.some(
        (obj: any) => obj.name === 'VariantImage'
      );
      setIsEditBtnShow(hasVariants);

      setIsReturnBtnShow(false);
      if (!isVariantsEmpty && selectedOriginalCanvas && !hasVariants) {
        setIsReturnBtnShow(true);
      }
    }
  }, [
    canvasList[canvasIndex],
    dispatch,
    variantImage,
    enabledElements,
    isVariantSelected,
  ]);

  function isDisabled(name: string): boolean {
    if (enabledElements.includes(name)) {
      return false;
    }

    return true;
  }

  function returnToGenSlide() {
    if (
      areCanvasJsonDataDifferent(
        canvasJS.canvas,
        canvasList[canvasIndex].canvas
      )
    ) {
      setModificationAlert(true);
      return;
    }
    let prevVariant = canvasList[canvasIndex].lastVariant;
    console.log({ prevVariant, canvasIndex });
    dispatch(toggleIsVariantSelected(true));
    dispatch(toggleSelectedOriginalCanvas(false));
    dispatch(setVariantImageAsMain(prevVariant));
  }

  const handleBackToPrevVariant = () => {
    setModificationAlert(false);
    let prevVariant = canvasList[canvasIndex].lastVariant;
    dispatch(toggleIsVariantSelected(true));
    dispatch(toggleSelectedOriginalCanvas(false));
    dispatch(setVariantImageAsMain(prevVariant));
  };

  function areCanvasJsonDataDifferent(
    prevCanvas: any,
    modifiedCanvas: any
  ): boolean {
    if (prevCanvas.objects.length !== modifiedCanvas.objects.length) {
      return true;
    }

    for (let i = 0; i < prevCanvas.objects.length; i++) {
      const object1 = prevCanvas.objects[i];
      const object2 = modifiedCanvas.objects[i];

      if (object1.type === 'textbox' && object2.type === 'textbox') {
        if (object1.text !== object2.text) {
          return true;
        }
      } else {
        for (const key in object1) {
          if (object1.hasOwnProperty(key) && object2.hasOwnProperty(key)) {
            if (JSON.stringify(object1[key]) !== JSON.stringify(object2[key])) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  const [tableAnchorEl, setTableAnchorEl] = React.useState<null | HTMLElement>(null);
  const openTable = Boolean(tableAnchorEl);
  const handleTableClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget)
    setTableAnchorEl(event.currentTarget);
  };
  const handleTableClose = () => {
    setTableAnchorEl(null);
  };

  return (
    <BodyContainer>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        transition={Slide}
      />
      <Grid container>
        <Grid
          item
          xs={2}
          onContextMenu={event => {
            event.preventDefault();
          }}
        >
          <SlideList />
        </Grid>
        <Grid item xs={8}>
          <EditSlideContainer>
            <Stack
              direction="row"
              justifyContent="space-between"
              width={'94.51%'}
            >
              <span>
                {/* <Tooltip title="Delete Current Slide" placement="top">
                <IconButton onClick={handleDeleteSlide}  >
                  <img src={Delete}  />
                </IconButton>
                </Tooltip>
                <Tooltip title="Copy Current Slide" placement="top">
                <IconButton
                  onClick={() => dispatch(copyCanvasCopy(canvasJS.id))}
                  sx={{mr: 1}}
                >
                  <img src={Copy} />
                </IconButton>
                </Tooltip> */}
                <Button variant="contained" size="medium" onClick={handleClick}>
                  <Stack direction="row" spacing={1}>
                    <img
                      src="data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 9 9' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.96325 5.03632H0.516602V3.96358H3.96325V0.509277H5.036V3.96358H8.4903V5.03632H5.036V8.48298H3.96325V5.03632Z' fill='%23fff'/%3E%3C/svg%3E"
                      alt=""
                    />
                    <p>Add Elements</p>
                  </Stack>
                </Button>
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
                {isEditBtnShow && (
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={() => handleApplyOriginalAsMain()}
                  >
                    Edit
                  </Button>
                )}
                {isReturnBtnShow && (
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={() => returnToGenSlide()}
                    style={{ marginLeft: 2 }}
                  >
                    Return
                  </Button>
                )}
                &nbsp;
                <Tooltip
                  title={
                    creditAmount === 0 ? (
                      <span>
                        {' '}
                        You have zero credits. Please add more credits to enable
                        this action.{' '}
                      </span>
                    ) : (
                      ''
                    )
                  }
                  arrow
                  placement="top"
                >
                  <span>
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={() => handleRequest()}
                      disabled={creditAmount === 0 || isRegenerateDisabled}
                    >
                      <Stack direction="row" spacing={1}>
                        <img src={Wand} />
                        <p>Regenerate</p>
                      </Stack>
                    </Button>
                  </span>
                </Tooltip>
              </span>
            </Stack>
            <CanvasComponent fabricRef={canvasRef} />
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
                let disabled = isDisabled(item.title);
                return (
                  <div key={item.title}>
                    {disabled ? (
                      <Tooltip
                        title="Sorry, this element can't be added because it conflicts with elements already on the canvas"
                        style={{ cursor: 'not-allowed' }}
                      >
                        <span>
                          <MenuItem
                            onClick={() => handleAddElementsToCanvas(item)}
                            style={{ display: 'flex', flexDirection: 'column' }}
                            key={index}
                            disabled={disabled}
                          >
                            <Stack direction="row" width={'100%'} spacing={2}>
                              <img src={item.icon} width="30vh" />
                              <ElementContainer>
                                <ElementTitle>{item.title}</ElementTitle>
                                <ElementSubtitle>
                                  {item.subtitle}
                                </ElementSubtitle>
                              </ElementContainer>
                            </Stack>
                          </MenuItem>
                        </span>
                      </Tooltip>
                    ) : (
                      <MenuItem
                        onClick={(e) => {
                          if (item.title === "Table") {
                            handleTableClick(e);
                          } else {
                            handleAddElementsToCanvas(item);
                          }
                        }}
                        style={{ display: 'flex', flexDirection: 'column' }}
                        key={index}
                        disabled={disabled}
                      >
                        <Stack direction="row" width={'100%'} spacing={2}>
                          <img src={item.icon} width="30vh" />
                          <ElementContainer>
                            <ElementTitle>{item.title}</ElementTitle>
                            <ElementSubtitle>{item.subtitle}</ElementSubtitle>
                          </ElementContainer>
                        </Stack>
                      </MenuItem>
                    )}
                  </div>
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
          {'Changes Detected !'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Changes cannot be applied on the current design. If you want to make
            modifications Please visit the original slide from variants section
            or Click Below.
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

          display: 'flex',
          flexDirection: 'column',
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
        <p>Regenerating the slide...</p>
      </Backdrop>
      <Dialog
        open={modificationAlert}
        onClose={() => setModificationAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Modification Detected !'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please note that the changes made to the slide will only take effect
            after regeneration. If you wish to regenerate, click the button
            below. Alternatively, you can go back to the previous variant.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBackToPrevVariant}>
            Back to Previous Variant
          </Button>
          <Button onClick={handleRequest} autoFocus>
            Regenerate
          </Button>
        </DialogActions>
      </Dialog>
      {/* Table Input */}
      <TableGenerator handleClose={handleTableClose} open={openTable} anchorEl={tableAnchorEl} canvas={canvasRef.current} />
    </BodyContainer>
  );
};
export default CanvasBody;
