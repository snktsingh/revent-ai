import styled, { keyframes } from 'styled-components';

export const CheckboxWrapper4 = styled.div`
  margin-top: 2px;
  & * {
    box-sizing: border-box;
  }
`;

export const CbxLabel = styled.label`
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  padding: 3px 8px;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.2s ease;
  display: inline-block;

  &:not(:last-child) {
    margin-right: 6px;
  }
`;

export const CbxSpan = styled.span`
  float: left;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);

  &:first-child {
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    transform: scale(1);
    border: 1px solid #cccfdb;
    transition: all 0.2s ease;
    box-shadow: 0 1px 1px rgba(0, 16, 75, 0.05);
  }

  &:first-child svg {
    position: absolute;
    top: 3px;
    left: 2px;
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
  }

  &:last-child {
    padding-left: 8px;
    line-height: 18px;
  }

  ${CbxLabel}:hover & {
    &:first-child {
      border-color: #004fba;
    }
  }
`;

export const InpCbx = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  visibility: hidden;

  &:checked + ${CbxLabel} ${CbxSpan}:first-child {
    background: #004fba;
    border-color: #07f;
    animation: wave4 0.4s ease;
  }

  &:checked + ${CbxLabel} ${CbxSpan}:first-child svg {
    stroke-dashoffset: 0;
  }
`;

export const InlineSvg = styled.svg`
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
`;

const wave4 = keyframes`
  50% {
    transform: scale(0.9);
  }
`;

export const MediaQueryWrapper = styled.div`
  @media screen and (max-width: 640px) {
    ${CbxLabel} {
      width: 100%;
      display: inline-block;
    }
  }
`;
