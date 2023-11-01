import { GridContainer, HeaderContainer } from './style';
import Grid from '@mui/material/Grid';
import Logo from '../../assets/logo.svg';
import { Button, Link, Stack } from '@mui/material';
import {
  GridRowCenter,
  GridRowEven,
  PrimaryLink,
  StackColCenter,
} from '@/styles/common-styles/style';
import useRedirect from '@/pages/container';
const Header = () => {
  const { handleAbout, handleContact, handleServices } = useRedirect();
  return (
    <HeaderContainer>
      <GridContainer container spacing={2}>
        <Grid item xs={3}>
          <Link href="/">
            <img src={Logo} height="70%" />
          </Link>
        </Grid>
        <GridRowEven item xs={6}>
          <Button onClick={handleAbout}>About Us</Button>
          <Button onClick={handleServices}>Services</Button>
          <PrimaryLink>Product</PrimaryLink>
          <PrimaryLink onClick={handleContact}>Get in Touch</PrimaryLink>
        </GridRowEven>
        <GridRowCenter xs={3}>
          <StackColCenter direction="row" spacing={3}>
            <h3>Sign In</h3>
            <Button variant="outlined">Create Now</Button>
          </StackColCenter>
        </GridRowCenter>
      </GridContainer>
    </HeaderContainer>
  );
};
export default Header;
