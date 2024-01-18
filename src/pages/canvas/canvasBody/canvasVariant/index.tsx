import {
  ButtonContainer,
  DrawerBtnContainer,
  DrawerMainContainer,
  DrawerVariant,
  DrawerVariantButton,
  LogoContainer,
  OriginalSlideCard,
  RefreshBtn,
  Text,
  VariantButton,
  VariantSlide,
  VariantSlideCard,
} from './style';
import { Drawer } from '@mui/material';
import { useAppDispatch } from '@/redux/store';
import { toggleVariantSlide } from '@/redux/reducers/elements';
import { Logo, varianButtonSvg } from '@/constants/media';
import { VariantsType } from '@/redux/thunk/thunk';
import useVariants from './container';
import { useEffect } from 'react';

export const CanvasVariant = () => {
  const dispatch = useAppDispatch();
  const { 
    variants,
    openVariant,
    array,
    handleVariants,
    handleApplyOriginalAsMain,
    originalImageUrl 
  } = useVariants();



  return (
    <div>
      {variants.length > 0 && (
        <VariantButton onClick={() => dispatch(toggleVariantSlide())}>
          <img src={varianButtonSvg} alt="variantButton" />
        </VariantButton>
      )}
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
            {originalImageUrl && <>
              <Text>Original Slide</Text>
              <OriginalSlideCard onClick={handleApplyOriginalAsMain}>
                <img src={originalImageUrl} alt="image" style={{ width: '100%', height: '100%', objectFit: 'cover', }} />
              </OriginalSlideCard>
            </>}
            {/* <Text>Grid Variants</Text>
            {array.map(el => {
              return (
                <VariantSlide key={el}>
                  <div>{el}</div>
                  <VariantSlideCard></VariantSlideCard>
                </VariantSlide>
              );
            })} */}
            <ButtonContainer>
              <p>Variants</p>
              <RefreshBtn variant="contained" size="small">
                Refresh
              </RefreshBtn>
            </ButtonContainer>
            {variants.length > 0
              ? variants.map((el: VariantsType, i: number) => {
                return (
                  <VariantSlide
                    key={el.imagesUrl}
                    onClick={() => handleVariants(el.imagesUrl, el.pptUrl, i)}
                  >
                    <div>{i + 1}</div>
                    <VariantSlideCard>
                      <img
                        src={el.imagesUrl}
                        alt={`Variant ${i + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </VariantSlideCard>
                  </VariantSlide>
                );
              })
              : array.map(el => {
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
