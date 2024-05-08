import { customStyles, theme } from '@/constants/theme';
import { Button, styled as Mstyled } from '@mui/material';
import styled, { keyframes } from 'styled-components';

export const VariantButton = styled.div`
  position: fixed;
  top: 45%;
  right: 0px;
  cursor: pointer;
  /* transform: translate(40%, 40%) rotate(-90deg); */
  /* background: #fff;
  font-family: 'Roboto';
  border-radius: 12px 12px 0 0;
  padding: 6px 20px;
  border-top: 1px solid #dfdfdf;
  border-right: 1px solid #dfdfdf;
  border-left: 1px solid #dfdfdf; */
  color: ${theme.colorSchemes.light.palette.common.black};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  top: 45%;
  right: 0;
  transform: translate(-10%, -10%) rotate(-90deg);
  background: #fff;
  color: ${theme.colorSchemes.light.palette.common.black};
  border-radius: 12px 12px 0 0;
  padding: 6px 20px;
  border: none;
  cursor: pointer;
  font-family: ${customStyles.fonts.robotoSansSerif};
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
  font-family: ${customStyles.fonts.robotoSansSerif};
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 700;
  line-height: 0.8rem;
`;
export const VariantSlide = styled.div`
  margin: 10px 0px 15px 0px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  cursor: pointer;
  div {
    color: ${theme.colorSchemes.light.palette.common.darkGrey};
    font-family: ${customStyles.fonts.robotoSansSerif};
    font-size: 0.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
export const OriginalSlideCard = styled.div`
  margin: 10px 0px 0px 7%;
  display: flex;
  width: 90%;
  justify-content: space-around;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

`;
export const VariantSlideCard = styled.div`
  width: 90%;
  height: auto;
  flex-shrink: 0;
  border-radius: 5px;
  background: ${theme.colorSchemes.light.palette.common.border};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  align-items: center;
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
    font-family: ${customStyles.fonts.robotoSansSerif};
  }
`;


const spinnerFade = keyframes`
  0% {
    background-color: #69717d;
  }

  100% {
    background-color: transparent;
  }
`;


export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const LoaderCard = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 2px;
  background: #e8e8e8;
  width: 90%;
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  font-size: 28px;
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
`;

export const SpinnerBlade = styled.div`
  position: absolute;
  left: 0.4629em;
  bottom: 0;
  width: 0.074em;
  height: 0.2777em;
  border-radius: 0.0555em;
  background-color: transparent;
  transform-origin: center -0.2222em;
  animation: ${spinnerFade} 1s infinite linear;
`;

export const CenteredSpinner = styled(Spinner)`
  margin: auto;

  .${SpinnerBlade.styledComponentId} {
    &:nth-child(1) {
      animation-delay: 0s;
      transform: rotate(0deg);
    }
    &:nth-child(2) {
      animation-delay: 0.083s;
      transform: rotate(30deg);
    }
    &:nth-child(3) {
      animation-delay: 0.166s;
      transform: rotate(60deg);
    }
    &:nth-child(4) {
      animation-delay: 0.249s;
      transform: rotate(90deg);
    }
    &:nth-child(5) {
      animation-delay: 0.332s;
      transform: rotate(120deg);
    }
    &:nth-child(6) {
      animation-delay: 0.415s;
      transform: rotate(150deg);
    }
    &:nth-child(7) {
      animation-delay: 0.498s;
      transform: rotate(180deg);
    }
    &:nth-child(8) {
      animation-delay: 0.581s;
      transform: rotate(210deg);
    }
    &:nth-child(9) {
      animation-delay: 0.664s;
      transform: rotate(240deg);
    }
    &:nth-child(10) {
      animation-delay: 0.747s;
      transform: rotate(270deg);
    }
    &:nth-child(11) {
      animation-delay: 0.83s;
      transform: rotate(300deg);
    }
    &:nth-child(12) {
      animation-delay: 0.913s;
      transform: rotate(330deg);
    }
  }
`;