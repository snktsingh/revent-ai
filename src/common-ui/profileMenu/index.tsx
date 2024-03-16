import React, { useEffect, useRef } from 'react'
import { StyledMenu, StyledMenuItem } from './style'
import { ListItemIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import useCanvasHeader from '@/pages/canvas/canvasHeader/container';

interface ProfileMenuProps {
    anchorElForProfileMenu: null | HTMLElement;
    handleCloseProfileMenu: Function,
    setAnchorElForProfileMenu: Function
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ anchorElForProfileMenu, handleCloseProfileMenu, setAnchorElForProfileMenu }) => {
    const { userLogout } = useCanvasHeader();
    const navigate = useNavigate();
    const open = Boolean(anchorElForProfileMenu);

    const handleClose = () =>{
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