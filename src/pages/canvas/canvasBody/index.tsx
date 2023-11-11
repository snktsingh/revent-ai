import {
  Box,
  Button,
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
import { openModal } from '@/redux/reducers/elements';
import PopUpModal from '@/constants/elements/modal';
import { searchElement } from '@/redux/reducers/slide';
import { ContentElements, elementData } from './elementData';
import React, { useState } from 'react';
import { CanvasNotes } from './canvasNotes';
import SlideList from './slideList';
import Templates from './templates';
import { ThumbDownAltRounded, Widgets } from '@mui/icons-material';
import CanvasComponent from './canvasComponent';
import { CanvasVariant } from './canvasVariant';
import { TableDetails, setTableDetails } from '@/redux/reducers/canvas';

const CanvasBody = () => {
  const slide = useAppSelector(state => state.slide);
  const dispatch = useAppDispatch();

  const [activeLike, setActiveLike] = useState(false);
  const [activeDislike, setActiveDislike] = useState(false);
  const [elementName, setElementName] = useState<string>("");

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

  elementData[7].onClick = () => {
    setElementName("table");
    handleClickOpenDialog()
  }
  elementData[10].onClick = () => {
    setElementName('cycle');
    handleClickOpenDialog();
  };
  elementData[13].onClick = () => {
    setElementName("funnel");
    handleClickOpenDialog()
  }
  elementData[14].onClick = () => {
    setElementName("pyramid");
    handleClickOpenDialog()
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [cellWidth, setCellWidth] = useState('120');
  const [cellHeight, setCellHeight] = useState('35');
  const [elemSize, setElemSize] = useState(3);
  const [elemWidth, setElemWidth] = useState(120);
  const [steps,setSteps] = useState<number>(3);

  const handleElementData = () => {
    let newTableData: TableDetails = {
      row: +rows,
      col: +columns,
      width: +cellWidth,
      height: +cellHeight
    };

    switch (elementName) {
      case 'table':
        ContentElements.handleOpenTable(+rows, +columns, +cellWidth, +cellHeight);
        break;
      case 'funnel':
        ContentElements.handleFunnel(+elemSize, +elemWidth);
        break;
      case 'pyramid':
        ContentElements.handlePyramid(elemSize, elemWidth);
        break;
      case 'cycle':
        ContentElements.handleCycle(steps);
        break;
      default:
        break;
    }
    handleCloseDialog();
  }


  const DialogDetails = () => {

    switch (elementName) {
      case 'table':
        return (
          <Box style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <TextField
              label="Rows"
              variant="outlined"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              required
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
              label="Columns"
              variant="outlined"
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
              required
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
              label="Cell Width"
              variant="outlined"
              value={cellWidth}
              onChange={(e) => setCellWidth(e.target.value)}
              required
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
              label="Cell Height"
              variant="outlined"
              value={cellHeight}
              onChange={(e) => setCellHeight(e.target.value)}
              required
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Box>
        )
      case 'funnel':
        return (
          <Box display={'flex'} gap={'10px'} mt={'10px'}>
            <TextField
              label="Levels"
              variant="outlined"
              value={elemSize}
              onChange={(e) => setElemSize(+(e.target.value))}
              required
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
              label="Width"
              variant="outlined"
              value={elemWidth}
              onChange={(e) => setElemWidth(+(e.target.value))}
              required
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Box>
        )
      case 'pyramid':
        return (
          <Box display={'flex'} gap={'10px'} mt={'10px'}>
            <TextField
              label="Levels"
              variant="outlined"
              value={elemSize}
              onChange={(e) => setElemSize(+(e.target.value))}
              required
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
            />
            <TextField
              label="Width"
              variant="outlined"
              value={elemWidth}
              onChange={(e) => setElemWidth(+(e.target.value))}
              required
              type="number"
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Box>
        )
      case 'cycle':
        return (
          <FormControl style={{marginTop:"10px"}} fullWidth>
            <InputLabel id="demo-simple-select-label">Steps</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={steps}
              label="Steps"
              onChange={(e)=> setSteps(+e.target.value)}
            >
              <MenuItem value="">
                <em>Steps</em>
              </MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
          </FormControl>
        )
      default:
        return 'Something went wrong';
    }
  }


  const DialogTitleContent = () => {

    switch (elementName) {
      case 'table':
        return ("Please Provide Table Details: Rows, Columns, Width, and Height");
      case 'funnel':
        return "Please provide Funnel details";
      case 'pyramid':
        return "Please provide Pyramid details";
      case 'cycle':
        return "Please provide Cycle details";
      default:
        return 'Something went wrong';
    }
  }


  return (
    <BodyContainer>
      <Grid container>
        <Grid xs={2}>
          <SlideList />
        </Grid>
        <Grid xs={8}>
          <EditSlideContainer>
            <Stack direction="row" justifyContent="space-between">
              <span>
                <IconButton onClick={() => dispatch(openModal())}>
                  <img src={Delete} />
                </IconButton>
                <IconButton>
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
                <Button variant="contained" size="small">
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
                    }}
                    style={{ display: 'flex', flexDirection: 'column' }}
                    key={index}
                  >
                    <Stack direction="row" spacing={2}>
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
        {/* <CanavasVariant /> */}
        <CanvasVariant />
      </Grid>
      <Templates />
      <PopUpModal content={slide.slideKey} />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
        BackdropProps={{
          sx: { backgroundColor: 'transparent' }
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
          <Button variant="contained" type="submit" color="primary" onClick={handleElementData}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>


    </BodyContainer>
  );
};
export default CanvasBody;
