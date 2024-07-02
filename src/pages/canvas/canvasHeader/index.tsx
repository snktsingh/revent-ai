import ProfileMenu from '@/common-ui/profileMenu';
import { CanvasHeaderInput } from '@/constants/elements/Input/style';
import { ButtonName, MainIconButton } from '@/constants/elements/button/style';
import VerticalDivider from '@/constants/elements/divider';
import {
  Blank,
  CanvasBack,
  Logo,
  PDF,
  PPT,
  Present,
  Share,
} from '@/constants/media';
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
import { Link } from 'react-router-dom';

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
  const [isPdfDownloading, setIsPdfDownloading] = useState<boolean>(false);

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

  useEffect(() => {
    if (presentationName === '' || presentationName === undefined) {
      updatePresentationName({
        presentationId: presentationId,
        name: 'Untitled-presentation',
      });
    }
  }, []);

  const handleDownloadPresentation = async (format: string) => {
    format === 'pdf' ? setIsPdfDownloading(true) : setIsDownloading(true);
    dispatch(downloadPresentation({ pId, format }))
      .then(res => {
        const blob = new Blob([res.payload], {
          type:
            format === 'pdf'
              ? 'application/pdf'
              : 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        });
        const url = window.URL.createObjectURL(blob);
        console.log(url);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          presentationName
            ? presentationName
            : format === 'pdf'
            ? 'untitled-presentation.pdf'
            : 'untitled-presentation.pptx'
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
        setIsDownloading(false);
        setIsPdfDownloading(false);
      })
      .catch(err => {
        toast.error('Download failed', err);
      });
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <img
          src={Logo}
          width="76%"
          style={{
            background: 'white',
            padding: '0px 0px',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        />
      </Link>
      <Stack direction="row" spacing={1}></Stack>
      <Box display="flex" gap={2}>
        <CanvasHeaderInput
          placeholder="Untitled presentation"
          value={presentationName}
          style={{ width: 'auto', minWidth: '50px' }}
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
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => ContentElements.openFullScreen()}
          >
            <img src={Present} style={{ paddingRight: '8px' }} />
            <>Present</>
          </Button>
        </Stack>
        <VerticalDivider />

        <Button size="small" variant="contained" onClick={handleShareClick}>
          <Stack direction="row" spacing={1}>
            <img src={Share} style={{ paddingRight: '8px' }} />
            <>Share</>
          </Stack>
        </Button>

        {/* Share menu */}
        <ShareMenu
          id="Share-menu"
          anchorEl={anchorE2}
          open={openShare}
          onClose={handleShareClose}
        >
          <MenuItem onClick={() => handleDownloadPresentation('pdf')}>
            <Stack direction="row" spacing={2}>
              <img src={PDF} width="10%" />
              <h4>Download PDF</h4>
              {isPdfDownloading && <CircularProgress size={14} />}
            </Stack>
          </MenuItem>
          <MenuItem onClick={() => handleDownloadPresentation('pptx')}>
            <Stack direction="row" spacing={2}>
              <img src={PPT} width="10%" />
              <h4>Download PPT</h4>
              {isDownloading && <CircularProgress size={14} />}
            </Stack>
          </MenuItem>
        </ShareMenu>
        <Button size='small' variant='contained' onClick={handleClick}>
          <Stack direction="row" spacing={1}>
            <ButtonName>{`${userDetails?.firstName} ${userDetails?.lastName}`}</ButtonName>
            <UserAvatar>
              {getFirstLettersForAvatar(
                `${userDetails?.firstName} ${userDetails?.lastName}`
              )}
            </UserAvatar>
          </Stack>
        </Button> 
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
