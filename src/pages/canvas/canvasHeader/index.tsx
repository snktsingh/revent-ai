import ProfileMenu from '@/common-ui/profileMenu';
import { CanvasHeaderInput } from '@/constants/elements/Input/style';
import { ButtonName, MainIconButton } from '@/constants/elements/button/style';
import VerticalDivider from '@/constants/elements/divider';
import { Blank, CanvasBack, PDF, PPT, Present, Share } from '@/constants/media';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  Stack,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { ContentElements } from '../canvasBody/elementData';
import useCanvasHeader from './container';
import { HeaderContainer, ShareMenu, UserAvatar } from './style';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { downloadPresentation, setPresentationName } from '@/redux/thunk/thunk';
import { toast } from 'react-toastify';

const MainCanvasHeader = ({ pId }: any) => {
  const dispatch = useAppDispatch();
  const {
    openShare,
    getFirstLettersForAvatar,
    openProfileMenu,
    setOpenProfileMenu,
    anchorE2,
    openWarning,
    pptUrl,
    userDetails,
    handleWarningClose,
    handleWarningOpen,
    handleClick,
    handleCloseProfileMenu,
    handleShareClick,
    handleShareClose,
    updatePresentationName,
    isUpdating,
    handleGoBack,
    handleInputChange,
  } = useCanvasHeader();

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const { presentationId, presentationName, pptDetails, isLoading } =
    useAppSelector(state => state.thunk);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updatePresentationName({
        presentationId: presentationId,
        name: presentationName,
      });
      event.currentTarget.blur();
    }
  };

  const handleDownloadPresentation = async () => {
    setIsDownloading(true);
    dispatch(downloadPresentation(pId))
      .then(res => {
        const blob = new Blob([res.payload], {
          type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          presentationName ? presentationName : 'untitled-presentation.pptx'
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
        setIsDownloading(false);
      })
      .catch(err => {
        toast.error('Download failed', err);
      });
  };

  return (
    <HeaderContainer>
      <MainIconButton onClick={handleGoBack}>
        <Stack direction="row" spacing={2}>
          <img src={CanvasBack} />
          <ButtonName>Back</ButtonName>
        </Stack>
      </MainIconButton>
      <Stack direction="row" spacing={1}></Stack>
      <Box display="flex" gap={2}>
        <CanvasHeaderInput
          placeholder="Untitled presentation"
          value={presentationName}
          onKeyDown={handleKeyDown}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(setPresentationName(e.target.value));
            handleInputChange(e);
          }}
        />
        {isUpdating && (
          <CircularProgress
            size={20}
            disableShrink
            style={{ color: 'white', alignSelf: 'center' }}
          />
        )}
      </Box>
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

        {/* Share menu */}
        <ShareMenu
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
          <MenuItem onClick={handleDownloadPresentation}>
            <Stack direction="row" spacing={2}>
              <img src={PPT} width="10%" />
              <h4>Download PPT</h4>
              {isDownloading && <CircularProgress size={14} />}
            </Stack>
          </MenuItem>
        </ShareMenu>
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
          <Button onClick={handleGoBack}>Go Back</Button>
        </DialogActions>
      </Dialog>
    </HeaderContainer>
  );
};
export default MainCanvasHeader;
