import {
  AppBar,
  Avatar,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import {
  BlankImageCard,
  CardContainer,
  CardLink,
  CardSpan,
  CardTitle,
  Loader,
  LoaderText,
  MainContainer,
  NewPPTCard,
  PPTCard,
  PPTTitle,
  PreviewCard,
  ThumbnailCard,
  Title,
  TitleCard,
} from './style';
import slideData from './data.json';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import '../../../index.css';
import { theme } from '@/constants/theme';
import {
  IPresentation,
  fetchPPTList,
  fetchPresets,
  togglePresetOpened,
} from '@/redux/thunk/dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import useDashboard from './container';
import ProfileMenu from '@/common-ui/profileMenu';
import ThumbnailPreview from '@/common-ui/thumbnailPreview';
import { faker } from '@faker-js/faker';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  Blank,
  CancelUpload,
  Create,
  DeleteFile,
  DocUpload,
  Empty,
  Favicon,
  Folder,
  Logo,
  Proceed,
  Think,
  UploadTick,
} from '@/constants/media';
import NavBar from '@/common-ui/NavBar';
import PresentationCardContextMenu from '@/common-ui/presentationContextMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardBox, UploadSubtitle } from '../homepage/style';
import { setSelectedDocFile } from '@/redux/reducers/theme';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MuiDrawer from '@mui/material/Drawer';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AddHomeIcon from '@mui/icons-material/AddHome';
import {
  AddHomeOutlined,
  AdminPanelSettings,
  AutoStories,
  AutoStoriesOutlined,
  CollectionsBookmark,
  DashboardCustomizeOutlined,
  ManageAccounts,
  ManageAccountsOutlined,
} from '@mui/icons-material';
import HomeContent from './home';
import Tutorials from '../tutorials';
import UserSettings from '../userSettings';
import { ROUTES } from '@/constants/endpoint';
import MyLibrary from './library';
interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const Dashboard = ({ onFileSelect }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    isDeletePptAlertOpen,
    openProfileMenu,
    handleCloseProfileMenu,
    handleOpenProfile,
    handleDeletePpt,
    handleClose,
    setPptId,
    pptId,
    removePresentation,
    getFirstLettersForAvatar,
    setOpenProfileMenu,
    handlePptDelCheckBox,
    fetchPreset,
  } = useDashboard();

  const { userDetails } = useAppSelector(state => state.manageUser);
  const { loadingUserDetails, pptList, presetList } = useAppSelector(
    state => state.manageDashboard
  );
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentPresentation, setCurrentPresentation] = useState<any>(null);
  useEffect(() => {
    dispatch(fetchPPTList(0));
    dispatch(fetchPresets());

    function handleClick(e: any) {
      if (contextMenuRef.current) {
        if (
          !contextMenuRef.current.contains(e.target) &&
          e.target.id !== 'more_menu'
        ) {
          setContextMenu(null);
        }
      }
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleMore = async () => {
    await dispatch(fetchPPTList(1));
  };

  // const filteredPptList =
  //   searchTerm.length > 0
  //     ? pptList.filter((ppt: IPresentation) =>
  //         ppt.name.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     : pptList;

  const inputRef = React.createRef<HTMLInputElement>();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selected = files[0];
      setSelectedFile(selected);
      dispatch(setSelectedDocFile(selected));
      onFileSelect(selected);
    }
  };

  const handleDocsPPt = async () => {
    navigate('/themes');
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const drawerWidth = 240;

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open',
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }));

  const router = useLocation();

  const [pathName, setPathName] = useState<string>('');

  useEffect(() => {
    setPathName(router.pathname.slice(1));
  }, [router]);

  const handleNavigation = (value: number) => {
    if (value === 0) {
      navigate(`${ROUTES.DASHBOARD}`);
    } else if (value === 1) {
      navigate(`${ROUTES.LIBRARY}`);
    } else if (value === 2) {
      navigate(`${ROUTES.TUTORIALS}`);
    } else if (value === 3) {
      navigate(`${ROUTES.SETTINGS}`);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <CssBaseline />
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            border: 'none',
            background: '#1a1a1a',
          },
        }}
      >
        <DrawerHeader>
          <Box
            sx={{
              marginTop: '10px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {open && (
              <img
                src={Logo}
                width="50%"
                style={{
                  background: 'white',
                  padding: '0px 10px',
                  borderRadius: '10px',
                }}
              />
            )}
            {open && (
              <IconButton onClick={handleDrawerClose}>
                {theme.direction !== 'rtl' ? (
                  <ChevronLeftIcon sx={{ color: 'white' }} />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            )}
            {!open && (
              <span
                style={{
                  padding: '12px 16px 10px',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  background: `${theme.palette.common.background}`,
                }}
                onClick={handleDrawerOpen}
              >
                <img src={Favicon} />
              </span>
            )}{' '}
          </Box>
        </DrawerHeader>
        <List>
          {['Home', 'My Library', 'Tutorials', 'Account Settings'].map(
            (text, index) => (
              <ListItem
                key={text}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '4px 12px',
                  '&:hover .MuiListItemText-root': {
                    background:
                      'linear-gradient(55.96deg, #004FBA 13.4%, #002454 89.54%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: 'none',
                  },
                  border: 'none',
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 2,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => handleNavigation(index)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index === 0 && (
                      <DashboardCustomizeIcon
                        fontSize="small"
                        sx={{ color: 'white' }}
                      />
                    )}
                    {index === 1 && (
                      <AddHomeIcon fontSize="small" sx={{ color: 'white' }} />
                    )}
                    {index === 2 && (
                      <CollectionsBookmark
                        fontSize="small"
                        sx={{ color: 'white' }}
                      />
                    )}
                    {index === 3 && (
                      <AdminPanelSettings
                        fontSize="small"
                        sx={{ color: 'white' }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: '#d9d9d9',
                      transition: 'color 0.3s ease',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          m: 2,
          background: 'white',
          borderRadius: '20px',
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
          display: 'flex',
          flexDirection: 'column',
          width: '100vh',
        }}
      >
        <Box sx={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
          <img src={Logo} width="10%" />
          <h3> | Your Personal AI WorkSpace</h3>
          <img src={Think} width="2%" />
        </Box>
        <Box>
          <p style={{ margin: '4px', fontSize: '16px', textAlign:"center" }}>
            Transform with AI, start with a blank presenation or import an
            existing PowerPoint.
          </p>
        </Box>
        {pathName === 'my-presentations' && <HomeContent />}
        {pathName === 'my-library' && <MyLibrary />}
        {pathName === 'tutorials' && <Tutorials />}
        {pathName === 'settings' && <UserSettings />}
      </Box>
    </Box>
  );
};

export default Dashboard;
