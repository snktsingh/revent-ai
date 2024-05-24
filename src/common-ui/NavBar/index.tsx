import React, { useEffect, useState } from 'react'
import { GridContainer, GridRowEven, MenuButton, NavbarContainer, StackColCenter } from './style'
import { GridRowCenter } from '@/styles/common-styles/style'
import { Link } from 'react-router-dom'
import { Logo } from '@/constants/media'
import { Avatar, Button } from '@mui/material'
import ProfileMenu from '../profileMenu'
import { theme } from '@/constants/theme';
import { IUserAccountDetails } from '@/interfaces/authInterface'
import { useAppDispatch, useAppSelector } from '@/redux/store'

const initialUserDetails = {
    id: null,
    login: '',
    firstName: '',
    lastName: '',
    email: '',
    imageUrl: 'http://placehold.it/50x50',
    activated: true,
    langKey: 'en',
    createdBy: '',
    createdDate: '',
    lastModifiedBy: '',
    lastModifiedDate: '',
    authorities: [''],
    linkedIn: '',
    phone: '',
    companyName: '',
    companySize: '',
    companyRole: '',
    termsConditionId: null,
    userCredit: null,
}

const NavBar = () => {
    const [openProfileMenu, setOpenProfileMenu] = useState<null | HTMLElement>(
        null
    );
    const { userDetails } = useAppSelector( state => state.manageUser);
    // const [userDetails, setUserDetails] = useState<IUserAccountDetails>(initialUserDetails);
    const dispatch = useAppDispatch();
    function getFirstLettersForAvatar(name: string): string {
        const initials = name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('');
        return initials;
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenProfileMenu(event.currentTarget);
    };

    const handleCloseProfileMenu = () => {
        setOpenProfileMenu(null);
    };




    return (
        <NavbarContainer>
            <GridContainer container spacing={2}>
                <GridRowCenter item xs={3}>
                    <Link to="/">
                        <img src={Logo} height="70%" />
                    </Link>
                </GridRowCenter>
                {/* <GridRowEven item xs={6}>
                    <MenuButton>About Us</MenuButton>
                    <MenuButton>Services</MenuButton>
                    <MenuButton>Product</MenuButton>
                    <MenuButton>Get in Touch</MenuButton>
                </GridRowEven> */}
                <GridRowCenter xs={3}>
                    <StackColCenter direction="row" spacing={3}>
                        <Button onClick={handleClick}>
                            <Avatar
                                sx={{
                                    fontSize: '12px',
                                    width: 28,
                                    height: 28,
                                    marginRight: '10px',
                                    bgcolor: `${theme.colorSchemes.light.palette.primary.main}`,
                                }}
                            >
                                {getFirstLettersForAvatar(`${userDetails?.firstName} ${userDetails?.lastName}`)}
                            </Avatar>
                            {userDetails?.firstName} {userDetails?.lastName}
                        </Button>
                        <ProfileMenu
                            anchorElForProfileMenu={openProfileMenu}
                            handleCloseProfileMenu={handleCloseProfileMenu}
                            setAnchorElForProfileMenu={setOpenProfileMenu}
                        />
                    </StackColCenter>
                </GridRowCenter>
            </GridContainer>
        </NavbarContainer>
    )
}

export default NavBar