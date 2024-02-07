import { Back, Wand } from '@/constants/media';
import { useState } from 'react';
import {
  ButtonContainer,
  TemplateContainer,
  TemplateTitle,
  ThemeCard,
  ThemeCardContainer,
  ThemeCardTitle,
  Title,
} from './style';
import Link from '@mui/material/Link';
import { Stack } from '@mui/material';
import { CustomButton } from '@/styles/common-styles/style';
import ReventingLoader from '@/common-ui/loader';
import { themeData } from './data';

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
        <h2>Themes</h2>
        <ThemeCardContainer>
          {themeData.themes.map((theme, index) => {
            return (
              <ThemeCardTitle key={index}>
                <ThemeCard>
                  <img src={theme.image} width="100%" />
                </ThemeCard>
                {theme.title}
              </ThemeCardTitle>
            );
          })}
        </ThemeCardContainer>
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
