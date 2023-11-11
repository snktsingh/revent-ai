import {
  ButtonContainer,
  DrawerBtnContainer,
  DrawerMainContainer,
  DrawerVariant,
  DrawerVariantButton,
  LogoContainer,
  RefreshBtn,
  Text,
  VariantButton,
  VariantSlide,
  VariantSlideCard,
} from './style';
import { Drawer } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { toggleVariantSlide } from '@/redux/reducers/elements';
import { Logo } from '@/constants/media';

export const CanvasVariant = () => {
  const dispatch = useAppDispatch();
  const { openVariant } = useAppSelector(state => state.element);
  const array: number[] = [1, 2, 3];
  return (
    <div>
      <VariantButton onClick={() => dispatch(toggleVariantSlide())}>
        Variants
      </VariantButton>
      <Drawer
        anchor="right"
        open={openVariant}
        onClose={() => dispatch(toggleVariantSlide())}
        sx={{
          width: '14vw',
          flexShrink: 3,
          '& .MuiDrawer-paper': {
            width: '19vw',
            padding: '0vh 2vh',
            marginTop: '14.3vh',
            background: 'none',
            border: 'none',
          },
        }}
        variant="persistent"
      >
        <DrawerMainContainer>
          <DrawerBtnContainer onClick={() => dispatch(toggleVariantSlide())}>
            <DrawerVariantButton>Variants</DrawerVariantButton>
          </DrawerBtnContainer>
          <DrawerVariant>
            <Text>Original Slide</Text>
            <VariantSlide>
              <div>1</div>
              <VariantSlideCard></VariantSlideCard>
            </VariantSlide>
            <Text>Grid Variants</Text>
            {array.map(el => {
              return (
                <VariantSlide key={el}>
                  <div>{el}</div>
                  <VariantSlideCard></VariantSlideCard>
                </VariantSlide>
              );
            })}
            <ButtonContainer>
              <p>Variants</p>
              <RefreshBtn variant="contained" size="small">
                Refresh
              </RefreshBtn>
            </ButtonContainer>
            {array.map(el => {
              return (
                <VariantSlide key={el}>
                  <div>{el}</div>
                  <VariantSlideCard></VariantSlideCard>
                </VariantSlide>
              );
            })}

            <LogoContainer>
              <div>
                <span>Powered by</span>
                <img src={Logo} alt="logo" />
              </div>
            </LogoContainer>
          </DrawerVariant>
        </DrawerMainContainer>
      </Drawer>
    </div>
  );
};
