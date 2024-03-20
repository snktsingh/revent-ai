import {
  HeaderContainer,
  StyledMenu,
  StyledMenuItem,
  UserAvatar,
  UserLink,
} from './style';
import { CanvasBack, PDF, PPT, Present, Share } from '@/constants/media';
import TitleInput from '@/constants/elements/Input';
import {
  Stack,
  Divider,
  Tooltip,
  Button,
  Menu,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputBase,
  ListItemIcon,
} from '@mui/material';
import { ButtonName, MainIconButton } from '@/constants/elements/button/style';
import VerticalDivider from '@/constants/elements/divider';
import useCanvas from '../container';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { CanvasHeaderInput } from '@/constants/elements/Input/style';
import { ContentElements } from '../canvasBody/elementData';
import { useAppSelector } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { replace } from 'lodash';
import useCanvasHeader from './container';
import ProfileMenu from '@/common-ui/profileMenu';

const MainCanvasHeader = () => {
  const navigate = useNavigate();
  const [openProfileMenu, setOpenProfileMenu] = React.useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
  const [openWarning, setOpenWarning] = React.useState(false);
  const { pptUrl } = useAppSelector(state => state.thunk);

  const handleWarningOpen = () => {
    setOpenWarning(true);
  };

  const handleWarningClose = () => {
    setOpenWarning(false);
  };
  
  const openShare = Boolean(anchorE2);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenProfileMenu(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setOpenProfileMenu(null);
  };
  const handleShareClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorE2(event.currentTarget);
  };
  const handleShareClose = () => {
    setAnchorE2(null);
  };



  return (
    <HeaderContainer>
      <MainIconButton onClick={handleWarningOpen}>
        <Stack direction="row" spacing={2}>
          <img src={CanvasBack} />
          <ButtonName>Back</ButtonName>
        </Stack>
      </MainIconButton>
      <Stack direction="row" spacing={1}></Stack>
      <CanvasHeaderInput placeholder="Untitled presentation" />
      <Stack direction="row" spacing={1}>
        <MainIconButton>
          <Stack direction="row" spacing={1}>
            <img src={Present} />
            <ButtonName onClick={() => ContentElements.openFullScreen()}>
              Present
            </ButtonName>
          </Stack>
        </MainIconButton>
        <VerticalDivider />

        <MainIconButton onClick={handleShareClick}>
          <Stack direction="row" spacing={1}>
            <img src={Share} />
            <ButtonName>Share</ButtonName>
          </Stack>
        </MainIconButton>
        <Menu
          id="Share-menu"
          anchorEl={anchorE2}
          open={openShare}
          onClose={handleShareClose}
        >
          <MenuItem onClick={handleShareClose}>
            <Stack direction="row" spacing={2}>
              <img src={PDF} width="10%" />
              <h4>Download PDF</h4>
            </Stack>
          </MenuItem>
          <MenuItem onClick={handleShareClose}>
            <Stack direction="row" spacing={2}>
              <img src={PPT} width="10%" />
              <h4>
                <a href={pptUrl} target="_blank">
                  Download PPT
                </a>
              </h4>
            </Stack>
          </MenuItem>
        </Menu>
        <MainIconButton onClick={handleClick}>
          <Stack direction="row" spacing={1}>
            <ButtonName>Rashesh Majithia</ButtonName>
            <UserAvatar>RM</UserAvatar>
          </Stack>
        </MainIconButton>
          <ProfileMenu anchorElForProfileMenu={openProfileMenu} 
          handleCloseProfileMenu={handleCloseProfileMenu} 
          setAnchorElForProfileMenu={setOpenProfileMenu}
          />
      </Stack>
      <Dialog
        open={openWarning}
        onClose={handleWarningClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you Sure ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Going back to previous page will discard the unsaved changes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWarningClose}>Cancel</Button>
          <Button onClick={() => navigate('/dashboard', { replace: true })}>
            Go Back
          </Button>
        </DialogActions>
      </Dialog>
    </HeaderContainer>
  );
};
export default MainCanvasHeader;
