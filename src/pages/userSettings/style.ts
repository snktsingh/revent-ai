import { theme } from '@/constants/theme';
import { Button, Divider, Grid, Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SettingsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;
  padding-top: 8vh;
`;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-left: 20%;
  width: 100%;
  border: '1px solid red';
`;

export const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

export const ProfileDetails = styled.div`
  margin-top: 20px;
`;

export const InputContainer = styled.div`
  margin-bottom: 20px;
`;

export const StyledDivider = styled(Divider)`
  height: 100%; // Full height
  margin-left: 10px;
`;

export const StyledTabs = styled(Tabs)`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTab = styled(Tab)`
  text-align: center;
  width: 100%;
  padding: 10px 0;
`;

export const MenuButton = styled(Button)`
  color: #2f2f2f !important;
  font-weight: 400 !important;
`;

export const UserLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colorSchemes.light.palette.primary.main};
`;

export const NavbarContainer = styled.div`
  position: fixed;
  width: 100%;
  background-color: ${theme.colorSchemes.light.palette.common.white};
  height: 8vh;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  display: flex;
  align-items: center;
  z-index: 999;
`;

export const GridContainer = styled(Grid)`
  margin: 0px !important;
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
