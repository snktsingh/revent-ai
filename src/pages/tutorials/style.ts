import { customStyles } from '@/constants/theme';
import { Tab, Typography } from '@mui/material';
import styled from 'styled-components';

export const TutorialContainer = styled.div`
  width: 100%;
  height: 85vh;
  padding-top: 4vh;
  font-family: ${customStyles.fonts.robotoSansSerif};
`;

export const TutorialHeading = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  /* margin-left: 6%; */
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  margin: auto;
`;

export const LeftContainer = styled.div`
  width: 35%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 3px;
  overflow-y: auto;

  /* Scrollbar styles */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #004099;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #004fba;
  }
`;

export const RightContainer = styled.div`
  width: 60%;
  height: 60vh;
  background-color: #f5f5f5;
  border-radius: 1px;
`;

export const StyledTabs = styled.div`
  width: 100%;
  height: 100%;
`;

interface StyledTabProps {
  isActive: boolean;
}

export const StyledTab = styled.div<StyledTabProps>`
  border: 1px solid #ccc;
  padding: 10px;
  color: #787878;
  width: 95%;
  margin: 10px;
  font-size: 0.9rem;
  ${props =>
    props.isActive &&
    `
        background-color: #f5f5f5;
        color: #004099;
        border-left : 5px solid #004FBA;
    `}

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
    color: #004099;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

export const VideoTitle = styled.p`
  font-size: 1.2rem;
  width: 100%;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
  padding: 1rem;
`;

export const HeaderContainer = styled.div`
  width: 87%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
