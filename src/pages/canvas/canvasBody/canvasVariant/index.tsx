import { Logo, varianButtonSvg } from '@/constants/media';
import { VariantsType } from '@/interface/storeTypes';
import { toggleVariantSlide } from '@/redux/reducers/elements';
import { useAppDispatch } from '@/redux/store';
import { Drawer } from '@mui/material';
import useVariants from './container';
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

export const CanvasVariant = () => {
  const dispatch = useAppDispatch();
  const {
    variants,
    openVariant,
    array,
    handleVariants,
    handleApplyOriginalAsMain,
    originalImageUrl,
    canvasImage,
    selectedOriginalCanvas
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
            {originalImageUrl && (
              <>
                <Text>Original Slide</Text>
                <OriginalSlideCard onClick={handleApplyOriginalAsMain} className={selectedOriginalCanvas ? 'clicked-card' : ''}>
                  <img
                    src={originalImageUrl}
                    alt="image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius:'3%'
                    }}
                  />
                </OriginalSlideCard>
              </>
            )}
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
                      <VariantSlideCard className={el.imagesUrl == canvasImage && !selectedOriginalCanvas ? 'clicked-card' : '' }>
                        <img
                          src={el.imagesUrl}
                          alt={`Variant ${i + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius:'3%'
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
