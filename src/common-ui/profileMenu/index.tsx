import useCanvasHeader from '@/pages/canvas/canvasHeader/container';
import { useAppSelector } from '@/redux/store';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import { ListItemIcon, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AccountIcon,
  AccountInfo,
  AccountSection,
  EllipsisTypography,
  SectionTitle,
  StyledMenu,
  StyledMenuItem,
} from './style';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ROUTES } from '@/constants/endpoint';
interface ProfileMenuProps {
  anchorElForProfileMenu: null | HTMLElement;
  handleCloseProfileMenu: Function;
  setAnchorElForProfileMenu: Function;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  anchorElForProfileMenu,
  handleCloseProfileMenu,
  setAnchorElForProfileMenu,
}) => {
  const { userLogout } = useCanvasHeader();
  const navigate = useNavigate();
  const open = Boolean(anchorElForProfileMenu);
  const { userDetails } = useAppSelector(state => state.manageUser);

  const handleClose = () => {
    handleCloseProfileMenu();
    setAnchorElForProfileMenu(null);
  };
  const handleNavigateHome = () => {
    handleClose();
    navigate(ROUTES.APP_ROOT, { replace: true });
  };
  const handleNavigateDashboard = () => {
    handleClose();
    navigate(ROUTES.DASHBOARD, { replace: true });
  };
  const handleNavigateSettings = () => {
    handleClose();
    navigate(ROUTES.SETTINGS, { state: { prevPath: location.pathname }, replace: true });
    
  };

  const handleTutorials = () => {
    handleClose();
    navigate(ROUTES.TUTORIALS, { replace: true });
  };

  

  return (
    <StyledMenu
      id="profile-menu"
      anchorEl={anchorElForProfileMenu}
      open={open}
      onClose={handleClose}
    >
      <div>
        <SectionTitle variant="h6">Account</SectionTitle>
        <AccountSection>
          <AccountIcon sx={{ fontSize: 42 }} />
          <AccountInfo>
            <Typography variant="subtitle1">
              {userDetails?.firstName} {userDetails?.lastName}
            </Typography>
            <EllipsisTypography variant="body2" color="textSecondary">
              {userDetails?.email}
            </EllipsisTypography>
          </AccountInfo>
        </AccountSection>
      </div>
      <Divider />
      <StyledMenuItem onClick={handleNavigateHome}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        Home
      </StyledMenuItem>
      <StyledMenuItem onClick={handleNavigateDashboard}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        My Presentations
      </StyledMenuItem>
      <StyledMenuItem onClick={handleTutorials}>
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        Tutorials
      </StyledMenuItem>
      <StyledMenuItem onClick={handleNavigateSettings}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        Account Settings
      </StyledMenuItem>
      <Divider />
      <StyledMenuItem onClick={userLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        Logout
      </StyledMenuItem>
    </StyledMenu>
  );
};

export default ProfileMenu;
