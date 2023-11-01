import { Grid, Link, Stack } from '@mui/material';
import { CopyRight, FooterContainer, GridLeft } from './style';
import {
  GridRowCenter,
  PrimaryLink,
  StackColCenter,
} from '@/styles/common-styles/style';
import Logo from '../../assets/logo.svg';
import {
  Description,
  DesktopContainer,
  MobileContainer,
} from '@/pages/homepage/style';
import Email from '../../assets/email.svg';
import Instagram from '../../assets/instagram.svg';
import Facebook from '../../assets/facebook.svg';
import Twitter from '../../assets/twitter.svg';
import Linkedin from '../../assets/linedin.svg';

const Footer = () => {
  return (
    <>
      <DesktopContainer>
        <FooterContainer>
          <GridRowCenter container spacing={2}>
            <GridLeft xs={2}>
              <Link href="/">
                <img src={Logo} height="40%" />
              </Link>
              <p>Mumbai, India</p>
            </GridLeft>
            <Grid xs={2}>
              <PrimaryLink href="#about">
                <b>About Us</b>
              </PrimaryLink>
              <p>Our Mission</p>
            </Grid>
            <GridLeft xs={2}>
              <PrimaryLink href="#about">
                <b>Our Services</b>
              </PrimaryLink>
              <p>Presentation Automation</p>
              <p>Presentation Design</p>
            </GridLeft>
            <GridLeft xs={2}>
              <PrimaryLink href="#about">
                <b>Product</b>
              </PrimaryLink>
              <p>Try Now</p>
              <p>See How It Works</p>
            </GridLeft>
            <GridLeft xs={2}>
              <PrimaryLink href="#about">
                <b>Contact Us</b>
              </PrimaryLink>
              <br />
              <br />
              <Stack direction="row" spacing={1}>
                <img src={Email} />
                <a href="mailto:">support@revent.ai</a>
              </Stack>
              <br />
              <Stack direction="row" spacing={2}>
                <img src={Instagram} />
                <img src={Facebook} />
                <img src={Twitter} />
                <img src={Linkedin} />
              </Stack>
            </GridLeft>
          </GridRowCenter>
          <br />
          <br />
          <br />
          <CopyRight>2023 © Revent.ai | All Rights Reserved</CopyRight>
        </FooterContainer>
      </DesktopContainer>
      <MobileContainer>
        <FooterContainer>
          <Link href="/">
            <img src={Logo} height="40%" />
          </Link>
          <p>Mumbai, India</p>
          <br />
          <PrimaryLink href="#about">
            <b>About Us</b>
          </PrimaryLink>
          <p>Our Mission</p>
          <br />
          <PrimaryLink href="#about">
            <b>Our Services</b>
          </PrimaryLink>
          <p>Presentation Automation</p>
          <p>Presentation Design</p>
          <br />
          <PrimaryLink href="#about">
            <b>Product</b>
          </PrimaryLink>
          <p>Try Now</p>
          <p>See How It Works</p>
          <br />
          <PrimaryLink href="#about">
            <b>Contact Us</b>
          </PrimaryLink>
          <br />
          <Stack
            direction="row"
            spacing={1}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <img src={Email} />
            <a href="mailto:">support@revent.ai</a>
          </Stack>
          <br />
          <Stack
            direction="row"
            spacing={2}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <img src={Instagram} />
            <img src={Facebook} />
            <img src={Twitter} />
            <img src={Linkedin} />
          </Stack>
        </FooterContainer>
      </MobileContainer>
    </>
  );
};
export default Footer;
