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
import SvgViewer from '@/components/canvasSvgViewer';
import ThumbnailPreview from '@/common-ui/thumbnailPreview';
import { useEffect } from 'react';

export const CanvasVariant = () => {
  const dispatch = useAppDispatch();
  const {
    openVariant,
    array,
    handleVariants,
    handleApplyOriginalAsMain,
    originalImageUrl,
    variantImage,
    selectedOriginalCanvas,
    canvasJS
  } = useVariants();

  useEffect(()=>{
    dispatch(toggleVariantSlide(false))
  },[canvasJS.canvas])

  return (
    <div>
      {canvasJS.variants.length > 0 && (
        <VariantButton onClick={() => dispatch(toggleVariantSlide(true))}>
          <img src={varianButtonSvg} alt="variantButton" />
        </VariantButton>
      )}
      <Drawer
        anchor="right"
        open={openVariant}
        onClose={() => dispatch(toggleVariantSlide(false))}
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
          <DrawerBtnContainer onClick={() => dispatch(toggleVariantSlide(true))}>
            <DrawerVariantButton>Variants</DrawerVariantButton>
          </DrawerBtnContainer>
          <DrawerVariant>
            {originalImageUrl && (
              <>
                <Text>Original Slide</Text>
                <OriginalSlideCard onClick={handleApplyOriginalAsMain} className={selectedOriginalCanvas ? 'clicked-card' : ''}>
                  {/* <img
                    src={originalImageUrl}
                    alt="image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius:'3%'
                    }}
                  /> */}
                  <SvgViewer svgContent={originalImageUrl}/>
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
              {/* <RefreshBtn variant="contained" size="small">
                Refresh
              </RefreshBtn> */}
            </ButtonContainer>
            {canvasJS.variants.length > 0
              ? canvasJS.variants.map((el: VariantsType, i: number) => {
                  return (
                    <VariantSlide
                      key={el.imagesUrl}
                      onClick={() => handleVariants(el.imagesUrl, el.pptUrl, i)}
                    >
                      <div>{i + 1}</div>
                      <VariantSlideCard className={el.imagesUrl == variantImage && !selectedOriginalCanvas ? 'clicked-card' : '' }>
                        <ThumbnailPreview
                          src={el.imagesUrl}
                          alt={`Variant ${i + 1}`}
                          style={{
                            width: '100%',
                            height: '12vh',
                            borderRadius:'3%'
                          }}
                        />
                      </VariantSlideCard>
                    </VariantSlide>
                  );
                })
              : array.map((el : any) => {
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
