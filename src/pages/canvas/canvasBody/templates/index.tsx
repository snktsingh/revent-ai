import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Drawer, IconButton, styled } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ListSlideCard, SingleSliderContainer } from '../style';
import { useTheme } from '@mui/material/styles';
import { toggleTemplateVisibility } from '@/redux/reducers/elements';

export default function Templates() {
  const element = useAppSelector(state => state.element);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const handleDrawerClose = () => {
    dispatch(toggleTemplateVisibility());
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  }));

  return (
    <Drawer
      sx={{
        width: '15vw',
        flexShrink: 3,
        '& .MuiDrawer-paper': {
          width: '17vw',
          padding: '0vh 2vh',
          marginTop: '14.3vh',
        },
      }}
      variant="persistent"
      anchor="left"
      open={element.openTemplates}
    >
      <DrawerHeader>
        <h4>Templates</h4>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <SingleSliderContainer>
        <ListSlideCard></ListSlideCard>
        <p>Abstract 1</p>
        <ListSlideCard></ListSlideCard>
        <p>Abstract 2</p> <ListSlideCard></ListSlideCard>
        <p>Abstract 3</p>
      </SingleSliderContainer>
    </Drawer>
  );
}
