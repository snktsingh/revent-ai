import { customStyles } from '@/constants/theme';
import { AccountCircleRounded } from '@mui/icons-material';
import { Menu, MenuItem, Typography } from '@mui/material';
import styled from 'styled-components';

export const StyledMenu = styled(Menu)`
  && {
    .MuiPaper-root {
      border: none;
      background-color: #ffffff;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
        rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      width: 250px;
    }
    margin-top: 0.5vh;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  && {
    font-family: ${customStyles.fonts.robotoSansSerif};
    font-size: 14px;
    padding: 8px 20px;
    color: #333333;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export const AccountSection = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px 20px 15px;
`;

export const AccountInfo = styled.div`
  margin-left: 6px;
`;

export const AccountIcon = styled(AccountCircleRounded)``;

export const SectionTitle = styled(Typography)`
  && {
    font-weight: 550;
    margin-left: 21px;
    font-size: 0.7rem;
  }
`;

export const EllipsisTypography = styled(Typography)`
  && {
    width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
