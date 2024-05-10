import { customStyles } from '@/constants/theme';
import { Card, Input } from '@mui/material';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';

export const TemplateContainer = styled.div`
  padding: 3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding-top: 6%;
`;
export const TemplateTitle = styled.span`
  display: flex;
`;
export const Title = styled.b`
  margin: 3px 15px;
  font-size: 22px;
`;
export const ButtonContainer = styled.span`
  display: flex;
  justify-content: flex-end;
`;
export const ThemeCard = styled(Card)`
  width: 246px;
  height: 140px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;
export const ThemeCardTitle = styled.span`
  margin-bottom: 40px;
  font-weight: 500;
  margin-right: 20px;
`;
export const ThemeCardContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
`;
export const ThemeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const AddThemeCard = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;

export const AddThemeText = styled.h3`
  color: #1C274C;
  font-family: ${customStyles.fonts.robotoSansSerif};
`;

export const HeadingContainer = styled.div`
  width: 98%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1%;
`;

export const SearchBarGroup = styled.div`
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  max-width: 220px;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  line-height: 28px;
  padding: 0 1rem;
  padding-left: 2.5rem;
  border: 2px solid #f3f3f4;
  border-radius: 8px;
  outline: none;
  background-color: #fff;
  color: #0d0c22;
  transition: 0.3s ease;
  font-family: ${customStyles.fonts.robotoSansSerif};

  &::placeholder {
    color: #9e9ea7;
  }

  &:focus,
  &:hover {
    outline: none;
    border-color: rgba(0, 79, 186, 0.5);
    background-color: #fff;
    box-shadow: 0 0 0 4px rgb(0, 79, 186 / 20%);
  }
`;

export const Icon = styled(SearchIcon)`
  position: absolute;
  left: .5rem;
  fill: #9e9ea7;
  width: 1rem;
  height: 1rem;
`;

export const ThemeTitle = styled.div`
 opacity: 0.8;
 margin: .5rem 0 0 .2rem;
`;