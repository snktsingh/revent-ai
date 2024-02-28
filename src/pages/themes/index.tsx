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
import {
  setSelectedTheme,
  setThemeCode,
  setThemeName,
} from '@/redux/reducers/theme';
import { useNavigate } from 'react-router-dom';

const AppThemes = () => {
  const [loading, setLoading] = useState(false);
  const thunk = useAppSelector(state => state.thunk);
  const { selectedThemeId } = useAppSelector(state => state.slideTheme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
            <img src={Back} onClick={() => navigate('/dashboard')} />
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
                    <ThemeCardTitle
                      onClick={() => {
                        dispatch(setSelectedTheme(theme.templateName));
                        dispatch(setThemeCode(theme.themeColor));
                        dispatch(setThemeName(theme.company));
                      }}
                      className={
                        selectedThemeId === theme.templateName
                          ? 'clicked-card'
                          : ''
                      }
                    >
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
            {/* <CustomButton variant="outlined">Generate Random</CustomButton> */}
            <CustomButton
              variant="contained"
              onClick={() => navigate('/canvas')}
            >
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
export default AppThemes;
