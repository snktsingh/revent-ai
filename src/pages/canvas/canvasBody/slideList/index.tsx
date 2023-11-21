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

  const [imageURLs, setImageURLs] = useState<string[]>([]); // State to hold image URLs

  const getImg = async (canvasJson: Object) => {
    const canvas = new fabric.Canvas(null);

    return new Promise<string>((resolve, reject) => {
      try {
        canvas.loadFromJSON(canvasJson, () => {
          canvas.width = 970;
          canvas.height = 500;
          const imageURL = canvas.toDataURL();
          resolve(imageURL);
        });
      } catch (error) {
        console.log(error);
        reject('Error occurred while loading canvas');
      }
    });
  };

  useEffect(() => {
    const loadImages = async () => {
      const urls: string[] = [];
      for (const canvas of canvasList) {
        try {
          const imageURL = await getImg(canvas.canvas);
          urls.push(imageURL);
        } catch (error) {
          console.error(error);
          urls.push('error'); // Push placeholder for error cases
        }
      }
      setImageURLs(urls);
    };

    loadImages();
  }, [canvasList]);


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
                 <img src={imageURLs[index] || 'placeholder-for-error'} alt={`canvas-${index}`} style={{width:'100%',objectFit:'contain',height:'100%'}} />
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
