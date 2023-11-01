import {
  Button,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
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
import { elementData } from './elementData';
import React, { useState } from 'react';
import { CanavasNotes } from './canavasNotes';
import SlideList from './slideList';
import Templates from './templates';
import { ThumbDownAltRounded } from '@mui/icons-material';
import CanvasComponent from './canvasComponent';
import { CanavasVariant } from './canvasVariant';

const CanvasBody = () => {
  const slide = useAppSelector(state => state.slide);
  const dispatch = useAppDispatch();

  const [activeLike, setActiveLike] = useState(false);
  const [activeDislike, setActiveDislike] = useState(false);

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
                    onClick={()=>{
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
          <CanavasNotes />
        </Grid>
        {/* <CanavasVariant /> */}
        <CanavasVariant />
      </Grid>
      <Templates />
      <PopUpModal content={slide.slideKey} />
    </BodyContainer>
  );
};
export default CanvasBody;
