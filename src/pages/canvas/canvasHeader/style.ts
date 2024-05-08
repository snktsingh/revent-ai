import { customStyles, theme } from '@/constants/theme';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  background-color: ${theme.colorSchemes.light.palette.primary.main};
  height: 7vh;
  display: flex;
  padding: 0% 1%;
  align-items: center;
  justify-content: space-between;
`;
export const Extension = styled.p`
  color: ${theme.colorSchemes.light.palette.common.white};
  margin-top: 4px !important;
  font-size: 2vh;
`;
export const UserAvatar = styled(Avatar)`
  background-color: ${theme.colorSchemes.light.palette.common.white} !important;
  color: ${theme.colorSchemes.light.palette.primary.main} !important;
  width: 3.5vh !important;
  height: 3.5vh !important;
  font-size: 1.5vh !important;
  display: flex;
  align-items: center;
`;
export const UserLink = styled(Link)`
  text-decoration: none !important;
  color: ${theme.colorSchemes.light.palette.common.darkGrey} !important;
`;

export const StyledMenu = styled(Menu)`
  && {
    .MuiPaper-root {
      border: 1px solid #d3d4d5;
      background-color: #ffffff;
    }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  && {
    font-family: ${customStyles.fonts.robotoSansSerif};
    font-size: 14px;
    padding: 10px 20px;
    color: #333333;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export const ShareMenu = styled(Menu)`
 && {
    .MuiPaper-root {
       width: 15%;
    }
  }
`;