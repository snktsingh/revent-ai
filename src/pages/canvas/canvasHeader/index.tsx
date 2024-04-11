import ProfileMenu from '@/common-ui/profileMenu';
import { CanvasHeaderInput } from '@/constants/elements/Input/style';
import { ButtonName, MainIconButton } from '@/constants/elements/button/style';
import VerticalDivider from '@/constants/elements/divider';
import { CanvasBack, PDF, PPT, Present, Share } from '@/constants/media';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  Stack,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { ChangeEvent } from 'react';
import { ContentElements } from '../canvasBody/elementData';
import useCanvasHeader from './container';
import { HeaderContainer, UserAvatar } from './style';
import { useAppDispatch, useAppSelector } from '@/redux/store';

const MainCanvasHeader = ({ pId }: any) => {
  const dispatch = useAppDispatch();
  const {
    userLogout,
    openShare,
    getFirstLettersForAvatar,
    navigate,
    openProfileMenu,
    setOpenProfileMenu,
    anchorE2,
    setAnchorE2,
    openWarning,
    setOpenWarning,
    pptUrl,
    presentationTitle,
    userDetails,
    handleWarningClose,
    handleWarningOpen,
    handleClick,
    handleCloseProfileMenu,
    handleShareClick,
    handleShareClose,
    handleInputChange,
    updatePresentationName,
    updateResponse,
  } = useCanvasHeader();

  const { presentationId, presentationName, pptDetails } = useAppSelector(
    state => state.thunk
  );

  return (
    <HeaderContainer>
      <MainIconButton onClick={handleWarningOpen}>
        <Stack direction="row" spacing={2}>
          <img src={CanvasBack} />
          <ButtonName>Back</ButtonName>
        </Stack>
      </MainIconButton>
      <Stack direction="row" spacing={1}></Stack>
      <CanvasHeaderInput
        placeholder="Untitled presentation"
        value={presentationName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleInputChange(e);
          setTimeout(() => {
            updatePresentationName({
              presentationId: presentationId,
              name: presentationName,
            });
            navigate(`/canvas/${presentationId}-${presentationName}`);
          }, 2000);
        }}
      />
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
            <ButtonName>{`${userDetails?.firstName} ${userDetails?.lastName}`}</ButtonName>
            <UserAvatar>
              {getFirstLettersForAvatar(
                `${userDetails?.firstName} ${userDetails?.lastName}`
              )}
            </UserAvatar>
          </Stack>
        </MainIconButton>
        <ProfileMenu
          anchorElForProfileMenu={openProfileMenu}
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
