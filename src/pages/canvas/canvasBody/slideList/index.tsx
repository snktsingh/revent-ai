import React, { useEffect, useState } from 'react';
import { SlideContainer } from './style';
import { Stack } from '@mui/material';
import { ListSlideCard, SingleSliderContainer } from '../style';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getSlidekey } from '@/redux/reducers/slide';
import { setActiveCanvas, setCanvas } from '@/redux/reducers/canvas';
import { fabric } from 'fabric';



export default function SlideList() {
  const dispatch = useAppDispatch();
  const slide = useAppSelector(state => state.slide);
  const {canvasList,canvasJS,activeCanvasID} = useAppSelector(state => state.canvas);
  const [isClicked, setIsClicked] = useState<number>(0);
  const handleCardClick = (id: number) => {
    dispatch(setActiveCanvas(id));
  };

  const getImg = (canvasJson: Object) => {
    const canvas = new fabric.Canvas(null); 
    try {
      let imageURL;
      canvas.loadFromJSON(canvasJson, () => {
        canvas.width = 970;
        canvas.height = 500;
        imageURL = canvas.toDataURL();
      })
      return imageURL;
    } catch (error) {
      console.log(error);
      return 'error'
    }
  };

 
 
  
  // return (
  //   <SlideContainer>
  //     {slide.listOfSlides.map((data, index) => {
  //       return (
  //         <div key={index}>
  //           <SingleSliderContainer
  //             onClick={() => {
  //               dispatch(getSlidekey(data.key)), handleCardClick(index);
  //             }}
  //           >
  //             <Stack direction="row" spacing={1}>
  //               <p>{index + 1}</p>
  //               <ListSlideCard
  //                 className={isClicked === index ? 'clicked-card' : ''}
  //               >
  //                 {data.name}
  //               </ListSlideCard>
  //             </Stack>
  //           </SingleSliderContainer>
  //           <br />
  //         </div>
  //       );
  //     })}
  //     <br />
  //   </SlideContainer>
  // );
  return (
    <SlideContainer>
      {canvasList.map((canvas,index) => {
        return (
          <div key={canvas.id}>
            <SingleSliderContainer
              onClick={() => {
                dispatch(setCanvas(canvas))
                handleCardClick(canvas.id);
          
              }}
            >
              <Stack direction="row" spacing={1}>
                <p>{index + 1}</p>
                <ListSlideCard
                  className={activeCanvasID == canvas.id ? 'clicked-card' : ''}
                >
                 <img src={getImg(canvas.canvas)} alt="canvas" style={{width:'100%',objectFit:'contain',height:'100%'}} />
                </ListSlideCard>
              </Stack>
            </SingleSliderContainer>
            <br />
          </div>
        );
      })}
      <br />
    </SlideContainer>
  );
}
