import { Wrapper } from '@/layout/AppLayout/style';
import Banner from '../../assets/bannerSub.svg';
import * as React from 'react';
import {
  AboutContainer,
  CardContainer,
  ChildContainer,
  ContactContainer,
  ContactGrid,
  ContainerDescription,
  ContainerTitle,
  Description,
  DesktopContainer,
  DividerText,
  LaunchChild,
  LaunchContainer,
  LaunchDescription,
  LaunchHeading,
  MainContainer,
  MenuButton,
  MenuDrawer,
  MenuMobileButton,
  MissionContainer,
  MissionQuote,
  MobileCardContainer,
  MobileContainer,
  UploadContainer,
  UploadSubtitle,
  UploadTitle,
  VideoTitle,
} from './style';
import { useForm, ValidationError } from '@formspree/react';
import Menu from '../../assets/menu.svg';
import { Box, Button, CardMedia, Grid, Stack, TextField } from '@mui/material';
import {
  CustomButton,
  CustomDivider,
  CustomOutlinedButton,
  GridJustify,
  GridRowCenter,
  GridRowEven,
  InfoContainer,
  PrimaryText,
  StackColCenter,
} from '@/styles/common-styles/style';
import homePageData from '../../data/homepage.json';
import Video from '../../assets/revent.mp4';
import Clients from '../../assets/clients.svg';
import Build from '../../assets/build.svg';
import Reinventing from '../../assets/reinventing.svg';
import Quote from '../../assets/quote.svg';
import { theme } from '@/constants/theme';
import { GridContainer, HeaderContainer } from '@/common-ui/header/style';
import Contact from '../../assets/contactSide.svg';
import CustomCard from '@/common-ui/animationCard';
import { useRef } from 'react';
import useRedirect from '../container';
import Logo from '../../assets/logo.svg';
import '../../styles/base/base.css';
import HeroText from '../../assets/heroText.gif';
import Link from '@mui/material/Link';
import { UserLink } from '../canvas/canvasHeader/style';
import { ToastContainer, toast } from 'react-toastify';
import { Folder, Scratch, Wand } from '@/constants/media';

