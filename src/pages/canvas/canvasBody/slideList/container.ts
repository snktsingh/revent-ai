import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { useState } from 'react';
import { useCanvasComponent } from '../canvasComponent/container';
import { toggleSelectingSlide } from '@/redux/reducers/slide';
import {
  setActiveSlideId,
  setCanvas,
  updateCanvasList,
} from '@/redux/reducers/canvas';
import { fabric } from 'fabric';
import { CanvasItem } from '@/interface/storeTypes';
import { openModal } from '@/redux/reducers/elements';

const useSlideList = () => {
  const [draggedItemId, setDraggedItemId] = useState(null);
  const dispatch = useAppDispatch();
  const slide = useAppSelector(state => state.slide);
  const { canvasList, canvasJS, activeSlideID } = useAppSelector(
    state => state.canvas
  );
  const { updateCanvasDimensions } = useCanvasComponent();

  const handleSlideCardClick = (canvas: CanvasItem) => {
    dispatch(toggleSelectingSlide(true));
    dispatch(setCanvas(canvas));
    dispatch(setActiveSlideId(canvas.id));
  };

  const [svgURLs, setsvgURLs] = useState<string[]>([]);

  const getImg = async (canvasJson: Object) => {
    const canvas = new fabric.Canvas(null);

    return new Promise<string>((resolve, reject) => {
      try {
        console.log('loading slide image')
        canvas.loadFromJSON(canvasJson, () => {
          updateCanvasDimensions(canvas);
          canvas.forEachObject(obj => {
            if (obj.name && obj.name == 'VariantImage') {
              const canvasWidth = canvas?.width || 0;
              const canvasHeight = canvas?.height || 0;
              const scaleWidth = canvasWidth / obj.width!;
              const scaleHeight = canvasHeight / obj.height!;
              const scale = Math.max(scaleWidth, scaleHeight);

              obj.set({
                left: 0,
                top: 0,
                scaleX: scale,
                scaleY: scale,
                selectable: false,
                lockMovementX: true,
                lockScalingY: true,
                moveCursor: 'pointer',
                name: 'VariantImage',
              });
            }
          });
          canvas.renderAll();
          const svgURL = canvas.toSVG();
          console.log(svgURL)
          resolve(svgURL);
        });
      } catch (error) {
        console.log(error);
        reject('Error occurred while loading canvas');
      }
    });
  };

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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Delete') {
      slide.isSlideSelected && handleDeleteSlide();
    }
  };

  const handleDeleteSlide = () => {
    dispatch(openModal());
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number,
    canvas: CanvasItem
  ) => {
    event.dataTransfer.setData('index', index.toString());
    handleSlideCardClick(canvas);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    newIndex: number,
    canvas: CanvasItem
  ) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    const oldIndexStr = event.dataTransfer.getData('index');
    const oldIndex = parseInt(oldIndexStr, 10);
    const updatedCanvasList = [...canvasList];
    const [removed] = updatedCanvasList.splice(oldIndex, 1);
    updatedCanvasList.splice(newIndex, 0, removed);
    dispatch(updateCanvasList(updatedCanvasList));
    // handleSlideCardClick(canvas);
  };

  return {
    handleKeyDown,
    getImg,
    svgURLs,
    canvasJS,
    canvasList,
    activeSlideID,
    slide,
    handleSlideCardClick,
    loadSvgs,
    handleDragOver,
    handleDragStart,
    handleDrop,
    dispatch,
  };
};

export default useSlideList;
