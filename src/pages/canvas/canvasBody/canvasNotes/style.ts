import { theme } from '@/constants/theme';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isactive: string;
}

export const NotesBodyContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  
`;

export const AddNotesContainer = styled.div<ContainerProps>`
  width: 100%;
  height: 6vh;
  background:  ${theme.colorSchemes.light.palette.common.white};
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  transform: translateY(200%);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  z-index: -1;
  display: flex;
  align-items: center;
  ${props =>
    props.isactive === 'true' &&
    css`
      transform: translateY(0);
      transition: opacity 0.5s ease-in, transform 0.5s ease-in;
      z-index: -1;
    `}

  span {
    color: ${theme.colorSchemes.light.palette.common.darkGrey};
    text-align: center;
    font-size: 0.8rem;
    margin: 2%;
  }
`;
export const NotesHeadingContainer = styled.div`
  width: 100%;
  height: 6vh;
  background:  ${theme.colorSchemes.light.palette.common.white};
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const NotesHeading = styled.div`
  display: flex;
  align-items: center;
  width: 5vw;
  height: 100%;
  justify-content: space-around;
  margin-left: 2%;
  cursor: pointer;

  p {
    font-family: 'Roboto';
    font-weight: 600;
    font-size: 1vw;
  }

  img {
    width: 1.5vw;
    height: 1.5vw;
  }
`;

export const NotesInput = styled.input`
  border: none;
  outline: none;
  background: none;
  color: ${theme.colorSchemes.light.palette.common.darkGrey};
  font-family: 'Roboto';
  font-size: 0.8vw;
  height: 100%;
`;
