import { Logo, varianButtonSvg } from '@/constants/media';
import { VariantsType } from '@/interface/storeTypes';
import { toggleVariantSlide } from '@/redux/reducers/elements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Drawer } from '@mui/material';
import useVariants from './container';
import {
  ButtonContainer,
  CenteredSpinner,
  DrawerBtnContainer,
  DrawerMainContainer,
  DrawerVariant,
  DrawerVariantButton,
  LoaderCard,
  LoaderContainer,
  LogoContainer,
  OriginalSlideCard,
  RefreshBtn,
  SpinnerBlade,
  Text,
  VariantButton,
  VariantSlide,
  VariantSlideCard,
} from './style';
import SvgViewer from '@/components/canvasSvgViewer';
import ThumbnailPreview from '@/common-ui/thumbnailPreview';
import { useEffect, useState } from 'react';
import { ISlideList } from '@/interfaces/pptInterfaces';
import { useParams, useSearchParams } from 'react-router-dom';
import { getSlideJSONData } from '@/redux/thunk/thunk';
import { setVariantImageAsMain, toggleIsVariantSelected, updateCurrentCanvas } from '@/redux/reducers/canvas';

export const CanvasVariant = () => {
  const [canvasIndex, setCanvasIndex] = useState<number>(0)
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams<{ id: string }>();
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
    canvasList,
    getCanvasImageFromJSON,
    activeSlideID,
    handleRefreshVariants,
    handleOpenVariantsSlide,
    isLoading
  } = useVariants();

  const [canvasJSONdata, setCanvasJson] = useState<string>('');

  useEffect(() => {
    const index = canvasList.findIndex((el) => el.id === canvasJS.id);
    setCanvasIndex(index);
    dispatch(toggleVariantSlide(false));
  }, [canvasJS.variants.length > 0]);


  const slideId = searchParams.get('slide');
  const pptId = params.id?.split('-')[0];

  useEffect(() => {
    const canvasIndex = canvasList.findIndex((slide) => slide.id === activeSlideID);
    if (pptId && slideId && Number(slideId) > 100 && canvasList[canvasIndex].originalSlideData && canvasIndex !== 0) {
      dispatch(getSlideJSONData({ pptId, slideId })).then((res) => {
        if (res.payload) {
          getCanvasImageFromJSON(res.payload);
          dispatch(updateCurrentCanvas({ ...canvasList[canvasIndex], originalSlideData: res.payload }));
        }
      })
    }
  }, [slideId]);

  return (
    <div>
      {(canvasJS.variants && canvasJS.variants.length > 0) && (
        <VariantButton
          onClick={handleOpenVariantsSlide}
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

              <RefreshBtn variant="contained" size="small" onClick={handleRefreshVariants}>
                Refresh
              </RefreshBtn>

            </ButtonContainer>
            {
              isLoading ?
                <LoaderContainer>
                  {[1, 2, 3, 4].map((el) => {
                    return <LoaderCard>
                      <CenteredSpinner>
                        {[...Array(12)].map((_, index) => (
                          <SpinnerBlade key={index} />
                        ))}
                      </CenteredSpinner>
                    </LoaderCard>
                  })}
                </LoaderContainer>
                :
                <>
                  {(canvasJS.variants && canvasJS.variants.length) > 0 ? (
                    canvasJS.variants.map((el: VariantsType, i: number) => {
                      return (
                        <VariantSlide
                          key={el.imagesUrl}
                          onClick={() => handleVariants(el.imagesUrl, el.slideVariantId, canvasJS.id)}
                        >
                          <div>{i + 1}</div>
                          <VariantSlideCard
                            className={
                              el.imagesUrl == variantImage && !selectedOriginalCanvas ? 'clicked-card' : el.active && !variantImage
                                ? 'clicked-card'
                                : ''
                            }
                          >
                            <ThumbnailPreview
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
                  ) :
                    <></>
                  }
                </>

            }
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
