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
  color: #333; /* Customize icon color */
  font-size: 24px; /* Set a consistent font size for all icons */
`;

export const SvgContainer = styled.span`
display: inline-block;
width: 22px; /* Adjust width and height as needed */
height: 22px;
`;
