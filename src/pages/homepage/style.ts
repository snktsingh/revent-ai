import styled from 'styled-components';
import BannerBg from '../../assets/BannerBg.png';
import LaunchBg from '../../assets/launchBg.svg';
import { Button, Drawer, Grid } from '@mui/material';
export const Title = styled.h1`
  font-size: 85px !important;
  margin: 3%;
  font-weight: 600;
`;
export const MainContainer = styled.div`
  background-image: url(${BannerBg});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 768px) {
    height: 95vh;
  }
`;

export const Description = styled.p`
  color: #2f2f2f;
  font-size: 16px;
  width: 75% !important;
  line-height: 1.9;
`;
export const ChildContainer = styled.div`
  margin: 0% 4% 5% 4%;
  height: 90vh;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  padding: 5% 10%;
  @media only screen and (max-width: 768px) {
    margin: 0% 7% 5% 7%;
    padding: 2% 2%;
    height: 100%;
  }
`;
export const LaunchContainer = styled.div`
  background-image: url(${LaunchBg});
  height: 80vh;
  background-repeat: no-repeat;
  background-size: contain;
`;
export const LightHeading = styled.p`
  font-size: 60px;
  font-weight: 200 !important;
  @media only screen and (max-width: 768px) {
    font-size: 40px;
  }
`;
export const VideoTitle = styled.p`
  font-size: 3.5rem;
  line-height: 1.2;
  text-align: left;
  font-weight: 500;
  @media only screen and (max-width: 768px) {
    font-size: 2rem;
    line-height: 1.4;
    font-weight: 500;
    text-align: center;
  }
`;
export const AboutContainer = styled.div`
  margin: 0% 4% 5% 4%;
`;
export const ContainerTitle = styled.p`
  line-height: 1.2;
  font-size: 1.5rem;
  font-weight: 500;
  @media only screen and (max-width: 768px) {
    margin: 5% 8%;
    font-size: 20px;
    line-height: 1.8;
  }
`;
export const ContainerDescription = styled.p`
  line-height: 1.8;
  color: #7c7c7c;
  font-size: 1rem;
  @media only screen and (max-width: 768px) {
    font-size: 16px;
    margin: 0% 10%;
  }
`;
export const MissionContainer = styled.span`
  width: 70%;
  display: flex;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
export const LaunchChild = styled.span`
  margin: 0% 32% !important;
  display: flex;
  line-height: 1.2;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    margin: 0% 5% !important;
  }
`;
export const LaunchHeading = styled.h1`
  font-size: 3rem;
  margin: 0%;
  font-weight: 500;
  @media only screen and (max-width: 768px) {
    font-size: 30px;
  }
`;
export const LaunchDescription = styled.p`
  font-size: 16px;
  color: #2f2f2f;
  width: 70%;
  line-height: 1.5;
`;
export const ContactContainer = styled.div`
  margin: 0% 4% 5% 4%;
  height: 90vh;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  padding: 4% 10%;
`;
export const ContactGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  @media only screen and (max-width: 768px) {
    text-align: center;
    justify-content: center;
    margin: 10% 0%;
  }
`;
export const CardContainer = styled.div`
  padding: 3% 10%;
  margin: 0% 1% 5% 4%;
`;
export const MenuButton = styled(Button)`
  color: #2f2f2f !important;
  font-weight: 400 !important;
`;
export const DesktopContainer = styled.div`
  display: block;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
export const MobileContainer = styled.div`
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
    padding: 6% 0%;
  }
`;
export const MenuMobileButton = styled(Button)`
  color: #2f2f2f !important;
  margin: 3% !important;
`;
export const MobileTitle = styled.h1`
  font-size: 38px;
`;
export const MenuDrawer = styled(Drawer)`
  width: 80% !important;
`;
export const DividerText = styled.p`
  font-size: 1.8rem;
  @media only screen and (max-width: 768px) {
    font-size: 2rem;
    font-weight: 500;
  }
`;
export const MissionQuote = styled.span`
  color: #7c7c7c;
  font-size: 1.6rem;
  line-height: 1.5;
  @media only screen and (max-width: 768px) {
    font-size: 1rem;
    padding: 5% 7%;
    line-height: 1.8;
  }
`;
export const MobileCardContainer = styled.div`
  margin: 15% 7% 5% 7%;
  height: 225vh;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  padding: 5% 10%;
`;
export const UploadTitle = styled.span`
  font-size: 6vh;
  font-weight: lighter;
`;
export const UploadContainer = styled.span`
  border-style: dashed;
  padding: 5%;
  width: 40%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 6% !important;
  cursor: pointer;
`;
export const UploadSubtitle = styled.span`
  font-size: 2.5rem;
  font-weight: 600;
`;
