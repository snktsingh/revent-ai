import { TABLE } from '@/constants/elementNames';
import PopUpModal from '@/constants/elements/modal';
import { AddElement, Copy, Delete } from '@/constants/media';
import { TableDetails } from '@/interface/storeTypes';
import { copyCanvasCopy, setOriginalSlide } from '@/redux/reducers/canvas';
import { openModal, setMenuItemKey } from '@/redux/reducers/elements';
import { searchElement } from '@/redux/reducers/slide';
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
  DialogTitle,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
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
  const { getElementsData } = useCanvasComponent();
  const dispatch = useAppDispatch();
  const { canvasJS, canvasList, originalCanvasSlide } = useAppSelector(
    state => state.canvas
  );
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
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

  elementData[6].onClick = () => {
    setElementName(TABLE);
    ContentElements.handleOpenTable();
  };
  elementData[9].onClick = () => {
    ContentElements.handleCycle();
  };
  elementData[10].onClick = () => {
    ContentElements.handleProcess();
  };
  elementData[11].onClick = () => {
    ContentElements.handleTimeline();
  };
  elementData[12].onClick = () => {
    ContentElements.handleFunnel();
  };
  elementData[13].onClick = () => {
    ContentElements.handlePyramid();
  };

  const handleRequest = () => {
    dispatch(setOriginalSlide(canvasList[0].canvas));
    dispatch(fetchSlideImg(requestData));
  };
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
                <IconButton onClick={handleLike}>
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
                </IconButton>{' '}
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

            {/* <Card style={{ height: '70vh', width: '100%' }}>
              <br />
              <ReactGridLayout
                layout={layout}
                onLayoutChange={onLayoutChange}
                {...props}
              >
                {generateDOM()}
              </ReactGridLayout>
              <InputBase
                sx={{ ml: 3 }}
                placeholder="/ Type to search elements..."
                value={slide.listSearch}
                onChange={handleElementSearch}
              />

              {slide.listSearch == '' ? (
                <></>
              ) : (
                <div
                  style={{
                    overflowY: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '37vh',
                  }}
                >
                  {filteredList.map((item, index) => {
                    return (
                      <MenuItem
                        onClick={handleSlideListClose}
                        style={{ display: 'flex', flexDirection: 'column' }}
                        key={index}
                      >
                        <Stack direction="row" spacing={1}>
                          <img src={item.icon} width="30vh" />
                          <ElementContainer>
                            <ElementTitle>{item.title}</ElementTitle>
                            <ElementSubtitle>{item.subtitle}</ElementSubtitle>
                          </ElementContainer>
                        </Stack>
                      </MenuItem>
                    );
                  })}
                </div>
              )}
            </Card> */}
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
                    onClick={() => {
                      handleClose();
                      item.onClick();
                      dispatch(setMenuItemKey(item.key));
                    }}
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
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: theme => theme.zIndex.drawer + 1,
          top: '14%',
          left: '17%',
          bottom: '6%',
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </BodyContainer>
  );
};
export default CanvasBody;
