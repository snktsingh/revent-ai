import { Card, CardContent, Input, Stack, TextField } from '@mui/material';
import Link from '@mui/material/Link';
import {
  CardContainer,
  MainContainer,
  Subtitle,
  TextInput,
  Title,
} from './style';
import { Add } from '@/constants/media';

const Dashboard = () => {
  return (
    <MainContainer>
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>Create a Presentation</Title>
        <TextInput label="Search Presentation" />
      </span>
      <br />
      <Stack direction="row" spacing={4}>
        <Link href="/templates">
          <CardContainer>
            <Card sx={{ width: 270, height: 150 }}>
              <CardContent
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <img src={Add} />
              </CardContent>
            </Card>
            <p>Blank Presentation</p>
          </CardContainer>
        </Link>
        <CardContainer>
          <Card sx={{ width: 270, height: 150 }}>
            <CardContent></CardContent>
          </Card>
          <p>Abstract</p>
        </CardContainer>
        <CardContainer>
          <Card sx={{ width: 270, height: 150 }}>
            <CardContent></CardContent>
          </Card>
          <p>Abstract</p>
        </CardContainer>
        <CardContainer>
          <Card sx={{ width: 270, height: 150 }}>
            <CardContent></CardContent>
          </Card>
          <p>Abstract</p>
        </CardContainer>
        <CardContainer>
          <Card sx={{ width: 270, height: 150 }}>
            <CardContent></CardContent>
          </Card>
          <p>Abstract</p>
        </CardContainer>
      </Stack>
      <br />
      <Subtitle>More Templates</Subtitle>
      <Title>Recent Presentation</Title>
      <Stack direction="row" spacing={4}>
        <CardContainer>
          <Card sx={{ width: 270, height: 150 }}>
            <CardContent>Add New</CardContent>
          </Card>
          <p>Presentation</p>
        </CardContainer>
        <CardContainer>
          <Card sx={{ width: 270, height: 150 }}>
            <CardContent></CardContent>
          </Card>
          <p>Abstract</p>
        </CardContainer>
        <CardContainer>
          <Card sx={{ width: 270, height: 150 }}>
            <CardContent></CardContent>
          </Card>
          <p>Abstract</p>
        </CardContainer>
        <CardContainer>
          <Card sx={{ width: 270, height: 150 }}>
            <CardContent></CardContent>
          </Card>
          <p>Abstract</p>
        </CardContainer>
        <CardContainer>
          <Card sx={{ width: 270, height: 150 }}>
            <CardContent></CardContent>
          </Card>
          <p>Abstract</p>
        </CardContainer>
      </Stack>
    </MainContainer>
  );
};
export default Dashboard;
