import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import axios from 'axios';
import {
  BodyContainer,
  EditSlideContainer,
  ElementContainer,
  ElementSubtitle,
  ElementTitle,
  LikeButton,
} from './style';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { AddElement, Copy, Delete } from '@/constants/media';
import { openModal, setMenuItemKey } from '@/redux/reducers/elements';
import PopUpModal from '@/constants/elements/modal';
import { searchElement } from '@/redux/reducers/slide';
import {
  CYCLE,
  ContentElements,
  FUNNEL,
  PROCESS,
  PYRAMID,
  TABLE,
  TIMELINE,
  elementData,
} from './elementData';
import React, { useState } from 'react';
import { CanvasNotes } from './canvasNotes';
import SlideList from './slideList';
import Templates from './templates';
import { ThumbDownAltRounded, Widgets } from '@mui/icons-material';
import CanvasComponent from './canvasComponent';
import {
  copyCanvasCopy,
  setCanvas,
  setOriginalSlide,
  setRequestData,
  setTableDetails,
  setTempData,
} from '@/redux/reducers/canvas';
import { ToastContainer, toast } from 'react-toastify';
import { fetchSlideImg } from '@/redux/thunk/thunk';
import { TableDetails } from '@/interface/storeTypes';

const CanvasBody = () => {
  const slide = useAppSelector(state => state.slide);
  const dispatch = useAppDispatch();
  const {
    canvasJS,
    requestData,
    tempData,
    shapeName,
    canvasImageURl,
    canvasList,
  } = useAppSelector(state => state.canvas);
  const { isRegenerateDisabled } = useAppSelector(state => state.slide);
  const { isLoading } = useAppSelector(state => state.thunk);
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
    handleClickOpenDialog();
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [cellWidth, setCellWidth] = useState('120');
  const [cellHeight, setCellHeight] = useState('35');

  const handleElementData = () => {
    let newTableData: TableDetails = {
      row: +rows,
      col: +columns,
      width: +cellWidth,
      height: +cellHeight,
    };

    switch (elementName) {
      case TABLE:
        ContentElements.handleOpenTable(
          +rows,
          +columns,
          +cellWidth,
          +cellHeight
        );
        break;
      default:
        break;
    }
    handleCloseDialog();
  };

  const DialogDetails = () => {
    switch (elementName) {
      case TABLE:
        return (
          <Box style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <TextField
              label="Rows"
              variant="outlined"
              value={rows}
              onChange={e => setRows(e.target.value)}
              required
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
              label="Columns"
              variant="outlined"
              value={columns}
              onChange={e => setColumns(e.target.value)}
              required
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
              label="Cell Width"
              variant="outlined"
              value={cellWidth}
              onChange={e => setCellWidth(e.target.value)}
              required
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
              label="Cell Height"
              variant="outlined"
              value={cellHeight}
              onChange={e => setCellHeight(e.target.value)}
              required
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Box>
        );
      default:
        return 'Something went wrong';
    }
  };

  const DialogTitleContent = () => {
    switch (elementName) {
      case TABLE:
        return 'Please Provide Table Details: Rows, Columns, Width, and Height';
      default:
        return 'Something went wrong';
    }
  };

  const handleRequest = () => {
    console.log({ requestData });
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
            <Stack direction="row" justifyContent="space-between" width={'91.51%'}>
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
        BackdropProps={{
          sx: { backgroundColor: 'transparent' },
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          <DialogTitleContent />
        </DialogTitle>
        <DialogContent>
          <Box>
            <DialogDetails />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            onClick={handleElementData}
          >
            Submit
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
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </BodyContainer>
  );
};
export default CanvasBody;
