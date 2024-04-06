import { theme } from '@/constants/theme';
import styled from 'styled-components';

export const EditBarContainer = styled.div<{ left: number; top: number }>`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  background: white;
  padding: 2px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  z-index: 1;
  border-radius: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 10px;
    border-right: 1px solid #ccc;
    padding-right: 10px;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 24px;
`;

export const SvgContainer = styled.span`
  display: inline-block;
  width: 22px;
  height: 22px;
`;

export const CheckboxContainer = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 12px;
  user-select: none;
  padding: 2px 5px;
  
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  .checkmark {
    border: 1px solid #000;
    position: relative;
    top: 0;
    left: 0;
    height: 1.6em;
    width: 1.6em;
    border-radius: 50%;
    background: #ffeded38;
    transition: all 0.2s ease;
    opacity: 0.4;
  }
  
  input:checked ~ .checkmark {
    background: ${theme.colorSchemes.light.palette.primary.main};
    opacity: 0.9;
    border: none;
    transition: all 0.2s ease;
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    left: 0.61em;
    top: 0.43em;
    width: 0.25em;
    height: 0.5em;
    border: solid rgb(255, 255, 255);
    border-width: 0 0.15em 0.15em 0;
    transform: rotate(45deg);
  }
`;
