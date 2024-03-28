import styled from 'styled-components';
import {
  Avatar,
  Button,
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import { useEffect, useState } from 'react';
import {
  SettingsContainer,
  GridContainer,
  InputContainer,
  MenuButton,
  NavbarContainer,
  ProfileContainer,
  ProfileDetails,
  ProfileImage,
  StyledDivider,
  StyledTab,
  StyledTabs,
  UserLink,
  SideBar,
  MainSettingsContainer,
  RightSideContainer,
  ProfileImgContainer,
  ProfileTitle,
  ChevronIcon,
  StyledInput,
  Label,
  StyledSelect,
  PencilIcon,
  SectionTitle,
  ButtonContainer,
  IconButton,
  SectionTitleContainer,
  ProfileAvatarText,
} from './style';
import { Link } from 'react-router-dom';
import { Logo } from '@/constants/media';
import {
  GridRowCenter,
  GridRowEven,
  StackColCenter,
} from '@/styles/common-styles/style';
import { ROUTES } from '@/constants/endpoint';
import { theme } from '@/constants/theme';
import ProfileMenu from '@/common-ui/profileMenu';
import ProfileSettings from './profileSettings';
import LinkedinSettings from './linkedinSettings';
import CompanyDetails from './companySettings';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getUserDetails } from '@/redux/thunk/user';
import BreadCrumb from './navigationBreadcrumb';

const UserSettings: React.FC = () => {
  const [tab, setTab] = useState(1);
  const [editMode, setEditMode] = useState(true);
  const [openProfileMenu, setOpenProfileMenu] = useState<null | HTMLElement>(
    null
    );
    const { userDetails } = useAppSelector(state => state.manageUser);
    const [isImageBroken, setIsImageBroken] = useState(false);
    const dispatch = useAppDispatch();

  const handleImageError = () => {
    setIsImageBroken(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenProfileMenu(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setOpenProfileMenu(null);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  // const TabComponents = () => {
  //   switch (tab) {
  //     case 1:
  //       return (
  //         <ProfileSettings />
  //       );
  //     case 2:
  //       return (
  //         <LinkedinSettings />
  //       );
  //     case 3:
  //       return (
  //         <CompanyDetails />
  //       );
  //     default:
  //       return (
  //         <div>
  //           {/* Default content */}
  //           <p>Default tab content</p>
  //         </div>
  //       );
  //   }
  // };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const saveEditedDetails = () => {
    setEditMode(true);
  };

  function getFirstLettersForAvatar(name: string): string {
    const initials = name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
    return initials;
  }

  useEffect(()=>{
    dispatch(getUserDetails());
  },[])

  return (
    <>
      <NavbarContainer>
        <GridContainer container spacing={2}>
          <GridRowCenter item xs={3}>
            <Link to="/">
              <img src={Logo} height="70%" />
            </Link>
          </GridRowCenter>
          <GridRowEven item xs={6}>
            <MenuButton>About Us</MenuButton>
            <MenuButton>Services</MenuButton>
            <MenuButton>Product</MenuButton>
            <MenuButton>Get in Touch</MenuButton>
          </GridRowEven>
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
      {/* main settings */}
      <MainSettingsContainer>
        <BreadCrumb/>
        <SettingsContainer>
          <SideBar>
            <ProfileImgContainer>
              {!isImageBroken ? (
                <ProfileImage
                  src="https//img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                  alt="Rashesh Majithia"
                  onError={handleImageError}
                />
              ) : (
                <ProfileAvatarText>
                  {(userDetails?.firstName || '').slice(0, 1)}
                  {(userDetails?.lastName || '').slice(0, 1)}
                </ProfileAvatarText>
              )}
              <ProfileTitle>
                {userDetails?.firstName} {userDetails?.lastName}
              </ProfileTitle>
            </ProfileImgContainer>

            <StyledTabs>
              <StyledTab
                isActive={tab === 1}
                onClick={() => setTab(1)}
                endIcon={<ChevronIcon />}
              >
                General Settings
              </StyledTab>
              {/* <StyledTab isActive={tab === 2} endIcon={<ChevronIcon />} onClick={() => setTab(2)} >Linkedin Profile</StyledTab>
              <StyledTab isActive={tab === 3} endIcon={<ChevronIcon />} onClick={() => setTab(3)} >Company Details</StyledTab> */}
            </StyledTabs>
          </SideBar>

          <RightSideContainer>
            <SectionTitleContainer>
              <SectionTitle>Personal Details</SectionTitle>
            </SectionTitleContainer>
            <ProfileSettings editMode={editMode} />
            <SectionTitleContainer>
              <SectionTitle>Company Details</SectionTitle>
            </SectionTitleContainer>
            <CompanyDetails editMode={editMode} />

            <ButtonContainer>
              <IconButton
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={saveEditedDetails}
                disabled={editMode}
              >
                Save
              </IconButton>
              <IconButton
                variant="contained"
                startIcon={editMode ? <EditIcon /> : <CancelIcon />}
                onClick={toggleEditMode}
              >
                {editMode ? 'Edit' : 'Cancel'}
              </IconButton>
            </ButtonContainer>
          </RightSideContainer>
        </SettingsContainer>
      </MainSettingsContainer>
    </>
  );
};

export default UserSettings;
