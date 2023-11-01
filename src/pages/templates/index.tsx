import { Back, Wand } from '@/constants/media';
import { useState } from 'react';
import {
  ButtonContainer,
  TemplateContainer,
  TemplateTitle,
  Title,
} from './style';
import Link from '@mui/material/Link';
import { Stack, Card, CardContent, Button } from '@mui/material';
import { CardContainer, TextInput } from '../dashboard/style';
import { WatchRounded } from '@mui/icons-material';
import { CustomButton } from '@/styles/common-styles/style';
import ReventingLoader from '@/common-ui/loader';
const Templates = () => {
  const [loading, setLoading] = useState(false);
  if (loading == true) {
    return <ReventingLoader />;
  } else {
    return (
      <TemplateContainer>
        <TemplateTitle>
          <Link href="/dashboard">
            <img src={Back} />
          </Link>
          <Title>Create your Presentations</Title>
        </TemplateTitle>
        <br />
        <br />
        <TextInput
          fullWidth
          placeholder="Enter the url for color schemes you want to add"
        />
        <br />
        <br />
        <br />
        <h2>Templates</h2>
        <Stack direction="row" spacing={4}>
          <CardContainer>
            <Card sx={{ width: 270, height: 150 }}>
              <CardContent>Add New</CardContent>
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
          <CardContainer>
            <Card sx={{ width: 270, height: 150 }}>
              <CardContent></CardContent>
            </Card>
            <p>Abstract</p>
          </CardContainer>
        </Stack>
        <Stack direction="row" spacing={4}>
          <CardContainer>
            <Card sx={{ width: 270, height: 150 }}>
              <CardContent>Add New</CardContent>
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
          <CardContainer>
            <Card sx={{ width: 270, height: 150 }}>
              <CardContent></CardContent>
            </Card>
            <p>Abstract</p>
          </CardContainer>
        </Stack>
        <br />
        <ButtonContainer>
          <Stack direction="row" spacing={3}>
            <CustomButton variant="outlined">Generate Random</CustomButton>
            <CustomButton variant="contained" onClick={() => setLoading(true)}>
              <Stack direction="row" spacing={2}>
                <img src={Wand} />
                <p>Generate</p>
              </Stack>
            </CustomButton>
          </Stack>
        </ButtonContainer>
      </TemplateContainer>
    );
  }
};
export default Templates;