const Home = () => {
  const [data, handleSubmit] = useForm('mbjvbjvd');
  const [data2, handleEmailSubmit] = useForm('xrgwdbzz');

  const {
    aboutRef,
    servicesRef,
    ContactRef,
    mAboutRef,
    mContactRef,
    mServicesRef,
    handleMAbout,
    handleMContact,
    handleMServices,
    handleAbout,
    handleServices,
    handleContact,
  } = useRedirect();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  type Anchor = 'top' | 'left' | 'bottom' | 'right';

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keyRight' &&
        ((event as React.KeyboardEvent).key === '' ||
          (event as React.KeyboardEvent).key === '')
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };
  const workingRef = useRef<HTMLDivElement>(null);
  const handleWorking = () => {
    if (workingRef.current) {
      workingRef.current.scrollIntoView();
    }
  };
  const mWorkingRef = useRef<HTMLDivElement>(null);
  const handleMWorking = () => {
    if (mWorkingRef.current) {
      mWorkingRef.current.scrollIntoView();
    }
  };
  const tryRef = useRef<HTMLDivElement>(null);
  const handleTry = () => {
    if (tryRef.current) {
      tryRef.current.scrollIntoView();
    }
  };

  if (data.succeeded) {
    toast.success('Thanks for Joining !');
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  }

  if (data2.succeeded) {
    toast.success('Thanks for Joining !');
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={1000} />
      <DesktopContainer>
        <HeaderContainer>
          <GridContainer container spacing={2}>
            <Grid item xs={3}>
              <Link href="/">
                <img src={Logo} height="70%" />
              </Link>
            </Grid>
            <GridRowEven item xs={6}>
              <MenuButton onClick={handleAbout}>About Us</MenuButton>
              <MenuButton onClick={handleServices}>Services</MenuButton>
              <MenuButton>Product</MenuButton>
              <MenuButton onClick={handleContact}>Get in Touch</MenuButton>
            </GridRowEven>
            <GridRowCenter xs={3}>
              <StackColCenter direction="row" spacing={3}>
                <UserLink>
                  <UserLink href="/login">Sign In</UserLink>
                </UserLink>
                <Button variant="outlined" onClick={handleTry}>
                  Create Now
                </Button>
              </StackColCenter>
            </GridRowCenter>
          </GridContainer>
        </HeaderContainer>
        {homePageData.map((homeData, index) => {
          return (
            <Wrapper>
              <MainContainer>
                <img src={HeroText} width="65%" />
                <br />
                <img src={Banner} width="35%" />
                <br />
                <Description>{homeData.bannerContent.SubTitle}</Description>
                <br />
                <GridRowCenter>
                  <Stack direction="row" spacing={3}>
                    <Button
                      variant="outlined"
                      onClick={handleWorking}
                      style={{
                        backgroundColor: 'white',
                        border: '2px solid #004fba',
                      }}
                    >
                      See How It Works
                    </Button>
                    <Button variant="contained" onClick={handleTry}>
                      Try Now
                    </Button>
                  </Stack>
                </GridRowCenter>
              </MainContainer>
              <ChildContainer>
                <UploadTitle>Get Started</UploadTitle>
                <Stack direction="row" width="80vw" spacing={13}>
                  <UploadContainer>
                    <>
                      <UploadSubtitle>Transform</UploadSubtitle>
                      <p>an exisiting presentation</p>
                    </>
                    <br />
                    <br />
                    <span>
                      <img src={Folder} width="30%" />
                      <br />
                      <br />
                      <br />
                      <span>
                        <b>Drag and Drop</b>
                        <br />
                        <span>
                          your presentation here <br />
                          or click to Browse
                        </span>
                      </span>
                    </span>

                    <br />
                    <br />
                    <>File should be .ppt or .pptx</>
                  </UploadContainer>

                  <UploadContainer
                    onClick={() => window.location.replace('/canvas')}
                  >
                    <>
                      <UploadSubtitle>Create</UploadSubtitle>
                      <p>A New Presentation</p>
                    </>
                    <br />
                    <span>
                      <img src={Scratch} width="50%" />
                    </span>
                    <br />
                  </UploadContainer>
                </Stack>
                <br />
                <br />
                <CustomButton variant="contained">
                  <Stack direction="row" spacing={3}>
                    <img src={Wand} />
                    <p>Generate with Revent</p>
                  </Stack>
                </CustomButton>
              </ChildContainer>
              <ChildContainer ref={workingRef}>
                <ContactGrid container spacing={4}>
                  <StackColCenter direction="row" spacing={3}>
                    <Grid xs={6}>
                      <VideoTitle>
                        Create stunning Presentations in minutes using
                        <PrimaryText> AI</PrimaryText>
                      </VideoTitle>
                      <CustomOutlinedButton
                        variant="outlined"
                        size="large"
                        onClick={handleTry}
                      >
                        Try Now
                      </CustomOutlinedButton>
                    </Grid>
                    <Grid xs={6}>
                      <CardMedia
                        component="video"
                        image={Video}
                        controls
                        style={{ borderRadius: '20px' }}
                      />
                    </Grid>
                  </StackColCenter>
                </ContactGrid>
              </ChildContainer>
              <div ref={aboutRef}>
                <AboutContainer>
                  <CustomDivider>
                    <DividerText>About Us</DividerText>
                  </CustomDivider>
                  <Grid container>
                    <GridRowCenter xs={4}>
                      <InfoContainer>
                        <img src={Clients} />
                        <ContainerTitle>
                          We Win <br />
                          When Our Clients Win
                        </ContainerTitle>
                        <ContainerDescription>
                          Revent is for every founder, every pitch maker, and
                          essentially, every busy mind out there. Bringing
                          expert design capabilities at your fingertips to save
                          crucial time. 
                        </ContainerDescription>
                      </InfoContainer>
                    </GridRowCenter>
                    <GridRowCenter xs={4}>
                      <InfoContainer>
                        <img src={Build} />
                        <ContainerTitle>
                          Build Presentations <br />
                          The Right Way
                        </ContainerTitle>
                        <ContainerDescription>
                          Spend your time on what matters, while we focus on
                          helping you with what shows. Design slides with one
                          click of a button and present brand compliant
                          presentations in minutes.
                        </ContainerDescription>
                      </InfoContainer>
                    </GridRowCenter>
                    <GridRowCenter xs={4}>
                      <InfoContainer>
                        <img src={Reinventing} />
                        <ContainerTitle>
                          Reinventing <br />
                          The Way We Present{' '}
                        </ContainerTitle>
                        <ContainerDescription>
                          By leveraging the power of AI and the expertise of
                          design professionals, we’re bringing you a new way of
                          looking at presentations forever, one where you do not
                          have to look at them much.
                        </ContainerDescription>
                      </InfoContainer>
                    </GridRowCenter>
                  </Grid>
                </AboutContainer>
              </div>
              <br />
              <CustomDivider>
                <DividerText>Our Mission</DividerText>
              </CustomDivider>
              <br />
              <br />
              <AboutContainer>
                <GridRowCenter>
                  <MissionContainer>
                    <img src={Quote} style={{ marginTop: '-100px' }} />
                    <MissionQuote>
                      To serve as a reminder for technology to adapt to people
                      and not the other way round. As long as people are
                      prioritized, quality and value will always follow.
                      <a
                        style={{
                          color: `${theme.colorSchemes.light.palette.primary.main}`,
                        }}
                      >
                        <b>”</b>
                      </a>
                    </MissionQuote>
                  </MissionContainer>
                </GridRowCenter>
              </AboutContainer>
              <div ref={servicesRef}>
                <CustomDivider>
                  <DividerText>Our Services</DividerText>
                </CustomDivider>
                <br />
                <CardContainer>
                  <CustomCard />
                </CardContainer>
                <LaunchContainer ref={tryRef}>
                  <LaunchChild>
                    <LaunchHeading>
                      Be the first to know when we launch!
                    </LaunchHeading>
                    <LaunchDescription>
                      Join our growing community of early adopters and let us
                      know you’re interested to get access.
                    </LaunchDescription>
                    <br />

                    <form onSubmit={handleEmailSubmit}>
                      <Stack direction="row" spacing={2}>
                        <Box
                          sx={{
                            width: 500,
                            maxWidth: '100%',
                            display: 'flex',
                          }}
                        >
                          <TextField
                            fullWidth
                            label="Enter your Email address"
                            name="email"
                            type="email"
                          />
                        </Box>
                        <Button
                          variant="contained"
                          size="large"
                          type="submit"
                          disabled={data2.submitting}
                        >
                          Submit
                        </Button>
                      </Stack>
                    </form>
                    <LaunchDescription>
                      (We Promise not to Spam)
                    </LaunchDescription>
                  </LaunchChild>
                </LaunchContainer>
              </div>
              <ContactContainer ref={ContactRef}>
                <ContactGrid container spacing={2}>
                  <Grid xs={6}>
                    <img src={Contact} />
                  </Grid>
                  <Grid xs={5}>
                    <Stack direction="column" spacing={3}>
                      <DividerText>Send us a message</DividerText>
                      <form onSubmit={handleSubmit}>
                        <Stack direction="column" spacing={2}>
                          <TextField
                            fullWidth
                            label="Enter your Name"
                            id="name"
                            type="name"
                            name="name"
                          />
                          <ValidationError
                            prefix="Name"
                            field="name"
                            errors={data.errors}
                          />
                          <TextField
                            fullWidth
                            label="Enter your Email"
                            id="email"
                            type="email"
                            name="email"
                          />
                          <ValidationError
                            prefix="Email"
                            field="email"
                            errors={data.errors}
                          />
                          <TextField
                            label="Enter your message"
                            id="message"
                            name="message"
                            fullWidth
                            multiline
                            rows={3}
                            maxRows={10}
                          />
                          <ValidationError
                            prefix="Message"
                            field="message"
                            errors={data.errors}
                          />
                          <Button
                            variant="contained"
                            style={{
                              width: '30%',
                              display: 'flex',
                              alignSelf: 'flex-end',
                            }}
                            type="submit"
                            disabled={data.submitting}
                          >
                            Send
                          </Button>{' '}
                        </Stack>
                      </form>
                    </Stack>
                  </Grid>
                </ContactGrid>
              </ContactContainer>
            </Wrapper>
          );
        })}
      </DesktopContainer>
      <MobileContainer>
        <GridJustify container style={{ margin: '0% 0% 4% 0%' }}>
          <Link href="/">
            <img src={Logo} width="80%" />
          </Link>
          {(['top'] as const).map(anchor => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <img src={Menu} />
              </Button>
              <MenuDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                <Stack
                  direction="column"
                  style={{ display: 'flex', alignItems: 'flex-start' }}
                >
                  <MenuMobileButton
                    onClick={() => {
                      handleMAbout();
                      toggleDrawer(anchor, false);
                    }}
                  >
                    About Us
                  </MenuMobileButton>
                  <MenuMobileButton onClick={handleMServices}>
                    Services
                  </MenuMobileButton>
                  <MenuMobileButton>Product</MenuMobileButton>
                  <MenuMobileButton onClick={handleMContact}>
                    Get in Touch
                  </MenuMobileButton>
                </Stack>
              </MenuDrawer>
            </React.Fragment>
          ))}
        </GridJustify>
        <MainContainer>
          <img src={HeroText} width="120%" />
          <br />
          <img src={Banner} width="60%" />
          <br />
          <Description>
            Elevating your presentatiosn
            <br />
            with seamless design, powered by AI.
          </Description>
          <br />
          <GridRowCenter>
            <Stack direction="row" spacing={3}>
              <CustomOutlinedButton variant="outlined" onClick={handleMWorking}>
                See How It Works
              </CustomOutlinedButton>
            </Stack>
          </GridRowCenter>
        </MainContainer>
        <ChildContainer>
          <ContactGrid container ref={mWorkingRef}>
            <VideoTitle>
              Create stunning Presentations in minutes using{' '}
              <PrimaryText>AI</PrimaryText>
            </VideoTitle>
            <CardMedia
              component="video"
              image={Video}
              controls
              style={{ borderRadius: '20px', width: '90%', marginTop: '10%' }}
            />
          </ContactGrid>
        </ChildContainer>

        <MobileCardContainer>
          <div ref={mAboutRef}>
            <DividerText>About Us</DividerText>
            <InfoContainer>
              <img src={Clients} width="70%" />
              <ContainerTitle>We Win When Our Clients Win</ContainerTitle>
              <ContainerDescription>
                Revent is for every founder, every pitch maker, and essentially,
                every busy mind out there. Bringing expert design capabilities
                at your fingertips to save crucial time. 
              </ContainerDescription>
            </InfoContainer>
            <InfoContainer>
              <img src={Build} />
              <ContainerTitle>
                Build Presentations The Right Way{' '}
              </ContainerTitle>
              <ContainerDescription>
                Spend your time on what matters, while we focus on helping you
                with what shows. Design slides with one click of a button and
                present brand compliant presentations in minutes.
              </ContainerDescription>
            </InfoContainer>
            <InfoContainer>
              <img src={Reinventing} />
              <ContainerTitle>Reinventing The Way We Present </ContainerTitle>
              <ContainerDescription>
                By leveraging the power of AI and the expertise of design
                professionals, we’re bringing you a new way of looking at
                presentations forever, one where you do not have to look at them
                much.
              </ContainerDescription>
            </InfoContainer>
            <br />
            <br />
          </div>
        </MobileCardContainer>
        <CustomDivider>
          <DividerText>Our Mission</DividerText>
        </CustomDivider>
        <br />
        <MissionContainer>
          <MissionQuote>
            <img src={Quote} width="15%" style={{ marginTop: '-100px' }} /> To
            serve as a reminder for technology to adapt to people and not the
            other way round. As long as people are prioritized, quality and
            value will always follow.
            <a
              style={{
                color: `${theme.colorSchemes.light.palette.primary.main}`,
              }}
            >
              <b>”</b>
            </a>
          </MissionQuote>
        </MissionContainer>
        <br />
        <div ref={mServicesRef}>
          <CustomDivider>
            <DividerText>Our Services</DividerText>
          </CustomDivider>
          <br />
          <CardContainer>
            <CustomCard />
          </CardContainer>
          <LaunchChild>
            <br />
            <LaunchHeading>Be the first to know when we launch!</LaunchHeading>
            <LaunchDescription>
              Join our growing community of early adopters and let us know
              you’re interested to get access.
            </LaunchDescription>
            <br />
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <TextField fullWidth label="Enter your Email address" />
            </Box>
            <br />
            <Button variant="contained" size="large">
              Submit
            </Button>
            <LaunchDescription>(We Promise not to Spam)</LaunchDescription>
          </LaunchChild>
        </div>
        <br />
        <br />
        <ChildContainer>
          <ContactGrid container ref={mContactRef}>
            <img src={Contact} width="80%" />
            <Stack direction="column" spacing={3}>
              <br />
              <DividerText>Send us a message</DividerText>
              <br />

              <TextField fullWidth label="Enter your Name" />
              <TextField fullWidth label="Enter your Email" />
              <TextField
                label="Enter your message"
                multiline
                rows={5}
                maxRows={10}
              />
              <Button
                variant="contained"
                style={{
                  width: '50%',
                  display: 'flex',
                  alignSelf: 'center',
                }}
              >
                Send
              </Button>
            </Stack>
          </ContactGrid>
        </ChildContainer>
      </MobileContainer>
    </>
  );
};
export default Home;
