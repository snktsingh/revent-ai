import { Back, Wand } from '@/constants/media';
import { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getAllThemes } from '@/redux/thunk/thunk';

const Templates = () => {
  const [loading, setLoading] = useState(false);
  const thunk = useAppSelector(state => state.thunk);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllThemes());
  }, []);
  if (loading == true) {
    return <ReventingLoader />;
  } else {
    return (
      <TemplateContainer>
        <span>
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
            {thunk.isThemeLoading ? (
              <h4>Loading...</h4>
            ) : (
              <>
                {thunk.themesList.map(theme => {
                  return (
                    <ThemeCardTitle>
                      <ThemeCard>
                        <img src={theme.thumbnailUrl} width="100%" />
                      </ThemeCard>
                      {theme.title}
                    </ThemeCardTitle>
                  );
                })}
              </>
            )}
          </ThemeCardContainer>
        </span>
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
