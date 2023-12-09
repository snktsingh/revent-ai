import { theme } from '@/constants/theme';
import { Button, styled as Mstyled } from '@mui/material';
import styled from 'styled-components';

export const VariantButton = styled.button`
  position: fixed;
  bottom: 45%;
  right: 0px;
  cursor: pointer;
  transform: translate(40%, 40%) rotate(-90deg);
  background: #fff;
  font-family: 'Roboto';
  border-radius: 12px 12px 0 0;
  padding: 6px 20px;
  border-top: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  border-left: 1px solid #dfdfdf;
`;
export const DrawerMainContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  margin-left: 7%;
`;
export const DrawerBtnContainer = styled.div`
  width: 20%;
  height: 100%;
`;
export const DrawerVariantButton = styled.button`
  position: relative;
  top: 41%;
  right: 0;
  transform: translate(-10%, -10%) rotate(-90deg);
  background: #fff;
  color: #2f2f2f;
  font-weight: 600;
  border-radius: 12px 12px 0 0;
  padding: 6px 20px;
  border: none;
`;
export const DrawerVariant = styled.div`
  width: 80%;
  height: 100%;
  background: ${theme.colorSchemes.light.palette.common.white};
  padding: 4px;

  overflow-y: scroll;
`;
export const Text = styled.p`
  opacity: 50%;
  margin: 1rem 0px 0px 1rem;
  color: #222222;
  font-family: 'Roboto';
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 700;
  line-height: 0.8rem;
`;
export const VariantSlide = styled.div`
  margin: 10px 0px 0px 0px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  div {
    color: ${theme.colorSchemes.light.palette.common.darkGrey};
    font-family: 'Roboto';
    font-size: 0.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
export const VariantSlideCard = styled.div`
  width: 90%;
  height: 12vh;
  flex-shrink: 0;
  border-radius: 5px;
  background: ${theme.colorSchemes.light.palette.common.border};
`;
export const ButtonContainer = styled.div`
  width: 90%;
  margin: 3px 0 0 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    opacity: 50%;
    color: #222222;
    font-size: 0.7rem;
  }
`;
export const RefreshBtn = Mstyled(Button)`
    font-size: 0.7rem;
        
`;
export const LogoContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 40%;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
  }
  img {
    width: 50%;
    height: 15px;
    flex-shrink: 0;
  }
  span {
    color: #a8a8a8;
    font-size: 0.6rem;
    font-weight: 500;
    font-family: sans-serif;
  }
`;
