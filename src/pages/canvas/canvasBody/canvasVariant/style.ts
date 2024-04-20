import { customStyles, theme } from '@/constants/theme';
import { Button, styled as Mstyled } from '@mui/material';
import styled from 'styled-components';

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
