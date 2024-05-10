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
  const { loadingUserDetails, pptList } = useAppSelector(
    state => state.manageDashboard
  );

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(fetchPPTList(0));
  }, []);

  const handleMore = async () => {
    const res = await dispatch(fetchPPTList(1));
    console.log(res.payload);
    console.log(pptList);
  };

  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredPptList =
    searchTerm.length > 0
      ? pptList.filter((ppt: IPresentation) =>
          ppt.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : pptList;

  return (
     <>
     <NavBar/>
     <MainContainer>
      {/* <Stack direction="row" display="flex" justifyContent="space-between">
        <h3>Hello {userDetails?.firstName} !</h3>
        <Button onClick={handleOpenProfile}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              sx={{
                width: 30,
                height: 30,
                fontSize: '12px',
                bgcolor: `${theme.colorSchemes.light.palette.primary.main}`,
              }}
            >
              {getFirstLettersForAvatar(
                `${userDetails?.firstName} ${userDetails?.lastName}`
              )}
            </Avatar>
            <span>{`${userDetails?.firstName} ${userDetails?.lastName}`}</span>
          </Stack>
        </Button>
      </Stack> */}
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
                  <CardLink key={index}>
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
                          `/presentation/${ppt.presentationId}-${faker.string.uuid()}`
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
          <Button
            variant="outlined"
            sx={{ marginTop: '10px' }}
            onClick={handleMore}
          >
            Load more
          </Button>
        </Box>
      ) : (
        <Loader>
          {/* No Recent Presentations */}
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
    </MainContainer>
     </>
  );
};
export default Dashboard;
