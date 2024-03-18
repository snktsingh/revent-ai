import React, { useEffect, useRef } from 'react'
import { AccountIcon, AccountInfo, AccountSection, EllipsisTypography, SectionTitle, StyledMenu, StyledMenuItem } from './style'
import { ListItemIcon, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import useCanvasHeader from '@/pages/canvas/canvasHeader/container';
import { AccountCircleRounded } from '@mui/icons-material';
import Divider from '@mui/material/Divider';


interface ProfileMenuProps {
    anchorElForProfileMenu: null | HTMLElement;
    handleCloseProfileMenu: Function,
    setAnchorElForProfileMenu: Function
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ anchorElForProfileMenu, handleCloseProfileMenu, setAnchorElForProfileMenu }) => {
    const { userLogout } = useCanvasHeader();
    const navigate = useNavigate();
    const open = Boolean(anchorElForProfileMenu);

    const handleClose = () => {
        handleCloseProfileMenu();
        setAnchorElForProfileMenu(null);
    }
    const handleNavigateHome = () => {
        handleClose();
        navigate('/', { replace: true });
    };
    const handleNavigateSettings = () => {
        handleClose();
        navigate('/settings', { replace: true });
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
                <AccountIcon sx={{ fontSize: 42 }}/>
                
                <AccountInfo>
                    <Typography variant="subtitle1">Rashesh Majithia</Typography>
                    <EllipsisTypography variant="body2" color="textSecondary">admin@localhost</EllipsisTypography>
                </AccountInfo>
            </AccountSection>
            </div>
            <Divider/>
            <StyledMenuItem onClick={handleNavigateHome}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                Home
            </StyledMenuItem>
            <StyledMenuItem onClick={handleNavigateSettings}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                Account Settings
            </StyledMenuItem>
            <Divider/>
            <StyledMenuItem onClick={userLogout}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                Logout
            </StyledMenuItem>
        </StyledMenu>
    )
}

export default ProfileMenu