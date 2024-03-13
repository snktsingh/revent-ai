import styled from 'styled-components';
import { Avatar, Button, Divider, IconButton, Tab, Tabs, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import { useState } from 'react';
import { SettingsContainer, GridContainer, InputContainer, MenuButton, NavbarContainer, ProfileContainer, ProfileDetails, ProfileImage, StyledDivider, StyledTab, StyledTabs, UserLink } from './style';
import { Link } from 'react-router-dom';
import { Logo } from '@/constants/media';
import { GridRowCenter, GridRowEven, StackColCenter } from '@/styles/common-styles/style';
import { ROUTES } from '@/constants/endpoint';
import { theme } from '@/constants/theme';


const UserSettings: React.FC = () => {
  const [firstName, setFirstName] = useState('Admin');
  const [lastName, setLastName] = useState('One');
  const [email, setEmail] = useState('admin@localhost.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [editMode, setEditMode] = useState(false);
  const [tab, setTab] = useState(0);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    // Add functionality to save changes
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

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
            <MenuButton >Home</MenuButton>
            <MenuButton >My Presentations</MenuButton>
            <MenuButton>Dashboard</MenuButton>
          </GridRowEven>
          <GridRowCenter xs={3}>
            <StackColCenter direction="row" spacing={3}>
              <Link to={ROUTES.DASHBOARD}>
                <Button>
                  <Avatar
                    sx={{
                      fontSize: '12px',
                      width: 28,
                      height: 28,
                      marginRight: '10px',
                      bgcolor: `${theme.colorSchemes.light.palette.primary.main}`,
                    }}
                  >
                    RM
                  </Avatar>
                  Rashesh Majithia
                </Button>
              </Link>
            </StackColCenter>
          </GridRowCenter>
        </GridContainer>
      </NavbarContainer>
      <SettingsContainer>
        <StyledTabs value={tab} onChange={handleTabChange} orientation="vertical">
          <StyledTab icon={<SettingsIcon />} label="General Settings" />
          <StyledTab icon={<PrivacyTipIcon />} label="Privacy Settings" />
        </StyledTabs>
        <StyledDivider orientation="vertical" flexItem />
        <div>
          {tab === 0 && (
            <ProfileContainer>
              <ProfileDetails>
                <div>
                  <strong>Edit</strong>
                  {editMode ? (
                    <IconButton onClick={handleSave}>
                      Save
                    </IconButton>
                  ) : (
                    <IconButton onClick={handleEdit}>
                      <EditIcon />
                    </IconButton>
                  )}
                </div>
                <InputContainer>
                  <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!editMode}
                  />
                </InputContainer>
                <InputContainer>
                  <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={!editMode}
                  />
                </InputContainer>
                <InputContainer>
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!editMode}
                  />
                </InputContainer>
                <InputContainer>
                  <TextField
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!editMode}
                  />
                </InputContainer>
              </ProfileDetails>
              <ProfileImage src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg" alt="Profile" />
            </ProfileContainer>
          )}
          {tab === 1 && (
            <div>

            </div>
          )}
        </div>
      </SettingsContainer>
    </>
  );
};

export default UserSettings;