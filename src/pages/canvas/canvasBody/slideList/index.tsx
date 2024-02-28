import { setActiveCanvas, setCanvas } from '@/redux/reducers/canvas';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Stack } from '@mui/material';
import { fabric } from 'fabric';
import { useEffect, useState } from 'react';
import { ListSlideCard, SingleSliderContainer } from '../style';
import { SlideContainer } from './style';
import SvgViewer from '@/components/canvasSvgViewer';
import { useCanvasComponent } from '../canvasComponent/container';

export default function SlideList() {
  const dispatch = useAppDispatch();
  const slide = useAppSelector(state => state.slide);
  const { canvasList, canvasJS, activeCanvasID } = useAppSelector(
    state => state.canvas
  );
  const { updateCanvasDimensions } = useCanvasComponent()
  const handleCardClick = (id: number) => {
    dispatch(setActiveCanvas(id));
  };

  const [svgURLs, setsvgURLs] = useState<string[]>([]); // State to hold svg URLs

  const getImg = async (canvasJson: Object) => {
    const canvas = new fabric.Canvas(null);

    return new Promise<string>((resolve, reject) => {
      try {
        canvas.loadFromJSON(canvasJson, () => {
          // canvas.width = 970;
          // canvas.height = 500;
          updateCanvasDimensions(canvas);
          const svgURL = canvas.toSVG();
          resolve(svgURL);
        });
      } catch (error) {
        console.log(error);
        reject('Error occurred while loading canvas');
      }
    });
  };

  useEffect(() => {
    const loadSvgs = async () => {
      const urls: string[] = [];
      for (const canvas of canvasList) {
        try {
          const svgURL = await getImg(canvas.canvas);
          urls.push(svgURL);
        } catch (error) {
          console.error(error);
          urls.push('error'); // Push placeholder for error cases
        }
      }
      setsvgURLs(urls);
    };

    loadSvgs();
  }, [canvasList]);

  return (
    <SlideContainer>
      {canvasList.map((canvas, index) => {
        return (
          <div key={canvas.id}>
            <SingleSliderContainer
              onClick={() => {
                dispatch(setCanvas(canvas));
                handleCardClick(canvas.id);
              }}
            >
              <Stack direction="row" spacing={1}>
                <p>{index + 1}</p>
                <ListSlideCard
                  className={activeCanvasID == canvas.id ? 'clicked-card' : ''}
                >
                  {/* <img
                    src={svgURLs[index] || 'placeholder-for-error'}
                    alt={`canvas-${index}`}
                    style={{
                      width: '100%',
                      objectFit: 'contain',
                      height: '100%',
                    }}
                  /> */}
              <SvgViewer svgContent={svgURLs[index]}/>
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
