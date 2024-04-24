import { Logo, varianButtonSvg } from '@/constants/media';
import { VariantsType } from '@/interface/storeTypes';
import { toggleVariantSlide } from '@/redux/reducers/elements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
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
import { ISlideList } from '@/interfaces/pptInterfaces';

export const CanvasVariant = () => {
  const dispatch = useAppDispatch();
  const { selectedSlideIndex } = useAppSelector(state => state.thunk);
  const {
    openVariant,
    array,
    handleVariants,
    handleApplyOriginalAsMain,
    originalImageUrl,
    variantImage,
    selectedOriginalCanvas,
    canvasJS,
    pptDetails,
  } = useVariants();

  useEffect(() => {
    dispatch(toggleVariantSlide(false));
  }, [canvasJS.canvas]);

  return (
    <div>
      {canvasJS.variants.length > 0 && (
        <VariantButton
          onClick={() => dispatch(toggleVariantSlide(!openVariant))}
        >
          <img src={varianButtonSvg} alt="variantButton" />
        </VariantButton>
      )}
      <Drawer
        anchor="right"
        open={openVariant}
        variant="persistent"
        onClose={() => dispatch(toggleVariantSlide(false))}
        sx={{
          // width: '15vw',
          height: '100%',
          flexShrink: 3,
          '& .MuiDrawer-paper': {
            width: '20%',
            padding: '0vh 1vw 0vh 2vw',
            marginTop: '13.4vh',
            background: 'none',
            border: 'none',
          },
         
        }}
      >
        <DrawerMainContainer>

          <DrawerBtnContainer onClick={() => dispatch(toggleVariantSlide(false))}>
            <DrawerVariantButton>Variants</DrawerVariantButton>
          </DrawerBtnContainer>
          <DrawerVariant>
            {originalImageUrl && (
              <>
                <Text>Original Slide</Text>
                <OriginalSlideCard
                  onClick={handleApplyOriginalAsMain}
                  className={selectedOriginalCanvas ? 'clicked-card' : ''}
                >
                  <SvgViewer svgContent={originalImageUrl} />
                </OriginalSlideCard>
              </>
            )}

            <ButtonContainer>
              <p>Variants</p>

              <RefreshBtn variant="contained" size="small">
                Refresh
              </RefreshBtn>

            </ButtonContainer>
            {canvasJS.variants.length > 0 ? (
              canvasJS.variants.map((el: VariantsType, i: number) => {
                return (
                  <VariantSlide
                    key={el.imagesUrl}
                    onClick={() => handleVariants(el.imagesUrl, el.pptUrl, i)}
                  >
                    <div>{i + 1}</div>
                    <VariantSlideCard
                      className={
                        el.imagesUrl == variantImage && !selectedOriginalCanvas
                          ? 'clicked-card'
                          : ''
                      }
                    >
                      <ThumbnailPreview
                        componentTitle=""
                        src={el.imagesUrl}
                        alt={`Variant ${i + 1}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '3%',
                        }}
                        componentTitle='Variants'
                      />
                    </VariantSlideCard>
                  </VariantSlide>
                );
              })
            ) : (
<<<<<<< Updated upstream
              <>
                {pptDetails?.slides.length !== 0 ? (
                  <>
                    {pptDetails?.slides[selectedSlideIndex].map(
                      (el: ISlideList, index: number) => {
                        return (
                          <VariantSlide
                            key={el.thumbnailUrl}
                            onClick={() =>
                              handleVariants(el.thumbnailUrl, '', index)
                            }
                          >
                            <div>{index + 1}</div>
                            <VariantSlideCard
                              className={
                                el.thumbnailUrl == variantImage &&
                                !selectedOriginalCanvas
                                  ? 'clicked-card'
                                  : ''
                              }
                            >
                              <ThumbnailPreview
                                componentTitle='variants'
                                src={el.thumbnailUrl}
                                alt={`Variant ${index + 1}`}
                                style={{
                                  width: '100%',
                                  height: 'auto',
                                  borderRadius: '3%',
                                }}
                              />
                            </VariantSlideCard>
                          </VariantSlide>
                        );
                      }
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
=======
              <></>
>>>>>>> Stashed changes
            )}
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
