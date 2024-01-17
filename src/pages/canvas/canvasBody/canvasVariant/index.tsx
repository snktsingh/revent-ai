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
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { toggleVariantSlide } from '@/redux/reducers/elements';
import { Logo, varianButtonSvg } from '@/constants/media';
import { VariantsType, swapMainCanvas } from '@/redux/thunk/thunk';
import { setCanvas, setVariantImageAsMain } from '@/redux/reducers/canvas';

export const CanvasVariant = () => {
  const dispatch = useAppDispatch();
  const { openVariant } = useAppSelector(state => state.element);
  const { variants } = useAppSelector(state => state.thunk);
  const { originalSlide } = useAppSelector(state => state.canvas);
  const array: number[] = [1, 2, 3];

  const handleVariants = (CanvasURL: string, pptURL: string, index: number) => {
    dispatch(
      swapMainCanvas({ canvasLink: CanvasURL, index: index, pptLink: pptURL })
    );
    dispatch(setVariantImageAsMain(CanvasURL));
  };

  const handleApplyOriginalAsMain = ()=>{
    dispatch(setCanvas({id:1,canvas:originalSlide.originalJSON}))
  }

  

  return (
    <div>
      {/* {variants.length > 0 && (
        <VariantButton onClick={() => dispatch(toggleVariantSlide())}>
          <img src={varianButtonSvg} alt="variantButton" />
        </VariantButton>
      )} */}
        <VariantButton onClick={() => dispatch(toggleVariantSlide())}>
          <img src={varianButtonSvg} alt="variantButton" />
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
          {originalSlide.originalUrl !== '' && <>
              <Text>Original Slide</Text>
              <OriginalSlideCard onClick={handleApplyOriginalAsMain}>
                <img src={originalSlide.originalUrl} alt="image" style={{ width: '100%', height: '100%', objectFit: 'cover', }} />
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
