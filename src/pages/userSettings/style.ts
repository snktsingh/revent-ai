import CreateIcon from '@mui/icons-material/Create';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { theme } from '@/constants/theme';
import {
  Button,
  Divider,
  Grid,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface StyledTabProps {
  isActive?: boolean;
}

export const MainSettingsContainer = styled.div`
  height: 100vh;
  padding-top: 8vh;
`;

export const ProfileContainer = styled.div`
  width: 100%;
  height: 70%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 6%;
  margin-left: 7%;
  justify-content: center;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
`;

export const ProfileDetails = styled.div`
  margin-top: 20px;
`;

// export const InputContainer = styled.div`
//   margin-bottom: 20px;
// `;

export const StyledDivider = styled(Divider)`
  height: 100%; // Full height
  margin-left: 10px;
`;

export const StyledTabs = styled.div`
  width: 100%;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTab = styled(Button)<StyledTabProps>`
  width: 100%;
  height: 52px;
  color: #44475b !important;

  ${({ isActive }) =>
    isActive &&
    `
      background-color: #e6edf8 !important;
      color: #004FBA !important;
    `}

  &:hover {
    background-color: #e6edf8;
    color: #004fba !important;
  }
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

export const SettingsContainer = styled.div`
  height: 80%;
  margin: 7vh 8vw;
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

export const SideBar = styled.div`
  width: 25%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 4px;
`;

export const RightSideContainer = styled.div`
  width: 70%;
  height: 80%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 4px;
`;

export const ProfileImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  color: rgb(68, 71, 91);
  background: none;
`;

export const TabTitles = styled.div`
  margin-top: 3%;
  color: #4d4d4d;
`;

export const ChevronIcon = styled(ChevronRightIcon)`
  margin-left: 8px;
  :hover {
    background: none;
    background-color: none;
  }
`;

export const PencilIcon = styled(CreateIcon)`
  margin-left: 8px;
  :hover {
    background: none;
    background-color: none;
  }
`;

export const InputContainer = styled.div`
  width: 35%;
`;

export const Label = styled.div`
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
`;

export const StyledInput = styled(TextField)`
  & .MuiInputBase-input {
    padding-top: 12px;
    width: 250px;
    font-size: 16px;
  }
`;

export const StyledSelect = styled(Select)`
  & .MuiSelect-select.MuiSelect-select {
    padding-top: 12px;
    width: 260px;
    font-size: 16px;
  }
`;
