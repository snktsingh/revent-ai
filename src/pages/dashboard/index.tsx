import {
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import {
  CardContainer,
  CardLink,
  CardTitle,
  Loader,
  LoaderText,
  MainContainer,
  PreviewCard,
  Title,
} from './style';
import slideData from './data.json';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { getUserDetails } from '@/redux/thunk/user';
import { MagnifyingGlass } from 'react-loader-spinner';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import '../../../index.css';
import { theme } from '@/constants/theme';
import { IPresentation, fetchPPTList } from '@/redux/thunk/dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import useDashboard from './container';
import ProfileMenu from '@/common-ui/profileMenu';
import ThumbnailPreview from '@/common-ui/thumbnailPreview';
import { faker } from '@faker-js/faker';
import { Blank } from '@/constants/media';
import NavBar from '@/common-ui/NavBar';
import PresentationCardContextMenu from '@/common-ui/presentationContextMenu';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    open,
    openProfileMenu,
    handleCloseProfileMenu,
    handleOpenProfile,
    handleClickOpen,
    handleClose,
    setPptId,
    pptId,
    removePresentation,
    getFirstLettersForAvatar,
    setOpenProfileMenu,
  } = useDashboard();

  const { userDetails } = useAppSelector(state => state.manageUser);
  const { loadingUserDetails, pptList, hasMore } = useAppSelector(
    state => state.manageDashboard
  );

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(fetchPPTList(0));
  }, [dispatch]);

  const handleMore = async () => {
    await dispatch(fetchPPTList(1));
  };

  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredPptList =
    searchTerm.length > 0
      ? pptList.filter((ppt: IPresentation) =>
          ppt.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : pptList;

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentPresentation, setCurrentPresentation] = useState<any>(null);
  const handleContextMenu = (event: React.MouseEvent, presentation: any) => {
    event.preventDefault();
    setCurrentPresentation(presentation);
    setContextMenu(
      contextMenu === null ? { x: event.clientX, y: event.clientY } : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <>
      <NavBar />
      <MainContainer>
        <ProfileMenu
          anchorElForProfileMenu={openProfileMenu}
          handleCloseProfileMenu={handleCloseProfileMenu}
          setAnchorElForProfileMenu={setOpenProfileMenu}
        />
        <span style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title>Create a Presentation</Title>
        </span>
        <br />
        <CardContainer>
          {slideData.templates.map((slide, index) => {
            return (
              <CardTitle
                key={slide.title + index}
                onClick={() => navigate('/themes')}
              >
                <CardLink>
                  <PreviewCard>
                    <AddToQueueIcon
                      sx={{
                        fontSize: '3rem',
                        color: `${theme.colorSchemes.light.palette.primary.main}`,
                      }}
                    />
                  </PreviewCard>
                  {slide.title}
                </CardLink>
              </CardTitle>
            );
          })}
        </CardContainer>
        <br />
        <Divider />
        <br />
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Title>Recent Presentations</Title>
          <TextField
            id="outlined-basic"
            label="Search presentation"
            variant="outlined"
            size="small"
            onChange={e => setSearchTerm(e.target.value)}
          />
        </Stack>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <b>Delete Presentation ? </b>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete the current presentation ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button
              onClick={() => {
                removePresentation(pptId);
                handleClose();
              }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        {loadingUserDetails === false ? (
          <Box>
            <Box height="40vh" overflow="auto">
              <CardTitle>
                {filteredPptList.map((ppt: any, index) => {
                  return (
                    <CardLink
                      key={index}
                      onContextMenu={e => handleContextMenu(e, ppt)}
                    >
                      <Card
                        style={{
                          width: '180px',
                          height: '13vh',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onClick={() => {
                          navigate(
                            `/presentation/${
                              ppt.presentationId
                            }-${faker.string.uuid()}`
                          );
                        }}
                      >
                        {ppt.thumbnailUrl !== '' ? (
                          <img src={ppt.thumbnailUrl} width="100%" />
                        ) : (
                          <img src={Blank} width="100%" height="30%" />
                        )}
                      </Card>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        display="flex"
                        alignItems="center"
                      >
                        <p>
                          {ppt.name == undefined
                            ? 'Untitled-presentation'
                            : ppt.name}
                        </p>
                        <IconButton
                          onClick={() => {
                            handleClickOpen();
                            setPptId(ppt.presentationId);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </CardLink>
                  );
                })}
              </CardTitle>{' '}
            </Box>
            {/* <Button
              variant="outlined"
              sx={{ marginTop: '10px' }}
              onClick={handleMore}
              disabled={!hasMore} // Disable the button if no more presentations
            >
              Load more
            </Button> */}
          </Box>
        ) : (
          <Loader>
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              wrapperStyle={{}}
              wrapperClass="loader"
              glassColor="#c0efff"
              color={`${theme.colorSchemes.light.palette.primary.main}`}
            />
            <br />
            <LoaderText>
              Gathering your Spectacular Presentations. Please hold tight...
            </LoaderText>
          </Loader>
        )}
        <PresentationCardContextMenu
          anchorPoint={contextMenu || { x: 0, y: 0 }}
          isOpen={contextMenu !== null}
          onClose={handleCloseContextMenu}
          presentation={currentPresentation}
        />
      </MainContainer>
    </>
  );
};

export default Dashboard;
