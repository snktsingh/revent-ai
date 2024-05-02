import { Back, Wand } from '@/constants/media';
import {
  AddThemeCard,
  AddThemeText,
  ButtonContainer,
  HeadingContainer,
  Icon,
  SearchBarGroup,
  StyledInput,
  TemplateContainer,
  TemplateTitle,
  ThemeCard,
  ThemeCardContainer,
  ThemeCardTitle,
  ThemeImage,
  Title,
} from './style';
import { Stack, Typography } from '@mui/material';
import { CustomButton } from '@/styles/common-styles/style';
import {
  setNewTheme,
  setSelectedTheme,
  setThemeCode,
  setThemeId,
} from '@/redux/reducers/theme';
import useStartTheme from './container';
import { TailSpin } from 'react-loader-spinner';
import { theme } from '@/constants/theme';
import ReventingLoader from '@/common-ui/loader';
import ThumbnailPreview from '@/common-ui/thumbnailPreview';
import CanvasThemes from '@/common-ui/addTheme';

const AppThemes = () => {
  const { navigate, thunk, dispatch, selectedThemeId, handleGenerate } =
    useStartTheme();

  return (
    <TemplateContainer>
      <span>
        <TemplateTitle>
          <img src={Back} onClick={() => navigate('/dashboard')} />
          <Title>Create your Presentations</Title>
        </TemplateTitle>
        <br />
        <br />
        <HeadingContainer>
          <h2>Select a Base Theme</h2>
          <SearchBarGroup>
            <Icon />
            <StyledInput type="search" placeholder="Search" />
          </SearchBarGroup>
        </HeadingContainer>
        <ThemeCardContainer>
          <ThemeCardTitle
            onClick={() => dispatch(setNewTheme(true))}
          >
            <ThemeCard>
              <AddThemeCard>
                <svg width="76px" height="76px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z" fill="#1C274C"></path> </g></svg>
                <AddThemeText>
                  Add Custom Theme
                </AddThemeText>
              </AddThemeCard>
            </ThemeCard>
          </ThemeCardTitle>
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
              {thunk.themesList.map((theme, i) => {
                return (
                  <ThemeCardTitle
                    key={theme.themeId}
                    onClick={() => {
                      // dispatch(setSelectedTheme(theme.themeId));
                      // dispatch(setThemeId(theme.themeId));
                      handleGenerate(theme.themeId);
                    }}
                    className={
                      selectedThemeId === theme.themeId
                        ? 'clicked-card'
                        : ''
                    }
                  >
                    <ThemeCard>
                      <ThumbnailPreview
                        src={theme.thumbnailUrl}
                        alt={theme.themeId}
                        style={{ width: '246px', height: '140px' }}
                        componentTitle='mainThemes'
                      />
                    </ThemeCard>
                    {theme.title}
                  </ThemeCardTitle>
                );
              })}
            </>
          )}
        </ThemeCardContainer>
      </span>
      {/* <ButtonContainer>
        <Stack direction="row" spacing={3}>
          <CustomButton variant="contained" onClick={handleGenerate}>
            <Stack direction="row" spacing={2}>
              <img src={Wand} />
              <p>Generate</p>
            </Stack>
          </CustomButton>
        </Stack>
      </ButtonContainer> */}
      <CanvasThemes />
    </TemplateContainer>
  );
};
export default AppThemes;
