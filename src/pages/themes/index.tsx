import { Back, Wand } from '@/constants/media';
import {
  ButtonContainer,
  TemplateContainer,
  TemplateTitle,
  ThemeCard,
  ThemeCardContainer,
  ThemeCardTitle,
  ThemeImage,
  Title,
} from './style';
import { Stack } from '@mui/material';
import { CustomButton } from '@/styles/common-styles/style';
import {
  setSelectedTheme,
  setThemeCode,
  setThemeName,
} from '@/redux/reducers/theme';
import useStartTheme from './container';
import { TailSpin } from 'react-loader-spinner';
import { theme } from '@/constants/theme';
import ReventingLoader from '@/common-ui/loader';
import ThumbnailPreview from '@/common-ui/thumbnailPreview';

const AppThemes = () => {
  const { navigate, thunk, dispatch, selectedThemeId, handleGenerate } =
    useStartTheme();

  if (thunk.isCreating) {
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
              <TailSpin
                visible={true}
                height="40"
                width="40"
                color={`${theme.colorSchemes.light.palette.primary.main}`}
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
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
                        <ThumbnailPreview src={theme.thumbnailUrl} alt={theme.company} style={{ width: '246px', height: '140px'}} />
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
            <CustomButton variant="contained" onClick={handleGenerate}>
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
