import CreateIcon from '@mui/icons-material/Create';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { customStyles, theme } from '@/constants/theme';
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export interface StyledTabProps {
  isactive: boolean;
}

export const MainSettingsContainer = styled.div`
  height: 100vh;
  padding-top: 8vh;
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-left: 7%;
  justify-content: center;
  align-items: center;
`;

export const ProfileImage = styled(Avatar)`
  && {
    width: 180px;
    height: 180px;
  }
`;

export const ProfileAvatarText = styled(Avatar)`
  && {
    width: 120px;
    height: 120px;
    background-color: ${theme.colorSchemes.light.palette.primary.main};
    font-size: 4rem;
    font-family: ${customStyles.fonts.robotoSansSerif};
    margin: 40px 40px 20px 40px;
  }
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

  ${({ isactive }) =>
    isactive &&
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
  margin: 2.2vh 8vw;
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

export const SideBar = styled.div`
  width: 23%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 4px;
`;

export const RightSideContainer = styled.div`
  width: 75%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 4px;
  padding-bottom: 0.5%;
  position: relative; /* Needed for absolute positioning of background shapes */

  /* &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px; 
    background-color: #e0e0e0; 
    z-index: -1; 
  } */

  /* &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px; 
    background-color: 
    z-index: -1; 
  } */
`;

export const ProfileImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-family: ${customStyles.fonts.robotoSansSerif};
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
  font-size: 10px;
  color: #666;
  text-transform: uppercase;
`;

export const StyledInput = styled(TextField)`
  & .MuiInputBase-input {
    /* padding-top: 12px; */
    width: 250px;
    font-size: 12px;
    height: 10px;
  }
  && {
    /* margin-top: 5px; */
  }
`;

export const StyledSelect = styled(Select)`
  & .MuiSelect-select.MuiSelect-select {
    /* padding-top: 12px; */
    width: 230px;
    font-size: 12px;
  }
  && {
    height: 45px;
  }
`;

export const SectionTitleContainer = styled.div`
  width: 100%;
  color: ${theme.colorSchemes.light.palette.primary.main};
  height: 30px;
  margin: 1.5% 0;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #e6edf8;
    z-index: -1;
  }
`;

export const SectionTitle = styled(Typography)`
  && {
    font-size: 0.8rem;
    font-weight: 550;
    font-family: ${customStyles.fonts.robotoSansSerif};
    margin: 0 0 0 2.5%;
    text-transform: uppercase;
    padding: 0.6% 0;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
`;

export const IconButton = styled(Button)`
  && {
    margin: 0 10px;
    background-color: ${theme.colorSchemes.light.palette.primary.main};
  }
`;

export const BackgroundShapeTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #e0e0e0;
  z-index: -1;
`;

export const BackgroundShapeBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #e0e0e0;
  z-index: -1;
`;

export const DiagonalShape = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to bottom right, transparent 49%, #e0e0e0 50%);
  z-index: -1;
`;
