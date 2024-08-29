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
  TextField,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { ContentElements } from '../canvasBody/elementData';
import useCanvasHeader from './container';
import { HeaderContainer, ShareMenu, UserAvatar } from './style';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { downloadPresentation, setPresentationName } from '@/redux/thunk/thunk';
import { toast } from 'react-toastify';
import CustomTourTooltip from '@/components/tourSteps/customTooltip';
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { ROUTES } from '@/constants/endpoint';
import UsePreview from '@/pages/preview/container';
import AdminCheckbox from '@/components/AdminCheckbox';

const MainCanvasHeader = ({ pId }: any) => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
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

  const { fetchPreview, fetchShareUrl, shareUrl } = UsePreview();

  const handleShareUrl = async () => {
    setOpen(true);
    fetchShareUrl();
  };

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isPdfDownloading, setIsPdfDownloading] = useState<boolean>(false);

  const { presentationId, presentationName, pptDetails, isLoading } =
    useAppSelector(state => state.thunk);
  const { tourVisible } = useAppSelector(state => state.slide);

  const { isCheckAdmin } = useAppSelector(state => state.manageUser);

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

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success('Text copied to clipboard');
      })
      .catch(err => {
        toast.error('Failed to copy text: ');
      });
  };

  return (
    <HeaderContainer>
      <Link to={ROUTES.DASHBOARD}>
        <img
          src={Logo}
          width="70%"
          style={{
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
        {/* Admin checkbox  */}
        {isCheckAdmin && <AdminCheckbox />}
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

        {/* <CustomTourTooltip tourVisible={tourVisible} tooltipContent={'share'}>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="contained"
              className="share-menu"
              onClick={handleShareClick}
            >
              <img src={Share} style={{ paddingRight: '8px' }} />
              <>Export</>
            </Button>
          </Stack>
        </CustomTourTooltip> */}

        <Button variant="contained" onClick={handleShareUrl}>
          <img src={Share} style={{ paddingRight: '8px' }} />
          Share
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">Public URL</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField
                size="small"
                fullWidth
                value={shareUrl}
                disabled
                sx={{ marginBottom: '20px' }}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  window.open(shareUrl, '_blank');
                }}
                sx={{ marginRight: '20px' }}
              >
                Open Link
              </Button>
              <Button variant="outlined" onClick={copyToClipboard}>
                Copy Link
              </Button>
            </DialogContentText>
            <Button
              fullWidth
              variant="outlined"
              sx={{ marginTop: '20px', padding: '6px 0px' }}
              onClick={() => handleDownloadPresentation('pdf')}
            >
              <img src={PDF} width="5%" style={{ marginRight: '10px' }} />
              Download PDF{' '}
              {isPdfDownloading && (
                <CircularProgress size={14} sx={{ marginLeft: '10px' }} />
              )}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ marginTop: '20px', padding: '6px 0px' }}
              onClick={() => handleDownloadPresentation('pptx')}
            >
              <img src={PPT} width="5%" style={{ marginRight: '10px' }} />
              Download PPT{' '}
              {isDownloading && (
                <CircularProgress size={14} sx={{ marginLeft: '10px' }} />
              )}
            </Button>
          </DialogContent>
        </Dialog>
        <Button size="small" variant="contained" onClick={handleClick}>
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
