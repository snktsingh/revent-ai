import {
  AccessDenied,
  EmailIcon,
  Instagram,
  LinkedIn,
  Logo,
  Youtube,
} from '@/constants/media';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Content, MailLink, ProtectedContainer } from './style';

const Protected = () => {
  return (
    <ProtectedContainer>
      <Content>
        <Link to="/">
          <img src={Logo} height="50%" width="100%" />
        </Link>
        <MailLink href="mailto:support@revent.ai">
          <img src={EmailIcon} />
          <>support@revent.ai</>
        </MailLink>
      </Content>
      <Content
        style={{
          display: 'flex',
          alignSelf: 'center',
          flexDirection: 'column',
        }}
      >
        <h1>401</h1>
        <h2>Access Denied</h2>
        <p>Sorry , But you don't have permission to access this page</p>
        <img src={AccessDenied} width="75%" />
      </Content>
      <Content>
        <p>2023 © Revent.ai | All Rights Reserved</p>
        <Stack
          direction="row"
          spacing={2}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <a
            href="https://www.instagram.com/revent.ai?igsh=cmVjaGt6bG0xMzRz"
            target="_blank"
          >
            <img src={Instagram} style={{ cursor: 'pointer' }} />
          </a>
          <a
            href="https://www.youtube.com/channel/UCbA7uPC7VU3Jdbdr87yeW_g"
            target="_blank"
          >
            <img src={Youtube} style={{ cursor: 'pointer' }} />
          </a>
          <a href="https://www.linkedin.com/company/reventai/" target="_blank">
            <img src={LinkedIn} style={{ cursor: 'pointer' }} />
          </a>
        </Stack>
      </Content>
    </ProtectedContainer>
  );
};
export default Protected;
