import styled from 'styled-components';

export const ToggleButtonCover = styled.div`
  display: table-cell;
  position: relative;
  width: 110px;
  height: 20px;
  box-sizing: border-box;
`;

export const ButtonCover = styled.div`
  height: 100px;
  margin: 20px;
  background-color: #fff;
  box-shadow: 0 10px 20px -8px #c5d6d6;
  border-radius: 4px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &:before {
    counter-increment: button-counter;
    content: counter(button-counter);
    position: absolute;
    right: 0;
    bottom: 0;
    color: #d7e3e3;
    font-size: 12px;
    line-height: 1;
    padding: 5px;
  }
`;

export const Button = styled.div`
  position: relative;
  top: 50%;
  width: 74px;
  height: 36px;
  margin: -20px auto 0 auto;
  overflow: hidden;
  border-radius: 100px;
`;

export const Knobs = styled.div`
  z-index: 2;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &:before {
    content: "NO";
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px;
    height: 10px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    background-color: #f44336;
    border-radius: 50%;
    transition: 0.3s ease all, right 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
  }
`;

export const Layer = styled.div`
  width: 100%;
  background-color: #fcebeb;
  transition: 0.3s ease all;
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 100px;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;

  &:active + ${Knobs}:before {
    width: 46px;
    border-radius: 100px;
  }

  &:checked:active + ${Knobs}:before {
    margin-right: 26px;
  }

  &:checked + ${Knobs}:before {
    content: "YES";
    right: 42px;
    background-color: #03a9f4;
  }

  &:checked ~ ${Layer} {
    background-color: #ebf7fc;
  }
`;

export const DIV = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: black;
  }
`;
