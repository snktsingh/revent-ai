import { theme } from '@/constants/theme';
import { Avatar, Link } from '@mui/material';
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
